import {Component} from '@angular/core'
import {RouterModule} from '@angular/router'
import {HeaderComponent} from './components/shared/header/header.component'
import {FooterComponent} from './components/shared/footer/footer.component'
import {TodoFormComponent} from './components/todo/todoForm/todoform.component'
import {CommonModule} from '@angular/common'

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, TodoFormComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TaskMaster'
}
