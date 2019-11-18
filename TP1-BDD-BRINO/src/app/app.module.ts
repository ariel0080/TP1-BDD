import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule} from '@angular/fire';
import {environment} from 'src/environments/environment';
import { AltaUsuarioComponent } from './componentes/alta-usuario/alta-usuario.component';
import { AltaProductoComponent } from './componentes/alta-producto/alta-producto.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './servicios/auth.service';
import { UsuarioService } from './servicios/usuario.service';
import { MaterialFileInputModule} from 'ngx-material-file-input';
import { MatInputModule, MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    AltaUsuarioComponent,
    AltaProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MaterialFileInputModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    AngularFirestore,
    AuthService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
