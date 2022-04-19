import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProblemListService {

  constructor(private httpclient: HttpClient){}

    getProjects(){

        //Headers
        const httpHeaders = new HttpHeaders();
        httpHeaders.append('content-type','application/json')

        //Get the HTTP Method working for you
        return  this.httpclient.get('http://localhost:8080/api/v1/problems/', {headers: httpHeaders});

    };
}
