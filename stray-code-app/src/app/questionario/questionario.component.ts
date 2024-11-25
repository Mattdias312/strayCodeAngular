import { CookieService } from 'ngx-cookie-service';
import { QuestionarioService } from './../_service/questionario-service.component';
import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from '../material.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionarioModel } from '../_models/questionario-model';
import { AutorizacaoService } from '../_service/user-service.component';

export interface TipoEmpresa {
  id: number;
  nome:string;
}

export interface RamoEmpresa{
  id: number;
  nome: string;
  idTipo: number;
}

export interface Cnae{
  id: number;
  codigo: string;
  nome: string;
  idRamo: number;
}

const TIPO_EMPRESA: TipoEmpresa[] = [
  {id: 1, nome: "Comércio"},
  {id: 2, nome: "Serviços"},
  {id: 3, nome: "Indústria"}
]

const RAMO_EMPRESA: RamoEmpresa[] = [
{id:1, idTipo:3,nome:'AGRICULTURA, PECUÁRIA E SERVIÇOS RELACIONADOS'},
{id:2, idTipo:3,nome:'PRODUÇÃO FLORESTAL'},
{id:3, idTipo:1,nome:'EXTRAÇÃO DE CARVÃO MINERAL'},
{id:4, idTipo:3,nome:'EXTRAÇÃO DE MINERAIS METÁLICOS'},
{id:5, idTipo:2,nome:'CAPTAÇÃO, TRATAMENTO E DISTRIBUIÇÃO DE ÁGUA'},
{id:6, idTipo:2,nome:'COLETA, TRATAMENTO E DISPOSIÇÃO DE RESÍDUOS; RECUPERAÇÃO DE MATERIAIS'},
{id:7, idTipo:1,nome:'COMÉRCIO E REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS'},
{id:8, idTipo:1,nome:'COMÉRCIO POR ATACADO, EXCETO VEÍCULOS AUTOMOTORES E MOTOCICLETAS'},
{id:9, idTipo:2,nome:'TRANSPORTE TERRESTRE'},
{id:10, idTipo:3,nome:'TRANSPORTE AQUAVIÁRIO'}
]

const CNAE: Cnae[] = [
{id:1,codigo:'0113-0/00',nome:'Cultivo de cana-de-açúcar',idRamo:1},
{id:2,codigo:'0131-8/00',nome:'Cultivo de laranja',idRamo:1},
{id:3,codigo:'0210-1/01',nome:'Cultivo de eucalipto',idRamo:2},
{id:4,codigo:'0220-9/04',nome:'Coleta de látex em florestas nativas',idRamo:2},
{id:5,codigo:'0500-3/01',nome:'Extração de carvão mineral',idRamo:3},
{id:6,codigo:'0710-3/01',nome:'Extração de minério de ferro',idRamo:4},
{id:7,codigo:'0721-9/01',nome:'Extração de minério de alumínio',idRamo:4},
{id:8,codigo:'3600-6/01',nome:'Captação, tratamento e distribuição de água',idRamo:5},
{id:9,codigo:'3600-6/02',nome:'Distribuição de água por caminhões',idRamo:5},
{id:10,codigo:'3811-4/00',nome:'Coleta de resíduos não perigosos',idRamo:6},
{id:11,codigo:'3900-5/00',nome:'Descontaminação e outros serviços de gestão de resíduos',idRamo:6},
{id:12,codigo:'4511-1/01',nome:'Comércio a varejo de automóveis, camionetas e utilitários novos',idRamo:7},
{id:13,codigo:'4512-9/01',nome:'Representantes comerciais e agentes do comércio de veículos automotores',idRamo:7},
{id:14,codigo:'4611-7/00',nome:'Representantes comerciais e agentes do comércio de matérias-primas agrícolas e animais vivos',idRamo:8},
{id:15,codigo:'4621-4/00',nome:'Comércio atacadista de café em grão',idRamo:8},
{id:16,codigo:'4912-4/01',nome:'Transporte ferroviário de passageiros intermunicipal e interestadual',idRamo:9},
{id:17,codigo:'4923-0/01',nome:'Serviço de táxi',idRamo:9},
{id:18,codigo:'5011-4/02',nome:'Transporte marítimo de cabotagem - Passageiros',idRamo:10},
{id:19,codigo:'5011-4/01',nome:'Transporte marítimo de cabotagem - Carga',idRamo:10}
]

@Component({
  selector: 'app-questionario',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule,MaterialModule],
  templateUrl: './questionario.component.html',
  styleUrl: './questionario.component.scss'
})
export class QuestionarioComponent {
  public questionarioForm!: FormGroup;

  @Input() public editableQuestionario!: QuestionarioModel;

  constructor(public formBuilder: FormBuilder,
    public questionarioService: QuestionarioService,
    private cookieService: CookieService,
    public autorizacaoService:AutorizacaoService,
  ){}

  tipoEmpresa = TIPO_EMPRESA
  ramoEmpresa = RAMO_EMPRESA
  cnae = CNAE

  tipoEmpresaFiltrado!: TipoEmpresa[]
  ramoEmpresaFiltrado!: RamoEmpresa[]
  cnaeFiltrado!: Cnae[]

  alert:boolean = false;
  alertType: String = '';
  alertText: String = '';
  edit:boolean = false;
  toggleEdit:boolean = true;

