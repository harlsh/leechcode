import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Code, Output } from '../models/code';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ExecuteService {
  url = "http://localhost:8080/api/v1/execute"
  
  constructor(private http: HttpClient) { }

  submitCode(code : Code) : Observable<any> {
    return this.http.post<Output>(this.url, code, httpOptions)
  }

}
