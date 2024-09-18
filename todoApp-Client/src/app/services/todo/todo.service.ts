import {environment} from '@/app/environment/environment'
import {Todo} from '@/app/interfaces/todo/Todo.interface'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, throwError} from 'rxjs'
import {catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token')
    return new HttpHeaders().set('Authorization', `Bearer ${token}`)
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/todos`, {headers: this.getHeaders()})
  }

  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/todos/${id}`)
  }

  createTodo(todo: Todo): Observable<Todo> {
    const userId = localStorage.getItem('userId')
    const todoWithUser = {...todo, userId}
    return this.http.post<Todo>(`${this.apiUrl}/todos`, todoWithUser, {headers: this.getHeaders()})
  }

  updateTodo(id: string, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/todos/${id}`, todo, {headers: this.getHeaders()}).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('Todo is not updated'))
      })
    )
  }

  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/todos/${id}`)
  }
}
