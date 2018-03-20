import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { routing, appRoutingProviders } from './app.routing';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule} from 'ngx-pagination';


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
    ClienteComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    routing,
    HttpClientModule,
    CommonModule,
    NgxPaginationModule

  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
