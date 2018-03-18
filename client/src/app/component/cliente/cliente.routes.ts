import { Routes, RouterModule } from '@angular/router';
//Componentes que van a utilizar esta ruta
import { ClienteComponent } from '../cliente/cliente.component';
import { BuscadorComponent } from './buscador/buscador.component';

export const cliente_routes: Routes = [
    { path: 'buscar', component: BuscadorComponent }

];
