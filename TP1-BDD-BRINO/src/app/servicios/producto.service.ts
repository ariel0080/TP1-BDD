import { Injectable } from '@angular/core';
import { ProductoI } from '../interfaces/producto-i';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos: AngularFirestoreCollection;


  constructor(private af: AngularFirestore) {
    this.productos = this.af.collection<ProductoI>('productos');
  }

  persistirProducto(producto: ProductoI) {
    this.productos.add(producto);
  }

  deshabilitarProducto(uid: string) {
    this.productos.doc(uid).update({activo: false});
  }


  traerProductos(): Observable<any[]> {
    return this.productos.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const datos = action.payload.doc.data() as ProductoI;
          const id = action.payload.doc.id;
          return { id, ...datos };
        });
      })
    );
  }

}
