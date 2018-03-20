import { Routes, RouterModule } from '@angular/router';
//Componentes que van a utilizar esta ruta
import { AgregarClienteComponent } from './agregarcliente/agregarcliente.component';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import { VerClienteComponent } from './ver-cliente/ver-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';



export const cliente_routes: Routes = [
    { path: 'agregar', component: AgregarClienteComponent },
    { path: 'listar', component: ListaClienteComponent},
    { path: 'ver', component: VerClienteComponent},
    { path: 'editar', component: EditarClienteComponent},
    { path: '**', component: ListaClienteComponent}

];
