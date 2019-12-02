import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MovimientoI } from '../interfaces/movimiento-i';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  movimientos: AngularFirestoreCollection;

  constructor(private af: AngularFirestore) {
    this.movimientos = this.af.collection<MovimientoI>('movimientos');
  }

  persistirMovimiento(movimiento: MovimientoI, id: string, tipo: string) {
    const path = `${tipo}/${id}/movimientos`;
    
    this.movimientos = this.af.collection<MovimientoI>(path);

    this.movimientos.add(movimiento);
  }

  //persistirMovimiento(movimiento: MovimientoI) {
  //  this.movimientos.add(movimiento);
  // }

  traerMovimientos(): Observable<any[]> {
    return this.movimientos.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const datos = action.payload.doc.data() as MovimientoI;
          const id = action.payload.doc.id;
          return { id, ...datos };
        });
      })
    );
  }

}
