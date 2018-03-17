import { Routes, RouterModule } from '@angular/router';
//Componentes que van a utilizar esta ruta
import { PerfilComponent } from '../perfil/perfil.component';
import { RegistroComponent} from '../registro/registro.component';
import { GeneralComponent } from '../general/general.component';
import { ClienteComponent } from '../cliente/cliente.component';
import { cliente_routes } from '../cliente/cliente.routes';

export const dashboard_routes: Routes = [
    { path: 'perfil', component: PerfilComponent },
    { path: 'general', component: GeneralComponent },
    { path: 'clientes', component: ClienteComponent},
    { path: 'clientes/:page',
     component: ClienteComponent,
     children: cliente_routes
    },
    { path: 'registro', component: RegistroComponent },
    { path: '**', component: GeneralComponent }
];
