import {environment} from '@/app/environment/environment'
import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs'
import {Login} from '@/app/interfaces/auth/Login.interface'
import {Register} from '@/app/interfaces/auth/Register.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`
  private isLoggedInSubject = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this.isLoggedInSubject.asObservable()

  constructor(private http: HttpClient) {
    this.getAuthHeaders()
    this.isLoggedInSubject.next(!!localStorage.getItem('token'))
  }
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token')
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
  }

  login(email: string, password: string): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}/login`, {email, password}).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token)
          localStorage.setItem('userId', response.userId)
          this.isLoggedInSubject.next(true)
        }
      })
    )
  }

  register(email: string, password: string, name: string): Observable<Register> {
    return this.http.post<Register>(`${this.apiUrl}/register`, {email, password, name}).pipe(
      catchError(error => {
        console.error('Kayıt işlemi sırasında bir hata oluştu:', error)
        return throwError(() => new Error('Kayıt işlemi başarısız oldu. Lütfen daha sonra tekrar deneyin.'))
      })
    )
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    this.isLoggedInSubject.next(false)
  }
}
