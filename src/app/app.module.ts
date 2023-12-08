import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './hearder/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './clientes/directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ClienteService } from './clientes/cliente.service';
import { ProductosComponent } from './productos/productos.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// los imports para el formato fecha
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DetalleComponent } from './clientes/detalle/detalle.component';

registerLocaleData(localeES, 'es');

const routes: Routes=[
  { path: '',redirectTo:'/clientes', pathMatch:'full'},
  { path: 'directivas',component:DirectivaComponent},
  { path: 'clientes',component:ClientesComponent},
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'clientes/form',component:FormComponent},
  { path: 'clientes/form/:id',component:FormComponent},
  { path: 'productos',component:ProductosComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    ProductosComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,MatDatepickerModule, MatNativeDateModule
  ],
  providers: [ClienteService, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
