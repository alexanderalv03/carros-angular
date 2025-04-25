import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MarcaService } from '../../../services/marca.service';
import { Marca } from '../../../models/marca';
import Swal from 'sweetalert2';
import { MarcasdetailsComponent } from '../marcasdetails/marcasdetails.component';


@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [MdbModalModule, MarcasdetailsComponent],
  templateUrl: './marcaslist.component.html',
  styleUrl: './marcaslist.component.scss'
})
export class MarcaslistComponent {
  modalService = inject(MdbModalService);
  @ViewChild("modalMarcaDetalhe") modalMarcaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();



  marcaService = inject(MarcaService);
  marcaEdit: Marca = new Marca("");
  listaMarcas: Marca[] = [];

  constructor() {
    this.findAll();
  }

  findAll() {
    this.marcaService.listAll().subscribe({
      next: lista => this.listaMarcas = lista,
      error: erro => {
        Swal.fire({ title: 'Ocorreu um erro', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  deleteMarcaById(marca: Marca) {
    Swal.fire({
      title: 'Deletar registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Não, cancelar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcaService.delete(marca.marcaId).subscribe({
          next: mensagem => {
            Swal.fire({ title: mensagem, icon: 'success', confirmButtonText: 'Ok' });
            this.findAll();
          },
          error: erro => {
            Swal.fire({ title: 'Ocorreu um erro', icon: 'error', confirmButtonText: 'Ok' });
          }
        });
      }
    });
  }

  newMarca() {
    this.marcaEdit = new Marca("");
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  editMarca(marca: Marca) {
    this.marcaEdit = Object.assign({}, marca);
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  retornoDetalhe(marca: Marca) {
    this.findAll();
    this.modalRef.close();
  }
  selectMarca(marca: Marca){
    this.retorno.emit(marca);

  }

}
