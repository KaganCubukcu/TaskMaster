import {Component, OnDestroy} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms'
import {OnInit} from '@angular/core'
import {AuthService} from '@/app/services/auth/auth.service'
import {Subject, takeUntil} from 'rxjs'
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>()

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.invalid) return

    const {email, password, name} = this.registerForm.value
    this.authService
      .register(email!, password!, name!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: response => {
          this.router.navigate(['/login'])
        },
        error: error => {
          console.log(error)
        }
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
