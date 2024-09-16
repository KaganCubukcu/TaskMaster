import {environment} from '@/app/environment/environment'
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, Observable} from 'rxjs'
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
    const token = localStorage.getItem('token')
    this.isLoggedInSubject.next(!!token)
  }

  login(email: string, password: string): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}/login`, {email, password})
  }

  register(email: string, password: string, name: string): Observable<Register> {
    return this.http.post<Register>(`${this.apiUrl}/register`, {email, password, name})
  }
  logout() {
    localStorage.removeItem('token')
    this.isLoggedInSubject.next(false)
  }
}
