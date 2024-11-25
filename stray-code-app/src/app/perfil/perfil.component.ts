import { Component, Injectable, Input, OnInit } from "@angular/core";
import { MaterialModule } from "../material.module";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { AutorizacaoService } from "../_service/user-service.component";
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { RedefinirModel } from "./redefinir-senha-model.component";
import { CommonModule } from '@angular/common';


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
        public formBuilder: FormBuilder
  ) {  }

  @Input() public editableSenha!: RedefinirModel;

  public senhaForm!: FormGroup;
  infoUsuario={
        usuario:'',
        id:'',
        token:''
        }
  usuarioLogado: boolean = false;
  token:boolean = true

  password:string = '';
  confirmPassword:string = '';
  showPassword:boolean = false;
  showPasswordConfirmar:boolean = false;
  showResetPassword:boolean = false;



    ngOnInit(): void {
      this.autorizacaoService.detalheUsuario(this.cookieService.get('id'),this.cookieService.get('token')).subscribe((response: any) => {
        this.infoUsuario.id = response._id
        this.infoUsuario.usuario = response.usuario
        this.infoUsuario.token = this.cookieService.get('token')
      })

    }

    AlternarVisibilidade() {
      this.showPassword = !this.showPassword;
    }

    AlternarVisibilidadeConfirmar() {
      this.showPasswordConfirmar = !this.showPasswordConfirmar;
    }

    showRedefinir(){
      this.senhaForm = this.formBuilder.group({
        senha: this.editableSenha != null ? this.editableSenha.senha : '',
        senhaConfirm: this.editableSenha != null ?  this.editableSenha.senhaConfirm : '',
      });
      this.showResetPassword = !this.showResetPassword
    }

    passwordsMatch(){
      return this.password === this.confirmPassword && this.password.length > 0;
    }

    alterarSenha(){
      if(this.passwordsMatch()){
        this.autorizacaoService.atualizarSenha(this.infoUsuario.id,this.infoUsuario.token, this.password).subscribe((response: any) => {
          this.showResetPassword = false;
          this.password = '';
          this.confirmPassword = '';
          this.senhaForm.reset();
        });
      }
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

    deletar(){
      this.autorizacaoService.deletarUsuario(this.infoUsuario.id,this.infoUsuario.token).subscribe((response: any) => {
        this.logout();
      });
    }




}
