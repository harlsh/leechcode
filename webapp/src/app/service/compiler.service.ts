import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compiler } from '../interface/compiler';

@Injectable({
  providedIn: 'root'
})
export class CompilerService {
  url = "http://localhost:8080/api/v1/"

  constructor(private http: HttpClient) { }

  getCompilers(): Observable<Compiler[]> {
    return this.http.get<Compiler[]>(this.url + "compilers")
  }

}
