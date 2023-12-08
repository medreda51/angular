import { Component,OnInit} from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
//import { CLIENTES } from './clientes.json';
import swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})

export class ClientesComponent implements OnInit{

  clientes:Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;

  
  constructor(private clienteService: ClienteService,
    private activatedRoute:ActivatedRoute,
    private modalService:ModalService){
    this.clientes= [];
    this.paginador= null;
    this.clienteSeleccionado = new Cliente();
  }
  
  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = Number(params.get('page'));

        if (!page) {
          page = 0;
        }

        this.clienteService.getClientes(page).pipe(
            tap(response => {
              console.log('ClientesComponent: tap 3');
              (response.content as Cliente[]).forEach(cliente => 
                console.log(cliente.nombre));
            })
          ).subscribe(response => {
            this.clientes = response.content as Cliente[];
            this.paginador = response;
          });
    });
  }

  /**
   * Es nuestro observador
  */
  /**
   * ngOnInit(){
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes=clientes
    );
  }
   */



   delete(cliente: Cliente): void {
    swal.fire({
      title : 'Está seguro',
      text : `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon : 'warning',
      showCancelButton : true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }
  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }


}
