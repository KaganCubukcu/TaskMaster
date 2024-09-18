import {Component} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TodolistComponent} from '../../components/todo/todoList/todolist.component'

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, TodolistComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {}
