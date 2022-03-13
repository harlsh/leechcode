import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Problem } from '../interface/problem';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  url = "http://localhost:8080/api/v1/"

  constructor(private http: HttpClient) { }

  getProblems(): Observable<Problem[]> {
    return this.http.get<Problem[]>(this.url + "problems")
  }

  getProblem(titleSlug: string): Observable<Problem> {
    return this.http.get<Problem>(this.url + "problems/" + titleSlug)
  }
}
