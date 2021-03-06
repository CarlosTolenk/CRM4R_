import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { routing, appRoutingProviders } from './app.routing';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule} from 'ngx-pagination';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';










//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegistroComponent } from './component/registro/registro.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { GeneralComponent } from './component/general/general.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { ClienteComponent } from './component/cliente/cliente.component';
import { AgregarClienteComponent } from './component/cliente/agregarcliente/agregarcliente.component';
import { ListaClienteComponent } from './component/cliente/lista-cliente/lista-cliente.component';
import { VerClienteComponent } from './component/cliente/ver-cliente/ver-cliente.component';
import { EditarClienteComponent } from './component/cliente/editar-cliente/editar-cliente.component';
import { PrestamosComponent } from './component/prestamos/prestamos.component';
import { AgregarPrestamosComponent } from './component/prestamos/agregar-prestamos/agregar-prestamos.component';
import { ListaPrestamosComponent } from './component/prestamos/lista-prestamos/lista-prestamos.component';
import { VerPrestamosComponent } from './component/prestamos/ver-prestamos/ver-prestamos.component';
import { EditarPrestamosComponent } from './component/prestamos/editar-prestamos/editar-prestamos.component';
import { ListaTicketsComponent } from './component/tickets/lista-tickets/lista-tickets.component';
import { TicketsComponent } from './component/tickets/tickets.component';
import { VerTicketComponent } from './component/tickets/ver-ticket/ver-ticket.component';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    RegistroComponent,
    SidebarComponent,
    GeneralComponent,
    PerfilComponent,
    ClienteComponent,
    AgregarClienteComponent,
    ListaClienteComponent,
    VerClienteComponent,
    EditarClienteComponent,
    PrestamosComponent,
    AgregarPrestamosComponent,
    ListaPrestamosComponent,
    VerPrestamosComponent,
    EditarPrestamosComponent,
    ListaTicketsComponent,
    TicketsComponent,
    VerTicketComponent,




  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    routing,
    HttpClientModule,
    CommonModule,
    NgxPaginationModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    NgSelectModule



  ],
  schemas: [ NO_ERRORS_SCHEMA ],

  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
