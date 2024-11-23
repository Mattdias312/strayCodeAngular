import { Component, OnInit, Injectable, Input } from '@angular/core';
import { MaterialModule } from '../material.module';
import { AutorizacaoService } from '../_service/service.component';
import { LoginModel } from './login-model.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CategoryEditComponent } from '../category.edit/category.edit.component';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';


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
  alert:boolean = false;
  alertType: String = '';
  alertText: String = '';
  usuarioExiste: boolean = false;
  usuarioLogado: boolean = false;
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
    console.log("cookie ID",this.cookieService.get('id'));
    console.log("cookie token",this.cookieService.get('token'));
  // this.token=!this.cookieService.get('token')
  // if(this.token){
  //   this.router.navigate(['/perfil'])
  // }

}

   async cadastrar(){
    this.alert=true
    if(await this.verificaSeUsuarioExiste()){
      this.alertType = 'danger'
      this.alertText = 'Esse usuário já existe'
      setTimeout(() => this.alert=false, this.timeout)
    }else{
      if(!String(this.usuarioForm.get('usuario')?.value).trim()){
        this.alertType = 'danger'
        this.alertText = 'Deve Informar o nome de usuário'
        setTimeout(() => this.alert=false, this.timeout)
      }else if(String(this.usuarioForm.get('usuario')?.value).length < 5){
        this.alertType = 'danger'
        this.alertText = 'O nome de usuário deve ter no mínimo 5 caracteres'
        setTimeout(() => this.alert=false, this.timeout)
      }else if(!String(this.usuarioForm.get('senha')?.value).trim()){
        this.alertType = 'danger'
        this.alertText = 'Deve Informar a senha'
        setTimeout(() => this.alert=false, this.timeout)
      }else if(String(this.usuarioForm.get('senha')?.value).length < 5){
        this.alertType = 'danger'
        this.alertText = 'A senha dete ter no mínimo 5 caracters'
        setTimeout(() => this.alert=false, this.timeout)
      }else{
        this.alertType = 'success'
        this.alertText = 'Cadastrado com sucesso'
        this.novoUsuario = this.usuarioForm.value;
        this.usuarios.push(this.novoUsuario)
        setTimeout(() => this.alert=false, this.timeout)
      }
    }
   }

  async verificaSeUsuarioExiste(): Promise<boolean> {
    this.usuario.usuario = this.usuarioForm.get('usuario')?.value;
    this.usuario.senha = this.usuarioForm.get('senha')?.value;

    try {
      const resultado = await this.autorizacaoService.cadastrar(this.usuario).toPromise();
      console.log("Resultado da API:", !resultado);
      return !resultado; // Retorna o boolean recebido da API
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      return false;
    }
  }


  async clickLogin() {
    this.usuario.usuario = this.usuarioForm.get('usuario')?.value;
    this.usuario.senha = this.usuarioForm.get('senha')?.value;

    if (!this.autorizacaoService.statusLogin()) {
      console.log("Iniciando login...");
      try {
        this.autorizacaoService.autorizar(this.usuario).subscribe(async (response) => {
          const token = response.token;

          this.usuarioLogado = !!token;

          if (this.usuarioLogado) {
            this.cookieService.set('id',response.id,1/24)
            this.cookieService.set('token',response.token,1/24)
            this.infoUsuario.token = token;
            localStorage.setItem("login", "SIM");
            console.log("Login bem-sucedido");
            this.router.navigate(['/perfil'])


          } else {

          }

          console.log("usuario logado", this.usuarioLogado);

          console.log("Response", response, token);
          // this.autorizacaoService.detalheUsuario(response.id,response.token).subscribe((response2: any) => {
          //     console.log("2nd response", response2);
          //   this.infoUsuario.id = response2._id
          //   this.infoUsuario.usuario = response2.usuario
          //   console.log("cookie ID",this.cookieService.get('id'));
          //   console.log("cookie token",this.cookieService.get('token'));
          // })
      }, (_error) => {
            console.log("Falha no login");
            this.alert = true;
            this.alertType = 'danger';
            this.alertText = 'Usuário e/ou senha incorreto';
            setTimeout(() => (this.alert = false), this.timeout);
      })

      } catch (error) {
        console.error("Erro durante o login:", error);
        this.alert = true;
        this.alertType = 'danger';
        this.alertText = 'Erro no servidor. Tente novamente mais tarde.';
        setTimeout(() => (this.alert = false), this.timeout);
      }
    } else {
      console.log("Usuário já está logado.");
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


