import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Employee } from '../models/employee';
import { Observable, throwError } from 'rxjs';
import { baseUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserauthService {

  base_path = 'http://localhost:3000/employee';

  constructor(private http: HttpClient) { }

  login(data):Observable<any>{
    return this.http.post(baseUrl, data);

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  createItem(item): Observable<Employee> {
    return this.http
    .post<Employee>(this.base_path, JSON.stringify(item), this.httpOptions)
    
  }
}
