import {Controller, Get, Post, Body, Put, Param, Delete, Request, Query, Logger, UseGuards} from '@nestjs/common'
import {TodoService} from './todo.service'
import {CreateTodoDto} from './DTOs/create-todo.dto'
import {UpdateTodoDto} from './DTOs/update-todo.dto'
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard'

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {
  private readonly logger = new Logger(TodoController.name)

  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(@Request() req, @Query('completed') completed?: boolean, @Query('sort') sort: string = 'dueDate') {
    this.logger.debug(`findAll called with userId: ${req.user?.userId}, completed: ${completed}, sort: ${sort}`)
    return this.todoService.findAll(req.user.userId, completed, sort)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.todoService.findOne(id)
  }

  @Post()
  async create(@Request() req, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(req.user.userId, createTodoDto)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.todoService.delete(id)
  }
}
