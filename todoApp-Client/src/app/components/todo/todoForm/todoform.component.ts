import {Component, OnDestroy, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {TodoService} from '@/app/services/todo/todo.service'
import {AuthService} from '@/app/services/auth/auth.service'
import {Router} from '@angular/router'
import {Subject, takeUntil} from 'rxjs'

@Component({
  selector: 'app-todoform',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.css']
})
export class TodoFormComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>()
  newTodoTitle: string = ''
  isLoggedIn = false
  constructor(private todoService: TodoService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.pipe(takeUntil(this.unsubscribe$)).subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn
    })
  }

  onSubmit() {
    if (this.newTodoTitle.trim()) {
      this.todoService
        .createTodo({
          title: this.newTodoTitle,
          description: '',
          completed: false
        })
        .subscribe({
          next: newTodo => {
            this.newTodoTitle = ''
          },
          error: error => {
            console.error('Error:', error)
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
