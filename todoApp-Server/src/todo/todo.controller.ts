import {Controller, Get, Post, Put, Delete, Body, Param, Query, Request, UseGuards} from '@nestjs/common'
import {TodoService} from './todo.service'
import {Todo} from './models/todo.model'
import {CreateTodoDto} from './DTOs/create-todo.dto'
import {UpdateTodoDto} from './DTOs/update-todo.dto'
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard'

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req, @Query('completed') completed?: boolean, @Query('sort') sort: string = 'dueDate'): Promise<Todo[]> {
    const completedBool = completed ? completed === true : undefined
    return this.todoService.findAll(req.user.userId, completedBool, sort)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(req.user.userId, createTodoDto)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoService.update(id, updateTodoDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{message: string}> {
    await this.todoService.delete(id)
    return {message: 'Todo item deleted successfully'}
  }
}
