import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Login } from '../../../auth/login';
import { LoginService } from '../../../auth/login.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  login: Login = new Login();

  router = inject(Router);
  loginService = inject(LoginService);

  constructor (){
    this.loginService.removerToken();
  }


  logar(){

    console.log(this.login);

    this.loginService.logar(this.login).subscribe(
      {
        next: token =>{
          if(token){
            this.loginService.addToken(token);
            console.log('Token recebido e salvo:', token);
            this.router.navigate(['/admin/carros']);
          }

        },
        error: erro =>{

          alert('erro')

        }
      }
    );

  }

}
