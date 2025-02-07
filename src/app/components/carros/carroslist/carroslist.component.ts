import { CarroService } from './../../../services/carro.service';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosdetailsComponent } from "../carrosdetails/carrosdetails.component";


@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {

  modalService = inject(MdbModalService);
  @ViewChild("modalCarroDetalhe") modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  carroService = inject(CarroService);

  carroEdit: Carro = new Carro("", 0);
  lista: Carro[] = [];

  constructor(){

    this.findAll();


    let carroNovo = history.state.carroNovo;

    let carroEditado = history.state.carroEditado;

    if(carroEditado){

      let indice = this.lista.findIndex(x => {return x.id == carroEditado.id});
      this.lista[indice] = carroEditado;

    }


    if(carroNovo){
      carroNovo.id = 555;
      this.lista.push(carroNovo);


    }



  }

  findAll(){
    this.carroService.listAll().subscribe({
      next: lista => {

        this.lista = lista;

      },
      error:erro =>{

        Swal.fire({
          title: 'ocorreu um ero',

          icon: 'error',
          confirmButtonText: 'Ok'
        })

      }
    });
      }

  deleteById(carro: Carro){

    Swal.fire({
            title: 'deletar registro?',

            icon: 'warning',
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!"
          }).then((result) =>{
            if(result.isConfirmed){

              this.carroService.delete(carro.id).subscribe({
                next: mensagem => {

                  Swal.fire({
                    title: mensagem,

                    icon: 'success',
                    confirmButtonText: 'Ok'
                  });
                  this.findAll();

                },
                error:erro =>{

                  Swal.fire({
                    title: 'ocorreu um ero',

                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })

                }
              });

            }
          })
  }


  new(){
    this.carroEdit = new Carro("", 0);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);

  }

  edit(carro:Carro){
    this.carroEdit = Object.assign({}, carro);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);

  }

  retornoDetalhe(carro: Carro){

    this.findAll();
     this.modalRef.close();
  }


}

