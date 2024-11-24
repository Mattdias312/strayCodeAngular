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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    try{
      return this.http.get<any>(`${questionarioURI}/${id}`, {headers});

    }catch(err){
      return of(false);
    }
  }

  cadastrar(token:string, infoQuestionario:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    try{
      console.log(`${questionarioURI}`)
      return this.http.post<any>(`${questionarioURI}`, infoQuestionario, {headers});

    }catch(err){
      return of(false);
    }
  }

  editar(id:string, token:string, infoQuestionario:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    try{
      console.log(`${questionarioURI}/${id}`)
      return this.http.put<any>(`${questionarioURI}/${id}`, infoQuestionario, {headers});

    }catch(err){
      return of(false);
    }
  }

}
