import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LocalI } from '../interfaces/local-i';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  locales: AngularFirestoreCollection;

  constructor(private af: AngularFirestore) {
    this.locales = this.af.collection<LocalI>('locales');
  }

  persistirLocal(local: LocalI) {
    this.locales.add(local);
  }

  deshabilitarLocal(uid: string) {
    this.locales.doc(uid).update({activo: false});
  }


  traerLocales(): Observable<any[]> {
    return this.locales.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const datos = action.payload.doc.data() as LocalI;
          const id = action.payload.doc.id;
          return { id, ...datos };
        });
      })
    );
  }
}
