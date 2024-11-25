import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AutorizacaoService } from '../_service/user-service.component';
import { CookieService } from 'ngx-cookie-service';


export const autorizacaoGuard = () => {
    const autorizaService = inject(AutorizacaoService);
    const router = inject(Router);

  if (autorizaService.statusLogin()) {
      // autorizaService.autorizar(autorizaService.);
      return true;
  }else{
      autorizaService.deslogar();
      router.navigate(['/login']);
      return false;
  }
};

export const autorizaPerfil = () => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  if (cookieService.get('token')) {
      return true;
  } else {
      router.navigate(['/login']);
      return false;
  }
}

export const autorizaLogin = () => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  if (!cookieService.get('token')) {
      return true;
  } else {
      router.navigate(['/perfil']);
      return false;
  }
}
