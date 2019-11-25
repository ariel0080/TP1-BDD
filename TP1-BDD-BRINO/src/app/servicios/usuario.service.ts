import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioI } from '../interfaces/usuario-i';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarios: AngularFirestoreCollection;

  constructor(private af: AngularFirestore, private afs: AngularFireStorage) {
    this.usuarios = this.af.collection<UsuarioI>('usuarios');
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
