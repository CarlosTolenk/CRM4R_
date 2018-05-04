import { Routes, RouterModule } from '@angular/router';
//Componentes que van a utilizar esta ruta
import { PerfilComponent } from '../perfil/perfil.component';
import { RegistroComponent} from '../registro/registro.component';
import { GeneralComponent } from '../general/general.component';
import { ClienteComponent } from '../cliente/cliente.component';
import { cliente_routes } from '../cliente/cliente.routes';
import { PrestamosComponent } from '../prestamos/prestamos.component';
import { prestamos_routes } from '../prestamos/prestamos.routes';
import { TicketsComponent } from '../tickets/tickets.component';
import { tickets_routes } from '../tickets/tickets.routes'

// PrestamosComponent

export const dashboard_routes: Routes = [
    { path: 'perfil', component: PerfilComponent },
    { path: 'general', component: GeneralComponent },
    { path: 'clientes',
     component: ClienteComponent,
     children: cliente_routes
    },
    { path: 'prestamos',
     component: PrestamosComponent,
     children: prestamos_routes
    },
    {
      path: 'tickets',
      component: TicketsComponent,
      children: tickets_routes
    },
    { path: 'registro', component: RegistroComponent },
    {path: '**', component: GeneralComponent }

];


// prestamos_routes
