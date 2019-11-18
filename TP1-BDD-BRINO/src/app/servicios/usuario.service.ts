import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../clases/usuario';
//import { Cliente } from '../clases/cliente';
//import { Supervisor } from '../clases/supervisor';
//import { Empleado } from '../clases/empleado';
//import { AngularFireAuth } from '@angular/fire/auth';
//import { Observable, of } from 'rxjs';
//import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 // usuario$: Observable<any>;

  constructor(
    private angularFireStore: AngularFirestore,
    //private angularFireAuth: AngularFireAuth
  ) {
    //this.usuario$ = this.buscarUsuarioFirebase();
  }

  persistirUsuario(usuario: Usuario) {
    this.angularFireStore
      .collection('/usuarios').add(Object.assign({}, JSON.parse(JSON.stringify(usuario))));
  }

  /*private buscarUsuarioFirebase(): Observable<any> {
    const salida = this.angularFireAuth.authState.pipe(
      switchMap(usuario => {
        if (usuario) {
          return this.angularFireStore
            .doc<any>(`usuarios/${usuario.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      }),
      map(usuario => {
        if (usuario) {
          switch (usuario.rol) {
            case 'cliente':
              return usuario as Observable<Cliente>;
            case 'supervisor':
              return usuario as Observable<Supervisor>;
            case 'empleado':
              return usuario as Observable<Empleado>;
          }
        }
      })
    );
    return salida;
  }

  traerUsuarioActivo(): Observable<any> {
    return this.usuario$;
  }*/
}
