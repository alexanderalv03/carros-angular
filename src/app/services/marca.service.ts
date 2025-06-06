import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Marca } from '../models/marca';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {


  http = inject(HttpClient);

  API = environment.SERVIDOR+ "/api/marca";

  constructor() { }

  listAll(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.API + "/findAll");
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + "/delete/" + id, { responseType: 'text' as 'json' });
  }

  save(marca: Marca): Observable<string> {
    return this.http.post<string>(this.API + "/save", marca, { responseType: 'text' as 'json' });
  }

  update(marca: Marca, id: number): Observable<string> {
    return this.http.put<string>(this.API + "/update/" + id, marca, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Marca> {
    return this.http.get<Marca>(this.API + "/findById/" + id);
  }
}
