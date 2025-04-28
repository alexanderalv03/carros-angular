import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AcessorioService } from '../../../services/acessorio.service';
import { Acessorio } from '../../../models/acessorio';
import Swal from 'sweetalert2';
import { AcessoriosdetailsComponent } from '../acessoriosdetails/acessoriosdetails.component';

@Component({
  selector: 'app-acessorioslist',
  standalone: true,
  imports: [MdbModalModule, AcessoriosdetailsComponent],
  templateUrl: './acessorioslist.component.html',
  styleUrl: './acessorioslist.component.scss'
})
export class AcessorioslistComponent {
  modalService = inject(MdbModalService);
  @ViewChild("modalAcessorioDetalhe") modalAcessorioDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  acessorioService = inject(AcessorioService);
  acessorioEdit: Acessorio = new Acessorio("");
  listaAcessorios: Acessorio[] = [];

  constructor() {
    this.findAll();
  }

  findAll() {
    this.acessorioService.listAll().subscribe({
      next: lista => this.listaAcessorios = lista,
      error: erro => {
        Swal.fire({ title: 'Ocorreu um erro', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  deleteAcessorioById(acessorio: Acessorio) {
    Swal.fire({
      title: 'Deletar registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Não, cancelar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.acessorioService.delete(acessorio.acessorioId).subscribe({
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

  newAcessorio() {
    this.acessorioEdit = new Acessorio("");
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  editAcessorio(acessorio: Acessorio) {
    this.acessorioEdit = Object.assign({}, acessorio);
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  retornoDetalhe(acessorio: Acessorio) {
    this.findAll();
    this.modalRef.close();
  }

  selectAcessorio(acessorio: Acessorio) {
    this.retorno.emit(acessorio);
  }
}
