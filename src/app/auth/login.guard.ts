import { inject } from '@angular/core';
import { LoginService} from './login.service';
import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService);

  if(loginService.hasPermission("user") && state.url == '/admin/marcas', '/admin/acessorios'){
    alert('voce nao tem permissao para acessar essa rota');
    return false;
  }

  return true;
};
