import { Injectable } from '@angular/core';
import { ProductoI } from '../interfaces/producto-i';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { MovimientoService } from './movimiento.service';
import { TipoMovimiento } from '../enums/tipo-movimiento.enum';
import { LocalService } from './local.service';
import { MovimientoI } from '../interfaces/movimiento-i';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos: AngularFirestoreCollection;


  constructor(private af: AngularFirestore,
    private afs: AngularFireStorage,
    private ms: MovimientoService,
     private ls: LocalService,
     private as: AuthService) {
    this.productos = this.af.collection<ProductoI>('productos');
  }

  persistirProducto(producto: ProductoI, foto: Array<File>) {
    this.productos.add(producto).then(doc =>{
      if(foto){
        this.subirFoto(foto[0], doc.id);
      }

      this.ls.traerLocales().subscribe(locales => {
        locales.forEach(localFE => {
          let email ="";

          this.as.traerUsuarioActivo().subscribe(usuarioAct => {email = usuarioAct.email})

          const movimientoTmp = {
            tipo: TipoMovimiento.agregar,
            usuario:  email,
            producto: producto.nombre,
            local: localFE,
            cantidad: 0
          }

          this.ms.persistirMovimiento(movimientoTmp);
        })
      })

    });

  }

  deshabilitarProducto(uid: string) {
    this.productos.doc(uid).update({activo: false});
  }

  habilitarProducto(uid: string) {
    this.productos.doc(uid).update({activo: true});
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

  subirFoto(foto: File, uid: string) {
    const pathFoto = `imagenesProductos/${uid}`;
    const tarea = this.afs.upload(pathFoto, foto);
    tarea.then(() => {
      this.afs
        .ref(pathFoto)
        .getDownloadURL()
        .subscribe(url => {
          this.productos.doc(uid).update({
            foto: url
          });
        });
    });
  }

}

