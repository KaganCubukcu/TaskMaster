import {Component} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {TodoService} from '@/app/services/todo/todo.service'

@Component({
  selector: 'app-todoform',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.css']
})
export class TodoFormComponent {
  newTodoTitle: string = ''

  constructor(private todoService: TodoService) {}

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
            console.log('newTodo:', newTodo)
            this.newTodoTitle = ''
          },
          error: error => {
            console.error('Error:', error)
          }
        })
    }
  }
}
