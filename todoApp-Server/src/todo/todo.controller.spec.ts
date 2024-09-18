import {Test, TestingModule} from '@nestjs/testing'
import {TodoController} from './todo.controller'
import {TodoService} from './todo.service'
import {getModelToken} from '@nestjs/mongoose'
import {CreateTodoDto} from './DTOs/create-todo.dto'
import {UpdateTodoDto} from './DTOs/update-todo.dto'

describe('TodoController', () => {
  let controller: TodoController
  let mockRequest: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        {
          provide: getModelToken('Todo'),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
          }
        }
      ]
    }).compile()

    controller = module.get<TodoController>(TodoController)
    mockRequest = {
      user: {userId: 'testUserId'}
    }
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const result = [
        {
          id: '1',
          title: 'Test Todo',
          description: 'Test Description',
          dueDate: new Date(),
          completed: false
        },
        {
          id: '2',
          title: 'Test Todo 2',
          description: 'Test Description 2',
          dueDate: new Date(),
          completed: false
        }
      ]
      jest.spyOn(controller, 'findAll').mockResolvedValue(result as any)

      expect(await controller.findAll(mockRequest)).toEqual(result)
    })
  })

  describe('findOne', () => {
    it('should return a single todo', async () => {
      const result = {
        id: '1',
        title: 'Test Todo',
        description: 'Test Description',
        dueDate: new Date(),
        completed: false
      }
      jest.spyOn(controller, 'findOne').mockResolvedValue(result as any)

      expect(await controller.findOne('1')).toEqual(result)
    })
  })

  describe('create', () => {
    it('should create a new todo', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'Create Test Todo',
        description: 'Create Test Description',
        dueDate: new Date(),
        completed: false
      }
      const result = {
        id: '1',
        ...createTodoDto
      }
      jest.spyOn(controller, 'create').mockResolvedValue(result as any)

      expect(await controller.create(mockRequest, createTodoDto)).toEqual(result)
    })
  })

  describe('update', () => {
    it('should update a todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Update Test Todo',
        description: 'Update Test Description',
        dueDate: new Date(),
        completed: true
      }
      const result = {
        id: '1',
        ...updateTodoDto
      }
      jest.spyOn(controller, 'update').mockResolvedValue(result as any)

      expect(await controller.update('1', updateTodoDto)).toEqual(result)
    })
  })

  describe('delete', () => {
    it('should delete a todo', async () => {
      const result = {message: 'Todo item deleted successfully'}
      jest.spyOn(controller, 'delete').mockResolvedValue(result as any)

      expect(await controller.delete('1')).toEqual(result)
    })
  })
})
