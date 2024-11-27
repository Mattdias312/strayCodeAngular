import { Component, Injectable, Input, OnInit } from "@angular/core";
import { MaterialModule } from "../material.module";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { AutorizacaoService } from "../_service/user-service.component";
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { RedefinirModel } from "./redefinir-senha-model.component";
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class PerfilComponent implements OnInit {

  constructor(
    public autorizacaoService: AutorizacaoService,
    private cookieService: CookieService,
    private router: Router,
    public header: HeaderComponent,
    public formBuilder: FormBuilder
  ) { }

  @Input() public editableSenha!: RedefinirModel;

  public senhaForm!: FormGroup;
  infoUsuario = {
    usuario: '',
    id: '',
    token: ''
  }
  usuarioLogado: boolean = false;
  token: boolean = true

  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showPasswordConfirmar: boolean = false;
  showResetPassword: boolean = false;

  ngOnInit(): void {
    this.autorizacaoService.detalheUsuario(this.cookieService.get('id'), this.cookieService.get('token')).subscribe((response: any) => {
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

  showRedefinir() {
    this.senhaForm = this.formBuilder.group({
      senha: this.editableSenha != null ? this.editableSenha.senha : '',
      senhaConfirm: this.editableSenha != null ? this.editableSenha.senhaConfirm : '',
    });
    this.showResetPassword = !this.showResetPassword
  }

  passwordsMatch() {
    return this.password === this.confirmPassword && this.password.length > 0;
  }

  passwordLength() {
    return String(this.password).length >= 5
  }

  alterarSenha() {
    if (!String(this.password).trim()) {
      this.showAlert('error', 'Deve informar a senha');
    } else if (String(this.password).length < 5) {
      this.showAlert('error', 'A senha deve ter no mínimo 5 caracteres');
    } else if (!(this.password === this.confirmPassword)) {
      this.showAlert('error', 'As senhas não coincidem');
    } else if (this.passwordsMatch()) {
      this.autorizacaoService.atualizarSenha(this.infoUsuario.id, this.infoUsuario.token, this.password).subscribe((response: any) => {
        this.showResetPassword = false;
        this.password = '';
        this.confirmPassword = '';
        this.senhaForm.reset();
        this.showAlert('success', 'Senha alterada com sucesso');
      });
    }
  }

  logout() {
    if (this.autorizacaoService.statusLogin()) {
      this.autorizacaoService.deslogar();
      this.usuarioLogado = false;
      this.cookieService.delete('id');
      this.cookieService.delete('token');
      this.router.navigate(['/login'])
    }
  }

  deletar() {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.autorizacaoService.deletarUsuario(this.infoUsuario.id, this.infoUsuario.token).subscribe(() => {
          this.logout();
          Swal.fire(
            'Deletado!',
            'Sua conta foi deletada.',
            'success'
          )
        });
      }
    })
  }

  showAlert(type: 'success' | 'error', text: string) {
    Swal.fire({
      icon: type,
      title: type === 'success' ? 'Sucesso!' : 'Erro!',
      text: text,
      timer: 2000,
      showConfirmButton: false
    });
  }
}

