import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioI } from '../interfaces/usuario-i';
import { MovimientoI } from '../interfaces/movimiento-i';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarios: AngularFirestoreCollection;
  movimientos: AngularFirestoreCollection;

  constructor(private af: AngularFirestore, private afs: AngularFireStorage) {
    this.usuarios = this.af.collection<UsuarioI>('usuarios');
    //this.movimientos = this.af.collection<MovimientoI>('/movimientos');
  }

  persistirUsuario(usuario: UsuarioI, uid: string) {
    this.usuarios.doc(uid).set(usuario);
  }

  deshabilitarUsuario(uid: string) {
    this.usuarios.doc(uid).update({activo: false});
  }

  subirFoto(foto: File, uid: string) {
    const pathFoto = `imagenes/${uid}`;
    const tarea = this.afs.upload(pathFoto, foto);
    tarea.then(() => {
      this.afs
        .ref(pathFoto)
        .getDownloadURL()
        .subscribe(url => {
          this.usuarios.doc(uid).update({
            foto: url
          });
        });
    });
  }



  traerMovimientosUsuarios(uid: string, coleccion:string): Observable<any[]> {
    return this.af.collection(coleccion).doc(uid).collection('/movimientos', ref => ref.orderBy('fecha', 'desc')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const datos = action.payload.doc.data() as MovimientoI;
          const id = action.payload.doc.id;
          return { id, ...datos };
        });
      })
    );
  }


  traerUsuarios(): Observable<any[]> {
    return this.usuarios.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const datos = action.payload.doc.data() as UsuarioI;
          const id = action.payload.doc.id;
          return { id, ...datos };
        });
      })
    );
  }
}

