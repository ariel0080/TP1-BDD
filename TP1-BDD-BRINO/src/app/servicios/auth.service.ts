import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private userService: UsuarioService,
    private router: Router
  ) {}

  async registracion(usuario: Usuario, password: string): Promise<string> {
    let salida = 'Se dio de alta un nuevo usuario';

    try {
      const res = await this.angularFireAuth.auth.createUserWithEmailAndPassword(
        usuario.email,
        password
      );
      this.userService.persistirUsuario(usuario, res.user.uid);
    } catch (err) {
      salida = err.message;
    }

    return salida;
  }

  async ingresar(email: string, password: string): Promise<string> {
    let salida = 'El usuario ingreso correctamente';

    try {
      const res = await this.angularFireAuth.auth.signInWithEmailAndPassword(
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
      const res = await this.angularFireAuth.auth.signInAnonymously();
    } catch (err) {
      salida = err.message;
    }

    return salida;
  }

  async salir(): Promise<string> {
    let salida = 'El usuario salio correctamente';
    try {
      const res = await this.angularFireAuth.auth.signOut();
      this.router.navigate(['/login']);
    } catch (err) {
      salida = err.message;
    }

    return salida;
  }
}
