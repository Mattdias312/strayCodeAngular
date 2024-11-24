import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginModel } from '../login/login-model.component';
import { catchError, map, Observable, of } from 'rxjs';
import { response } from 'express';

const questionarioURI: string = "http://localhost:3000/questionario"

@Injectable({
  providedIn: 'root'
})
export class QuestionarioService {
  autorizado = false;
  isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  detelheQuestionario(id:string, token:string){
    console.log("detelhe Questionario",id)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    try{
      console.log(`${questionarioURI}/${id}`)
      return this.http.get<any>(`${questionarioURI}/${id}`, {headers});

    }catch(err){
      return of(false);
    }
  }

}
