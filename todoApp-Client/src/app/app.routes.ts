import {Route} from '@angular/router'
import {LoginComponent} from './components/auth/login/login.component'
import {RegisterComponent} from './components/auth/register/register.component'

export const appRoutes: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/register', pathMatch: 'full'}
]
