import {Route} from '@angular/router'
import {LoginComponent} from './components/auth/login/login.component'
import {RegisterComponent} from './components/auth/register/register.component'
import {HomepageComponent} from './pages/home/homepage.component'

export const appRoutes: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomepageComponent}
]
