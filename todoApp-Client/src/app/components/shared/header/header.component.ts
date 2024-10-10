import {Component, OnDestroy, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AuthService} from '@/app/services/auth/auth.service'
import {Observable, Subject, takeUntil} from 'rxjs'
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>()
  isLoggedIn = false
  isMenuOpen = false

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn$.pipe(takeUntil(this.unsubscribe$)).subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn
    })
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }
  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
