import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsuarioI } from '../interfaces/usuario-i';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario$: Observable<UsuarioI>;

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private us: UsuarioService,
    private router: Router
  ) {
    this.usuario$ = this.buscarUsuarioFirebase();
  }

  async registracion(
    usuario: UsuarioI,
    password: string,
    foto: Array<File>
  ): Promise<string> {
    let salida = 'Se dio de alta un nuevo usuario';

    try {
      const res = await this.afa.auth.createUserWithEmailAndPassword(
        usuario.email,
        password
      );
      this.us.persistirUsuario(usuario, res.user.uid);
      if (!(foto === undefined)) {
        this.us.subirFoto(foto[0], res.user.uid);
      }
    } catch (err) {
      salida = err.message;
    }

    return salida;
  }

  async ingresar(email: string, password: string): Promise<string> {
    let salida = 'El usuario ingreso correctamente';

    try {
      const res = await this.afa.auth.signInWithEmailAndPassword(
        email,
        password
      );
    } catch (err) {
      salida = err.message;
    }

    return salida;
  }

  async ingresarAnonimo(): Promise<string> {
    let salida = 'El usuario anonimo ingreso correctamente';

    try {
      const res = await this.afa.auth.signInAnonymously();
    } catch (err) {
      salida = err.message;
    }

    return salida;
  }

  async salir(): Promise<string> {
    let salida = 'El usuario salio correctamente';
    try {
      const res = await this.afa.auth.signOut();
      this.router.navigate(['/login']);
    } catch (err) {
      salida = err.message;
    }

    return salida;
  }

  private buscarUsuarioFirebase(): Observable<UsuarioI> {
    const salida = this.afa.authState.pipe(
      switchMap(usuario => {
        if (usuario) {
          return this.afs
            .doc<UsuarioI>(`usuarios/${usuario.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
    return salida;
  }

  traerUsuarioActivo(): Observable<UsuarioI> {
    return this.usuario$;
  }
}
