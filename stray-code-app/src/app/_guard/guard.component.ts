import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AutorizacaoService } from '../_service/service.component';


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
