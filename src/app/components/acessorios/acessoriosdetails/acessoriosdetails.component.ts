import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Acessorio } from '../../../models/acessorio';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { AcessorioService } from '../../../services/acessorio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acessoriosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './acessoriosdetails.component.html',
  styleUrl: './acessoriosdetails.component.scss'
})
export class AcessoriosdetailsComponent {

  @Input() acessorio: Acessorio = new Acessorio(""); // Novo acessório por padrão
  @Output() retorno = new EventEmitter<Acessorio>(); // Emite o acessório após salvar

  acessorioService = inject(AcessorioService);

  save() {
    if (this.acessorio.acessorioNome.trim().length === 0) {
      Swal.fire({
        title: 'Preencha o nome do acessório',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if (this.acessorio.acessorioId > 0) {
      // Atualizar acessório existente
      this.acessorioService.update(this.acessorio, this.acessorio.acessorioId).subscribe({
        next: msg => {
          Swal.fire({ title: msg, icon: 'success' });
          this.retorno.emit(this.acessorio);
        },
        error: err => {
          Swal.fire({ title: 'Erro ao atualizar', icon: 'error' });
        }
      });
    } else {
      // Salvar novo acessório
      this.acessorioService.save(this.acessorio).subscribe({
        next: msg => {
          Swal.fire({ title: msg, icon: 'success' });
          this.retorno.emit(this.acessorio);
        },
        error: err => {
          Swal.fire({ title: 'Erro ao salvar', icon: 'error' });
        }
      });
    }
  }
}
