import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './models/todo.model';
import { CreateTodoDto } from './DTOs/create-todo.dto';
import { UpdateTodoDto } from './DTOs/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findAll(completed?: boolean, sort: string = 'dueDate'): Promise<Todo[]> {
    let query = this.todoModel.find();
    if (completed !== undefined) {
      query = query.where('completed').equals(completed);
    }
    return query.sort({ [sort]: 1 });
  }

  async findOne(id: string): Promise<Todo> {
    return this.todoModel.findById(id);
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = new this.todoModel(createTodoDto);
    return newTodo.save();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoModel.findByIdAndUpdate(id, updateTodoDto, { new: true });
  }

  async delete(id: string): Promise<void> {
    await this.todoModel.findByIdAndDelete(id);
  }
}
