import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaUsuarioComponent } from './componentes/alta-usuario/alta-usuario.component';
import { LoginComponent } from './componentes/login/login.component';
import { PaginaNoEncontradaComponent } from './componentes/pagina-no-encontrada/pagina-no-encontrada.component';
import { AuthGuard } from './guards/auth.guard';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';

const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'altausuario', component: AltaUsuarioComponent },
  {
    path: 'principal',
    component: PaginaPrincipalComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PaginaNoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}