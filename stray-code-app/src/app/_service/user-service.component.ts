import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginModel } from '../login/login-model.component';
import { catchError, map, Observable, of } from 'rxjs';
import { response } from 'express';

const loginURI:string = "http://localhost:3000"
const questionarioURI: string = "http://localhost:3000/questionario"

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {
  autorizado = false;
  isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  autorizar(usuario: LoginModel) {
      return this.http.post<any>(`${loginURI}/login`, usuario);

  }


  cadastrar(usuario: LoginModel): Observable<boolean> {
    if (this.isBrowser) {
      return this.http.post<any>(`${loginURI}/register`, usuario).pipe(
        map((response) => response.success || false),
        catchError((err) => {
          console.error("Erro ao realizar login:", err);
          return of(false);
        })
      );
    } else {
      console.warn("LocalStorage não está disponível no servidor.");
      return of(false);
    }
  }

  detalheUsuario(id: string, token: string) {
    if (this.isBrowser) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      try {
        return this.http.get<any>(`${loginURI}/user/${id}`, { headers });
    }catch (error) {
      console.error('Erro inesperado no método detalheUsuario:', error);
      return of(false);
    }
    } else {
      return of(false);
    }

  }

  deletarUsuario(id: string, token: string){

    if(this.isBrowser){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      try {
        return this.http.delete<any>(`${loginURI}/user/${id}`, { headers });
      } catch (error) {
        console.error('Erro inesperado no método deletarUsuario:', error);
        return of(false);
      }
    } else {
      return of(false);
    }
  }

  atualizarSenha(id: string, token: string, senha: string){
    if(this.isBrowser){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      const body = { senha };
      try {
        return this.http.put<any>(`${loginURI}/user/${id}`, body, { headers });
      } catch (error) {
        console.error('Erro inesperado no método atualizarSenha:', error);
        return of(false);
      }
    } else {
      return of(false);
    }
  }

  atualizarQuest(id: string, token: string, infoQuestionario: any){
    if(this.isBrowser){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      });

      try {
        return this.http.put<any>(`${questionarioURI}/${id}`, infoQuestionario, { headers });
      } catch (error) {
        console.error('Erro inesperado no método atualizarSenha:', error);
        return of(false);
      }
    } else {
      return of(false);
    }
  }



  deslogar() {
    if (this.isBrowser) {
      localStorage.clear();
    }
    this.autorizado = false;
  }

  statusLogin() {
    if (this.isBrowser) {
      return !!localStorage.getItem("login");
    }
    return false;
  }

}
