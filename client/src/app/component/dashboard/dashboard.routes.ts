import { Routes } from '@angular/router';
//Componentes que van a utilizar esta ruta
import { PerfilComponent } from '../perfil/perfil.component';
import { RegistroComponent} from '../registro/registro.component';
import { GeneralComponent } from '../general/general.component';
import { ClienteComponent } from '../cliente/cliente.component';

export const dashboard_routes: Routes = [
    { path: 'perfil', component: PerfilComponent },
    { path: 'general', component: GeneralComponent },
    { path: 'clientes', component: ClienteComponent },
    { path: 'clientes/:page', component: ClienteComponent },
    { path: 'registro', component: RegistroComponent },
    { path: '**', component: GeneralComponent }
];
