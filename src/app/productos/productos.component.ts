import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})

export class ProductosComponent implements OnInit{
  
  productos:Producto[];

  constructor(private productService:ProductoService){
    this.productos = [];
  }

  ngOnInit(): void {
    this.productService.getProductos().subscribe(
      productos => this.productos=productos
    );
  }

}
