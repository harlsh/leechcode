import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Problem } from './problem';
import { Submission } from './submission';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblemsApiService {
  url = "http://localhost:8080/api/v1/"

  constructor(private http: HttpClient) {}

   getProblems(): Observable<Problem[]> {
    return this.http.get<Problem[]>(this.url + "problems")
  }


  createProblem(problem: Problem){
    let url = "http://localhost:8080/api/v1/problems"
    return this.http.post(url,problem);
  }

  getProblemBySlug(slug: string): Observable<Problem>{
    let url = "http://localhost:8080/api/v1/problems/"+slug
    return this.http.get<Problem>(url);
  }

  deleteProblemBySlug(slug: string){
    let url = "http://localhost:8080/api/v1/problems/"+slug
    return this.http.delete(url);
  }
  getSubmissions(uid:string): Observable<Submission[]> {
    let req = "http://localhost:8080/api/v1/submissions/"+uid
    return this.http.get<Submission[]>(req)
  }
}