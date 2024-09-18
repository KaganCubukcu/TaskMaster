import {Route} from '@angular/router'
import {LoginComponent} from './components/auth/login/login.component'
import {RegisterComponent} from './components/auth/register/register.component'
import {HomepageComponent} from './pages/home/homepage.component'
import {AuthGuard} from './guards/auth.guard'

export const appRoutes: Route[] = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: '', component: HomepageComponent}
]
