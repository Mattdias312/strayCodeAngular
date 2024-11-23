import { Component, Injectable, Input, OnInit, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MaterialModule } from '../material.module';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { AutorizacaoService } from '../_service/service.component';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, MatButtonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

@Injectable({
  providedIn: 'root'
})

export class HeaderComponent implements OnInit {

  @Input() sidenav!: MatSidenav

  constructor(
    public autorizaService: AutorizacaoService,
    private cookieService: CookieService
  ) {};

  token:boolean = true;

  ngOnInit(): void {
  this.token=!this.cookieService.get('token')

  }

  public openSideNav() {
    this.sidenav.toggle();
  }

  public alteraHeader(){
    return this.token=!this.cookieService.get('token');
  }
}
