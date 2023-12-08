import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Cliente} from './cliente';
import { Region } from './region';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit{

  public cliente: Cliente = new Cliente();
  regiones: Region[]= [];
  public titulo:string = "Crear Cliente"
  public errores:string[]=[];

  constructor(private clienteService: ClienteService,
     private router: Router,
     private activateRoute:ActivatedRoute) {

     }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    });
    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  //los metodos create y update estan hechos de dos formas destintas para que veamos ambar opciones
  create(): void {
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente',`El cliente ${cliente.nombre} has sido creado con exito`, 'success')
      },
      // manejar los errores que llegan desde Backend
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      );
  }

  //los metodos create y update estan hechos de dos formas destintas para que veamos ambar opciones
  update():void{
    this.clienteService.update(this.cliente)
    .subscribe( json => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Actualizado', `${json.mensaje}:${json.cliente.nombre}`, 'success')
    },
    // manejar los errores que llegan desde Backend
    err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    }

    )
  }

  compararRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }
 




}

