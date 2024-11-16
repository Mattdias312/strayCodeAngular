import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginModel } from '../_models/login/login-model.component';
import { catchError, map, Observable, of } from 'rxjs';

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


  // autorizar(usuario:LoginModel) {
  //   if (this.isBrowser) {
  //     this.http.post<any>(`${loginURI}/login`, usuario).subscribe({
  //       next: (response) => {
  //         if (response.success) {
  //           this.autorizado = true;
  //           localStorage.setItem("login", "SIM");
  //           console.log("Login realizado com sucesso!");
  //         } else {
  //           console.warn("Falha no login: ", response.message);
  //           this.autorizado = false;
  //         }
  //       },
  //       error: (err) => {
  //         console.error("Erro ao realizar login: ", err);
  //         this.autorizado = false;
  //       }
  //     });
  //   } else {
  //     console.warn("LocalStorage não está disponível no servidor.");
  //     this.autorizado = false;
  //   }
  // }

  autorizar(usuario: LoginModel): Observable<boolean> {
    if (this.isBrowser) {
      return this.http.post<any>(`${loginURI}/login`, usuario).pipe(
        map((response) => {
          if (response.success) {
            this.autorizado = true;
            localStorage.setItem("login", "SIM");
            console.log("Login realizado com sucesso!");
            return true;
          } else {
            console.warn("Falha no login:", response.message);
            this.autorizado = false;
            return false;
          }
        }),
        catchError((err) => {
          console.error("Erro ao realizar login:", err);
          this.autorizado = false;
          return of(false); // Retorna `false` em caso de erro
        })
      );
    } else {
      console.warn("LocalStorage não está disponível no servidor.");
      this.autorizado = false;
      return of(false); // Retorna `false` para SSR
    }
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
