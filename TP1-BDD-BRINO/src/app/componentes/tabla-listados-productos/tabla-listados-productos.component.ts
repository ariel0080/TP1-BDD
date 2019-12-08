import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { ProductoService } from 'src/app/servicios/producto.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioI } from 'src/app/interfaces/usuario-i';
import { MovimientoService } from 'src/app/servicios/movimiento.service';
import { TipoMovimiento } from 'src/app/enums/tipo-movimiento.enum';
import { MovimientoI } from 'src/app/interfaces/movimiento-i';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { LocalService } from 'src/app/servicios/local.service';
import { ProductoI } from 'src/app/interfaces/producto-i';
import { stringify } from 'querystring';
import { unescapeIdentifier } from '@angular/compiler';

@Component({
  selector: 'app-tabla-listados-productos',
  templateUrl: './tabla-listados-productos.component.html',
  styleUrls: ['./tabla-listados-productos.component.css'],
  animations: [
    trigger('expandirDetalle', [
      state('colapsar', style({ height: '0px', minHeight: '0' })),
      state('expandir', style({ height: '*' })),
      transition(
        'expandir <=> colapsar',
        animate('2250ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class TablaListadosProductosComponent implements OnInit {
  @Input() rol: string;
  loc:string;
  local: string;
  usr: string;
  tipo: TipoMovimiento;
  productoTmp: string;
  fecha: Date;
  movimiento: MovimientoI;
  productos: AngularFirestoreCollection;
  lista$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;
  productoExpandido: ['foto','descripcion', 'observaciones'] | null;
  usuarioActivo: Observable<any>;
  productoActivo: Observable<any>;
  userColection: AngularFirestoreCollection;
  Prodmov: boolean = false;
  prodMovimiento$: Observable<any[]>;
  movimientosTablaProductos: MatTableDataSource<any>;
  columnasTablaMov: string[];

  constructor(private ps: ProductoService, private as: AngularFirestore, private us: AuthService, private Uss: UsuarioService ,private Ms:MovimientoService, private lS: LocalService) {
  this.productos = this.as.collection<ProductoI>('productos');}
  ngOnInit() {
    
    this.lista$ = this.ps.traerProductos();
    if (this.rol === 'Administrador') {
      this.columnasTabla = [
        'nombre',
        'costo',
        'cantidad',
        'stock',
        'local',
        'fechaCreacion',
        'movProd',
        'activo',
        'id'
      ];
      this.columnasTablaMov =['fecha','local','producto','tipo','usuario'];
    } else {
      this.columnasTabla = [
        'nombre',
        'costo',
        'cantidad',
        'stock',
        'local',
        'fechaCreacion',
        'movProd',
        'activo'
      ];
      this.columnasTablaMov =['fecha','local','producto','tipo','usuario'];
    }
  
    if (this.rol === 'Administrador') {
    this.lista$.subscribe(datos => {
    this.datosTabla = new MatTableDataSource(datos);
    
    //this.datosTabla = this.datosTabla._filterData(local: )
    });
  }else{
    this.usuarioActivo = this.us.traerUsuarioActivo();
    this.usuarioActivo.subscribe(usuario => {this.local = usuario.local;
      

      this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
      this.datosTabla.filter = usuario.local;
    });
    });
  }
}

/////////////////////////////
  
 deshabilitarProducto(id: string) {
  this.ps.deshabilitarProducto(id);


  this.usuarioActivo = this.us.traerUsuarioActivo();
    this.usuarioActivo.subscribe(usuario => {
      

      this.productos.doc(`${id}`).ref.get().then(product => {            
              let idLocal: string;
              let idUser: string;
              
              const movimientosTmp = {usuario: usuario.email,tipo: TipoMovimiento.desHabilitar,fecha: new Date(),local: product.get('local'),producto: product.get('nombre')}
              this.lS.traerLocales().subscribe(locales => {
              locales.forEach(localFE => {if (localFE.nombre == product.get('local')) {idLocal = localFE.id;}})
              this.Uss.traerUsuarios().subscribe(UsuariosTmp => {
                UsuariosTmp.forEach(uId => {if (uId.email == usuario.email) {idUser = uId.id;}})
             
             
              this.Ms.persistirMovimiento(movimientosTmp, id, "productos");
              this.Ms.persistirMovimiento(movimientosTmp, idUser, "usuarios");
              this.Ms.persistirMovimiento(movimientosTmp, idLocal, "locales");
            //usuario.ref.get.id,
            });
          })
          
          
          })
});
}
//////////////////
  habilitarProducto(id: string) {
    this.ps.habilitarProducto(id);

    this.usuarioActivo = this.us.traerUsuarioActivo();
    this.usuarioActivo.subscribe(usuario => {
      

      this.productos.doc(`${id}`).ref.get().then(product => {            
              let idLocal: string;
              let idUser: string;
              
              const movimientosTmp = {usuario: usuario.email,tipo: TipoMovimiento.habilitar,fecha: new Date(),local: product.get('local'),producto: product.get('nombre')}
              this.lS.traerLocales().subscribe(locales => {
              locales.forEach(localFE => {if (localFE.nombre == product.get('local')) {idLocal = localFE.id;}})
              this.Uss.traerUsuarios().subscribe(UsuariosTmp => {
                UsuariosTmp.forEach(uId => {if (uId.email == usuario.email) {idUser = uId.id;}})
             
             
              this.Ms.persistirMovimiento(movimientosTmp, id, "productos");
              this.Ms.persistirMovimiento(movimientosTmp, idUser, "usuarios");
              this.Ms.persistirMovimiento(movimientosTmp, idLocal, "locales");
            
            });
          })
          
          
          })
});




  }

  agregarProducto(id: string) {
    this.ps.agregarProducto(id);

    this.usuarioActivo = this.us.traerUsuarioActivo();
    this.usuarioActivo.subscribe(usuario => {
      

      this.productos.doc(`${id}`).ref.get().then(product => {            
              let idLocal: string;
              let idUser: string;
              
              const movimientosTmp = {usuario: usuario.email,tipo: TipoMovimiento.agregar,fecha: new Date(),local: product.get('local'),producto: product.get('nombre')}
              this.lS.traerLocales().subscribe(locales => {
              locales.forEach(localFE => {if (localFE.nombre == product.get('local')) {idLocal = localFE.id;}})
              this.Uss.traerUsuarios().subscribe(UsuariosTmp => {
                UsuariosTmp.forEach(uId => {if (uId.email == usuario.email) {idUser = uId.id;}})
             
             
              this.Ms.persistirMovimiento(movimientosTmp, id, "productos");
              this.Ms.persistirMovimiento(movimientosTmp, idUser, "usuarios");
              this.Ms.persistirMovimiento(movimientosTmp, idLocal, "locales");
            //usuario.ref.get.id,
            });
          })
          
          
          })
});



  }

  removerProducto(id: string) {
    this.ps.removerProducto(id);


    this.usuarioActivo = this.us.traerUsuarioActivo();
    this.usuarioActivo.subscribe(usuario => {
      

      this.productos.doc(`${id}`).ref.get().then(product => {            
              let idLocal: string;
              let idUser: string;
              
              const movimientosTmp = {usuario: usuario.email,tipo: TipoMovimiento.sacar,fecha: new Date(),local: product.get('local'),producto: product.get('nombre')}
              this.lS.traerLocales().subscribe(locales => {
              locales.forEach(localFE => {if (localFE.nombre == product.get('local')) {idLocal = localFE.id;}})
              this.Uss.traerUsuarios().subscribe(UsuariosTmp => {
                UsuariosTmp.forEach(uId => {if (uId.email == usuario.email) {idUser = uId.id;}})
             
             
              this.Ms.persistirMovimiento(movimientosTmp, id, "productos");
              this.Ms.persistirMovimiento(movimientosTmp, idUser, "usuarios");
              this.Ms.persistirMovimiento(movimientosTmp, idLocal, "locales");
            //usuario.ref.get.id,
            });
          })
          
          
          })
});
  }

  verMovimientosproducto(id: string){
    console.log("apretaste movimientos");
    this.Prodmov = true;
    this.prodMovimiento$ = this.ps.traerMovimientosProductos(id,'productos');
    this.prodMovimiento$.subscribe(datosMov => {
    this.movimientosTablaProductos = new MatTableDataSource(datosMov);
      
     
    })
  }

}
