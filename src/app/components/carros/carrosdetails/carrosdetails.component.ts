import { CarroService } from './../../../services/carro.service';
import { Component, EventEmitter, inject, Input, NgModule, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  @Input("carro") carro: Carro = new Carro("", 0);
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  CarroService = inject(CarroService);

  constructor(){
    let id = this.router.snapshot.params["id"];
    if(id>0){
      this.findById(id);
    }

  }

  findById(id: number){

    this.CarroService.findById(id).subscribe({
      next: retorno => {
        this.carro = retorno;

      },
      error: erro =>{
        Swal.fire({
                  title: 'ocorreu um ero',

                  icon: 'error',
                  confirmButtonText: 'Ok'
                })

      }
    });
  }




  save(){
    if(this.carro.id > 0){

      this.CarroService.update(this.carro, this.carro.id).subscribe({
        next: mensagem => {

          Swal.fire({
            title: mensagem,

            icon: 'error',
            confirmButtonText: 'Ok'
          });

          this.router2.navigate(['admin/carros'],  {state: {carroEditado: this.carro}});
          this.retorno.emit(this.carro);


        },
        error: erro =>{

          Swal.fire({
                    title: 'ocorreu um ero',

                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })

        }
      });




    }else{
      console.log("Novo carro sendo cadastrado:", this.carro);

      this.CarroService.save(this.carro).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok'
          })

        },
        error: erro =>{

        }
      });


    this.router2.navigate(['admin/carros'], {state: {carroNovo: this.carro}});
    this.retorno.emit(this.carro);
  }


}

}
