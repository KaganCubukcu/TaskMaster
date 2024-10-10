import {Component, OnDestroy, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Todo} from '@/app/interfaces/todo/Todo.interface'
import {TodoService} from '@/app/services/todo/todo.service'
import {Subject, takeUntil} from 'rxjs'
import {FormsModule} from '@angular/forms'
import {AuthService} from '@/app/services/auth/auth.service'
import {Router} from '@angular/router'
import {TruncatePipe} from '@/app/helpers/truncate.pipe'

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe],
  templateUrl: './todolist.component.html'
})
export class TodolistComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>()
  todos: Todo[] = []
  selectedTodo: Todo | null = null
  isModalOpen: boolean = false
  isLoggedIn: boolean = false

  constructor(private todoService: TodoService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.pipe(takeUntil(this.unsubscribe$)).subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn
      if (!isLoggedIn) {
        this.router.navigate(['/login'])
      } else {
        this.loadTodos()
      }
    })
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

  openUpdateModal(todo: Todo) {
    this.selectedTodo = {...todo}
    this.isModalOpen = true
  }

  closeUpdateModal() {
    this.isModalOpen = false
    this.selectedTodo = null
  }

  updateTodo() {
    if (this.selectedTodo && this.selectedTodo._id) {
      this.todoService
        .updateTodo(this.selectedTodo._id, this.selectedTodo)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: updatedTodo => {
            if (updatedTodo && updatedTodo._id) {
              const index = this.todos.findIndex(t => t._id === updatedTodo._id)
              if (index !== -1) {
                this.todos[index] = updatedTodo
              }
            }
            this.closeUpdateModal()
          },
          error: error => {
            console.error('Todo is not updated:', error)
          }
        })
    } else {
      console.error('Todo is not updated:', this.selectedTodo)
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
