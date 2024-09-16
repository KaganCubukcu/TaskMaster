import {Component, OnDestroy, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Todo} from '@/app/interfaces/todo/Todo.interface'
import {TodoService} from '@/app/services/todo/todo.service'
import {Subject, takeUntil} from 'rxjs'

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>()
  todos: Todo[] = []

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos()
  }

  loadTodos(): void {
    this.todoService
      .getTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(todos => {
        this.todos = todos
      })
  }
  deleteTodo(id: string) {
    this.todoService
      .deleteTodo(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.todos = this.todos.filter(todo => todo._id !== id)
      })
  }
  updateTodo(todo: Todo) {
    this.todoService
      .updateTodo(todo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.todos = this.todos.filter(t => t._id !== todo._id)
      })
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
