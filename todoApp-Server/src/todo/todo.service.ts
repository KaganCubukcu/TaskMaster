import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {Todo, TodoDocument} from './models/todo.model'
import {CreateTodoDto} from './DTOs/create-todo.dto'
import {UpdateTodoDto} from './DTOs/update-todo.dto'

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findAll(userId: string, completed?: boolean, sort: string = 'dueDate'): Promise<Todo[]> {
    const query = this.todoModel.find({userId})
    if (completed !== undefined) {
      query.where('completed').equals(completed)
    }
    return query.sort({[sort]: 1}).exec()
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec()
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`)
    }
    return todo
  }

  async create(userId: string, createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = new this.todoModel({...createTodoDto, userId})
    return newTodo.save()
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(id, updateTodoDto, {new: true}).exec()
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`)
    }
    return updatedTodo
  }

  async delete(id: string): Promise<void> {
    const result = await this.todoModel.findByIdAndDelete(id).exec()
    if (!result) {
      throw new NotFoundException(`Todo with ID ${id} not found`)
    }
  }
}
