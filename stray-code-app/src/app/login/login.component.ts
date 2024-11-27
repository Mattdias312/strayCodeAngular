import { Component, OnInit, Injectable, Input } from '@angular/core';
import { MaterialModule } from '../material.module';
import { AutorizacaoService } from '../_service/user-service.component';
import { LoginModel } from './login-model.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CategoryEditComponent } from '../category.edit/category.edit.component';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


@Injectable({
  providedIn: 'root'
})


export class LoginComponent implements OnInit{

  public usuarioForm!: FormGroup;

  @Input() public editableLogin!: LoginModel;

  constructor(public formBuilder: FormBuilder,
    public autorizacaoService:AutorizacaoService,
    private cookieService: CookieService,
    private router: Router,
    public header: HeaderComponent
  ) {  }

  usuarios:LoginModel[] = [] as LoginModel[];
  novoUsuario:LoginModel = {} as LoginModel;
  timeout: number = 4000;
  // alert:boolean = false;
  // alertType: String = '';
  // alertText: String = '';
  usuarioExiste: boolean = false;
  usuarioLogado: boolean = false;
  showPassword = false;
  token:boolean = true
  usuario:LoginModel = {
    usuario: '',
    senha: ''
  }
  infoUsuario={
    usuario:'',
    id:'',
    token:''
  }

  botaoLogin = () =>
    this.autorizacaoService.statusLogin() ? "Sair" : "Entrar";

  descricaoLogin = () =>
    this.autorizacaoService.statusLogin() ? "Login efetuado" : "Faça o login para preencher o questionário";

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      usuario: this.editableLogin != null ? this.editableLogin.usuario : '',
      senha: this.editableLogin != null ?  this.editableLogin.senha : '',
    });
    this.usuario = {
      usuario: '',
      senha: ''
    }


}

async cadastrar() {
  if (await this.verificaSeUsuarioExiste()) {
    this.showAlert('Erro', 'Esse usuário já existe', 'error');
  } else {
    if (!String(this.usuarioForm.get('usuario')?.value).trim()) {
      this.showAlert('Erro', 'Deve informar o nome de usuário', 'error');
    } else if (String(this.usuarioForm.get('usuario')?.value).length < 3) {
      this.showAlert('Erro', 'O nome de usuário deve ter no mínimo 3 caracteres', 'error');
    } else if (!String(this.usuarioForm.get('senha')?.value).trim()) {
      this.showAlert('Erro', 'Deve informar a senha', 'error');
    } else if (String(this.usuarioForm.get('senha')?.value).length < 6) {
      this.showAlert('Erro', 'A senha deve ter no mínimo 6 caracteres', 'error');
    } else {
      this.showAlert('Sucesso', 'Cadastrado com sucesso', 'success');
      this.novoUsuario = this.usuarioForm.value;
      this.usuarios.push(this.novoUsuario);
    }
  }
}

   AlternarVisibilidade() {
    this.showPassword = !this.showPassword;
  }

  async verificaSeUsuarioExiste(): Promise<boolean> {
    this.usuario.usuario = this.usuarioForm.get('usuario')?.value;
    this.usuario.senha = this.usuarioForm.get('senha')?.value;

    try {
      const resultado = await this.autorizacaoService.cadastrar(this.usuario).toPromise();
      return !resultado; // Retorna o boolean recebido da API
    } catch (error) {
      return false;
    }
  }

  private showAlert(title: string, text: string, icon: 'success' | 'error'): void {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: '#000000',
      background: '#ffffff',
      color: '#000000'
    });
  }

  async clickLogin() {
    this.usuario.usuario = this.usuarioForm.get('usuario')?.value;
    this.usuario.senha = this.usuarioForm.get('senha')?.value;

    if (!this.autorizacaoService.statusLogin()) {
      try {
        this.autorizacaoService.autorizar(this.usuario).subscribe(async (response) => {
          const token = response.token;

          this.usuarioLogado = !!token;

          if (this.usuarioLogado) {
            this.cookieService.set('id', response.id, 1/24);
            this.cookieService.set('token', response.token, 1/24);
            this.infoUsuario.token = token;
            localStorage.setItem("login", "SIM");
            this.router.navigate(['/perfil']);
          }
        }, (_error) => {
          this.showAlert('Erro', 'Usuário e/ou senha incorreto', 'error');
        });
      } catch (error) {
        console.error("Erro durante o login:", error);
        this.showAlert('Erro', 'Erro no servidor. Tente novamente mais tarde.', 'error');
      }
    } else {
      this.usuarioLogado = true;
    }

    return this.usuarioLogado;
  }

  logout(){
    if(this.autorizacaoService.statusLogin()){
      this.autorizacaoService.deslogar();
      this.usuarioLogado = false;
      this.cookieService.delete('id');
      this.cookieService.delete('token');
    }
  }
}


