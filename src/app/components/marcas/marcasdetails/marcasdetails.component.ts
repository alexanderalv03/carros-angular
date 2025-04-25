import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Marca } from '../../../models/marca';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { MarcaService } from '../../../services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcasdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './marcasdetails.component.html',
  styleUrl: './marcasdetails.component.scss'
})
export class MarcasdetailsComponent {

  @Input() marca: Marca = new Marca(""); // Marca nova por padrão
  @Output() retorno = new EventEmitter<Marca>(); // Emite a marca após salvar

  marcaService = inject(MarcaService);

  save() {
    if (this.marca.marcaNome.trim().length === 0) {
      Swal.fire({
        title: 'Preencha o nome da marca',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if (this.marca.marcaId > 0) {
      // Atualizar marca existente
      this.marcaService.update(this.marca, this.marca.marcaId).subscribe({
        next: msg => {
          Swal.fire({ title: msg, icon: 'success' });
          this.retorno.emit(this.marca);
        },
        error: err => {
          Swal.fire({ title: 'Erro ao atualizar', icon: 'error' });
        }
      });
    } else {
      // Salvar nova marca
      this.marcaService.save(this.marca).subscribe({
        next: msg => {
          Swal.fire({ title: msg, icon: 'success' });
          this.retorno.emit(this.marca);
        },
        error: err => {
          Swal.fire({ title: 'Erro ao salvar', icon: 'error' });
        }
      });
    }
  }
}
