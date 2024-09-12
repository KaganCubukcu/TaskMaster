import {Component} from '@angular/core'
import {RouterModule} from '@angular/router'
import {HeaderComponent} from './components/shared/header/header.component'
import {FooterComponent} from './components/shared/footer/footer.component'

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TaskMaster'
}
