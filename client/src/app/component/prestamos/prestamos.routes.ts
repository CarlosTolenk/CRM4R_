import { Routes, RouterModule } from '@angular/router';
//Componentes que van a utilizar esta ruta
import { AgregarPrestamosComponent } from './agregar-prestamos/agregar-prestamos.component';
import { ListaPrestamosComponent } from './lista-prestamos/lista-prestamos.component';
import { VerPrestamosComponent } from './ver-prestamos/ver-prestamos.component';
import { EditarPrestamosComponent } from './editar-prestamos/editar-prestamos.component';



export const prestamos_routes: Routes = [
    { path: 'agregar', component: AgregarPrestamosComponent },
    { path: 'listar', component: ListaPrestamosComponent},
    { path: 'ver/:id', component: VerPrestamosComponent},
    { path: 'editar/:id', component: EditarPrestamosComponent},
    { path: '**', component: ListaPrestamosComponent}

];
