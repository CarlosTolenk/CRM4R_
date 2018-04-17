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
    EditarClienteComponent




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
    BrowserAnimationsModule




  ],
  schemas: [ NO_ERRORS_SCHEMA ],

  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
