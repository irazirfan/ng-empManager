import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Employee } from './employee';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  url = 'https://localhost:44326/Api/v1';

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url + '/GetEmployees');
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.url + '/GetEmployeeById/' + id);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = {headers: new HttpHeaders({ 'content-type': 'application/json'})}
    return this.http.post<Employee>(this.url + '/AddEmployee', employee, httpOptions)
    .pipe(
        tap(() => {
        this._refreshNeeded$.next();
      })
  )};

  updateEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = {headers: new HttpHeaders({ 'content-type': 'application/json'})}
    return this.http.put<Employee>(this.url + '/UpdateEmployee', employee, httpOptions)
    .pipe(
      tap(() => {
      this._refreshNeeded$.next();
    })
  )};

  deleteEmployeeById(id: number): Observable<number> {
    const httpOptions = {headers: new HttpHeaders({ 'content-type': 'application/json'})}
    return this.http.delete<number>(this.url + '/DeleteEmployee?id=' + id, httpOptions);
  }
}