  infoUsuario={
    id:'',
    token:''
  }
  infoQuestionario={
    usuario: this.infoUsuario.id,
    tipoEmpresa: '',
    ramoEmpresa: '',
    cnae: '',
  }
  idQuetionario:string = ''

  ngOnInit(){
    this.infoUsuario.id = this.cookieService.get('id');
    this.infoUsuario.token = this.cookieService.get('token');
    this.cookieService.set('idQuest', '')
    this.questionarioForm = this.formBuilder.group({
      tipo: this.editableQuestionario != null ? this.editableQuestionario.tipo :null,
      ramo: this.editableQuestionario != null ?  this.editableQuestionario.ramo : null,
      cnae: this.editableQuestionario != null ?  this.editableQuestionario.cnae : null,
    });
    this.getQuestionario();

  }

  popularTipoEmpresa(){
    this.tipoEmpresaFiltrado = this.tipoEmpresa;
  }
  popularTodosRamoEmpresa(){
    this.ramoEmpresaFiltrado = this.ramoEmpresa;
  }
  popularTodosCnae(){
    this.cnaeFiltrado = this.cnae;
  }

  popularRamoEmpresa(event: Event){
    const target = event.target as HTMLSelectElement;
    if (target) {
      const tipoId = target.value;
    this.ramoEmpresaFiltrado = this.ramoEmpresa.filter(ramo => ramo.idTipo == Number(tipoId))
    }
  }

  popularCnae(event: Event){
    const target = event.target as HTMLSelectElement;
    if (target) {
      const ramoId = target.value;
    this.cnaeFiltrado = this.cnae.filter(cnae => cnae.idRamo == Number(ramoId))
    }
  }

  async cadastrar(){
    this.alert=true
    if(this.questionarioForm.get('tipo')?.value == null){
      this.alertType = 'danger'
      this.alertText = 'Deve Selecionar o Tipo Empresa'
      setTimeout(() => this.alert=false, 4000)
    }else if(this.questionarioForm.get('ramo')?.value == null){
      this.alertType = 'danger'
      this.alertText = 'Deve Selecionar o Ramo Empresa'
      setTimeout(() => this.alert=false, 4000)
    }else if(this.questionarioForm.get('cnae')?.value == null){
      this.alertType = 'danger'
      this.alertText = 'Deve Selecionar o Cnae'
      setTimeout(() => this.alert=false, 4000)
    }else{
      this.alertType = 'success'
      this.alertText = 'Questionário Salvo com sucesso'
      setTimeout(() => this.alert=false, 4000)

      this.infoQuestionario.tipoEmpresa = this.questionarioForm.get('tipo')?.value
      this.infoQuestionario.ramoEmpresa = this.questionarioForm.get('ramo')?.value
      this.infoQuestionario.cnae = this.questionarioForm.get('cnae')?.value
      this.infoQuestionario.usuario = this.infoUsuario.id
      if(this.idQuetionario == ''){
        this.questionarioService.cadastrar(this.infoUsuario.token, this.infoQuestionario).toPromise();
      }else{
        this.questionarioService.editar(this.idQuetionario, this.infoUsuario.token,this.infoQuestionario).toPromise();
      }

      this.questionarioForm.controls['tipo'].setValue(null)
      this.questionarioForm.controls['ramo'].setValue(null)
      this.questionarioForm.controls['cnae'].setValue(null)
      this.ramoEmpresaFiltrado = [];
      this.cnaeFiltrado = [];
      setTimeout(() => {this.popularTipoEmpresa()}, 200);
      await this.getQuestionario();
    }
  }

  async getQuestionario(){
    this.popularTipoEmpresa();
    this.popularTodosRamoEmpresa();
    this.popularTodosCnae();
   await this.questionarioService.detelheQuestionario(this.infoUsuario.id, this.infoUsuario.token).subscribe((response: any) => {
      this.questionarioForm.controls['tipo'].setValue(response.tipoEmpresa)
      this.questionarioForm.controls['ramo'].setValue(response.ramoEmpresa)
      this.questionarioForm.controls['cnae'].setValue(response.cnae)
      this.cookieService.set('idQuest',response._id)
      this.idQuetionario = this.cookieService.get('idQuest')
      console.log(this.idQuetionario)
      if(this.idQuetionario ==''){
        this.edit=false;
        this.questionarioForm.controls['tipo'].enable()
        this.questionarioForm.controls['ramo'].enable()
        this.questionarioForm.controls['cnae'].enable()
      }else{
        this.edit=true
        this.questionarioForm.controls['tipo'].disable()
        this.questionarioForm.controls['ramo'].disable()
        this.questionarioForm.controls['cnae'].disable()
        this.toggleEdit = true
      }
    })
  }

  editar(){
    this.questionarioForm.controls['tipo'].setValue(null)
    this.questionarioForm.controls['ramo'].setValue(null)
    this.questionarioForm.controls['cnae'].setValue(null)
    this.ramoEmpresaFiltrado = [];
    this.cnaeFiltrado = [];
    this.questionarioForm.controls['tipo'].enable()
    this.questionarioForm.controls['ramo'].enable()
    this.questionarioForm.controls['cnae'].enable()
    this.edit=false;
    this.toggleEdit = false
  }


}
