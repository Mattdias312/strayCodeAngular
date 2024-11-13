import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AutorizacaoService {
constructor(private http:HttpClient){

}
  autorizado = false;

 

  autorizar(){

    this.http.post<any>("http://localhost:3003/login", {
      login: "Gabriela",
      senha: "12334"
    }).subscribe({
      next: (response) => {
        response.message;
      }, error: (err) => {

      }
    })

    localStorage.setItem("login","SIM");
    }

  deslogar(){
    localStorage.clear();
  }

  statusLogin(){
    return !!localStorage.getItem("login");
  }
}
