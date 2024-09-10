import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './models/todo.model';
import { CreateTodoDto } from './DTOs/create-todo.dto';
import { UpdateTodoDto } from './DTOs/update-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(
    @Query('completed') completed?: boolean,
    @Query('sort') sort: string = 'dueDate'
  ): Promise<Todo[]> {
    const completedBool = completed ? completed === true : undefined;
    return this.todoService.findAll(completedBool, sort);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.todoService.delete(id);
    return { message: 'Todo item deleted successfully' };
  }
}
