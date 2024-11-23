import { Component, Injectable, OnInit } from "@angular/core";
import { MaterialModule } from "../material.module";
import { FormBuilder } from "@angular/forms";
import { response } from "express";
import { CookieService } from "ngx-cookie-service";
import { AutorizacaoService } from "../_service/service.component";
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { Location } from '@angular/common';


@Component({
    selector: 'app-perfil',
    standalone: true,
    imports: [MaterialModule],
    templateUrl: './perfil.component.html',
    styleUrl: './perfil.component.css'
  })
  
  
  @Injectable({
    providedIn: 'root'
  })

  
  

export class PerfilComponent implements OnInit{

    constructor(public autorizacaoService:AutorizacaoService,
        private cookieService: CookieService,
        private router: Router,
        public header: HeaderComponent,
        private location: Location
  ) {  }

    infoUsuario={
        usuario:'',
        id:'',
        token:''
        }
  usuarioLogado: boolean = false;

        
    ngOnInit(): void {
      this.autorizacaoService.detalheUsuario(this.cookieService.get('id'),this.cookieService.get('token')).subscribe((response2: any) => {
        console.log("2nd response", response2);
        this.infoUsuario.id = response2._id
        this.infoUsuario.usuario = response2.usuario
        this.infoUsuario.token = this.cookieService.get('token')
        console.log("cookie ID",this.cookieService.get('id'));
        console.log("cookie token",this.cookieService.get('token'));
          
          
        })
        this.header.alteraHeader();
    }

    logout(){
      if(this.autorizacaoService.statusLogin()){
        this.autorizacaoService.deslogar();
        this.usuarioLogado = false;
        this.cookieService.delete('id');
        this.cookieService.delete('token');
        this.router.navigate(['/login'])

      }
    }


    

}
