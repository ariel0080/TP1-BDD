import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaUsuarioComponent } from './componentes/alta-usuario/alta-usuario.component';
import { AltaProductoComponent } from './componentes/alta-producto/alta-producto.component';


const routes: Routes = [
{path: 'altaUsuario', component: AltaUsuarioComponent },
{path: 'altaProducto', component: AltaProductoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
