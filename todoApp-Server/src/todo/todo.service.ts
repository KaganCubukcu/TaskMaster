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
    let query = this.todoModel.find({userId})
    if (completed !== undefined) {
      query = query.where('completed').equals(completed)
    }
    return query.sort({[sort]: 1})
  }

  async findOne(id: string): Promise<Todo> {
    return this.todoModel.findById(id)
  }

  async create(userId: string, createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = new this.todoModel({...createTodoDto, userId})
    return newTodo.save()
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(id, updateTodoDto, {new: true})
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`)
    }
    return updatedTodo
  }

  async delete(id: string): Promise<void> {
    await this.todoModel.findByIdAndDelete(id)
  }
}
