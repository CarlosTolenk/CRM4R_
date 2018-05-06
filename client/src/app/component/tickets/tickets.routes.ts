import { Routes, RouterModule } from '@angular/router';
//Componentes que van a utilizar esta ruta
import { ListaTicketsComponent } from './lista-tickets/lista-tickets.component';
import { VerTicketComponent } from './ver-ticket/ver-ticket.component';


export const tickets_routes: Routes = [
    { path: 'listar', component: ListaTicketsComponent},
    { path: 'detalle/:id', component: VerTicketComponent},
    { path: '**', component: ListaTicketsComponent}

];
