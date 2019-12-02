import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AltaProductoComponent } from './componentes/alta-producto/alta-producto.component';
import { AltaUsuarioComponent } from './componentes/alta-usuario/alta-usuario.component';
import { BarraTituloComponent } from './componentes/barra-titulo/barra-titulo.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthService } from './servicios/auth.service';
import { UsuarioService } from './servicios/usuario.service';
import { PaginaNoEncontradaComponent } from './componentes/pagina-no-encontrada/pagina-no-encontrada.component';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
import { BarraHerramientasComponent } from './componentes/barra-herramientas/barra-herramientas.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TablaListadosUsuariosComponent } from './componentes/tabla-listados-usuarios/tabla-listados-usuarios.component';
import { TablaListadosProductosComponent } from './componentes/tabla-listados-productos/tabla-listados-productos.component';
import { TablaListadosLocalesComponent } from './componentes/tabla-listados-locales/tabla-listados-locales.component';
import { TablaListadosMovimientosComponent } from './componentes/tabla-listados-movimientos/tabla-listados-movimientos.component';
import { ProductoService } from './servicios/producto.service';
import { AltaLocalComponent } from './componentes/alta-local/alta-local.component';
import { LocalService } from './servicios/local.service';
import { MovimientoService } from './servicios/movimiento.service';
import { MatSelectModule } from '@angular/material';
import { TablaListadosUsuariosMovimientosComponent } from './componentes/tabla-listados-usuarios-movimientos/tabla-listados-usuarios-movimientos.component';
import { TablaListadosProductosMovimientosComponent } from './componentes/tabla-listados-productos-movimientos/tabla-listados-productos-movimientos.component';

@NgModule({
  declarations: [
    AppComponent,
    AltaUsuarioComponent,
    AltaProductoComponent,
    LoginComponent,
    BarraTituloComponent,
    PaginaNoEncontradaComponent,
    PaginaPrincipalComponent,
    BarraHerramientasComponent,
    TablaListadosUsuariosComponent,
    TablaListadosProductosComponent,
    TablaListadosLocalesComponent,
    TablaListadosMovimientosComponent,
    AltaLocalComponent,
    TablaListadosUsuariosMovimientosComponent,
    TablaListadosProductosMovimientosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MaterialFileInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatDividerModule,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    AngularFirestore,
    AngularFireStorage,
    AngularFireAuth,
    AuthService,
    UsuarioService,
    FormBuilder,
    ProductoService,
    LocalService,
    MovimientoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
