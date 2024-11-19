import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginModel } from '../_models/login/login-model.component';
import { catchError, map, Observable, of } from 'rxjs';
import { response } from 'express';

const loginURI:string = "http://localhost:3003"

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
    let token;
    // if (this.isBrowser) {
      return this.http.post<any>(`${loginURI}/login`, usuario);
            
      // pipe(
      //   map((response) => {
      //     if (response.success) {
      //       this.autorizado = true;
      //       localStorage.setItem("login", "SIM");
      //       console.log("Login realizado com sucesso!");
      //       console.log(response);
      //       this.detalheUsuario(response.id,response.token)
      //       return true;
      //     } else {
      //       console.warn("Falha no login:", response.message);
      //       this.autorizado = false;
      //       return false;
      //     }
      //   }),
      //   catchError((err) => {
      //     console.error("Erro ao realizar login:", err);
      //     this.autorizado = false;
      //     return of(false); // Retorna `false` em caso de erro
      //   })
      // );
    // } else {
      // console.warn("LocalStorage não está disponível no servidor.");
    // }
  }


  cadastrar(usuario: LoginModel): Observable<boolean> {
    if (this.isBrowser) {
      return this.http.post<any>(`${loginURI}/create`, usuario).pipe(
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
      console.log(`${loginURI}/login/${id}`)
      console.log('Headers enviados:', headers);
      console.log('Headers enviados (chaves):', headers.keys());
      console.log('Content-Type:', headers.get('Content-Type'));
      console.log('x-access-token:', headers.get('x-access-token'));
      try {
        return this.http.get<any>(`${loginURI}/login/${id}`, { headers });
      // console.log('Antes do HTTP GET');
      // const resultado = this.http.get<any>(`${loginURI}/login/${id}`, { headers });
      // console.log('Depois do HTTP GET', resultado);
      //    return resultado;


    }catch (error) {
      console.error('Erro inesperado no método detalheUsuario:', error);
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
