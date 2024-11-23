import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { AboutComponent } from './about/about.component';
import { autorizacaoGuard, autorizaLogin, autorizaPerfil } from './_guard/guard.component';
import { LoginComponent } from './login/login.component';
import { AbrirEmpresaComponent } from './abrir-empresa/abrir-empresa.component';
import { ContabilidadeComponent } from './contabilidade/contabilidade.component';
import { MarketingComponent } from './marketing/marketing.component';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { NotaFiscalComponent } from './nota-fiscal/nota-fiscal.component';
import { CnaeComponent } from './cnae/cnae.component';
import { TributacaoComponent } from './tributacao/tributacao.component';
import { QuestionarioComponent } from './questionario/questionario.component';
import { PeriodicaComponent } from './periodica/periodica.component';
import { PerfilComponent } from './perfil/perfil.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'categoria', component: CategoryComponent},
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent, canActivate: [autorizaLogin]},
  { path: 'abertura', component: AbrirEmpresaComponent},
  { path: 'contabilidade', component: ContabilidadeComponent},
  { path: 'marketing', component: MarketingComponent},
  { path: 'financeiro', component: FinanceiroComponent},
  { path: 'nota-fiscal', component: NotaFiscalComponent},
  { path: 'cnae', component: CnaeComponent},
  { path: 'tributacao', component: TributacaoComponent},
  { path: 'questionario', component: QuestionarioComponent, canActivate: [autorizacaoGuard]},
  { path: 'periodica', component: PeriodicaComponent},
  { path: 'perfil', component: PerfilComponent, canActivate: [autorizaPerfil]},


  { path: '**', component: HomeComponent},

];
