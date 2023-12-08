import { Injectable } from '@angular/core';
import { Producto } from './producto';
//import { PRODUCTOS } from './productos.json';
import { Observable,of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndPoint: string='http://localhost:8080/api/productos';

  constructor(private httpClient: HttpClient) { }

  
  getProductos(): Observable<Producto[]>{
    //return of(PRODUCTOS);
    return this.httpClient.get(this.urlEndPoint).pipe(
      map((response) => response as Producto[])
    );
  }
}
