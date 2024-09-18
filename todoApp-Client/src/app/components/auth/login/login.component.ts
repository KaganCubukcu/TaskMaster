import {Component, OnDestroy, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '@/app/services/auth/auth.service'
import {Subject, takeUntil} from 'rxjs'
import {Router} from '@angular/router'
import {Login} from '@/app/interfaces/auth/Login.interface'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>()

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) return
    const {email, password} = this.loginForm.value
    this.authService
      .login(email!, password!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: Login) => {
          if (res.token) {
            localStorage.setItem('token', res.token)
            this.router.navigate(['/'])
          } else {
            console.error('Token not found in response')
          }
        },
        error: err => {
          console.error('Login error:', err)
        }
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
