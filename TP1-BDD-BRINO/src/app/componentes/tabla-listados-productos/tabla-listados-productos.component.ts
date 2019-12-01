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
  local:string;

  lista$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;
  productoExpandido: ['foto','descripcion', 'observaciones'] | null;
  usuarioActivo: Observable<any>;

  constructor(private ps: ProductoService, private us: AuthService) {}

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
        'activo',
        'id'
      ];
    } else {
      this.columnasTabla = [
        'nombre',
        'costo',
        'cantidad',
        'stock',
        'local',
        'fechaCreacion',
        'activo'
      ];
    }
  
    if (this.rol === 'Administrador') {
    this.lista$.subscribe(datos => {
    this.datosTabla = new MatTableDataSource(datos);
    console.table(this.datosTabla);
    //this.datosTabla = this.datosTabla._filterData(local: )
    });
  }else{
    this.usuarioActivo = this.us.traerUsuarioActivo();
    this.usuarioActivo.subscribe(usuario => {this.local = usuario.local;
      console.log("USUARIO ACTIVO local---->> ",usuario.local);

      this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
      this.datosTabla.filter = usuario.local;
    });
    });
    
    

    

    

  }
}







  deshabilitarProducto(id: string) {
    this.ps.deshabilitarProducto(id);
  }

  habilitarProducto(id: string) {
    this.ps.habilitarProducto(id);
  }

  agregarProducto(id: string) {
    this.ps.agregarProducto(id);
  }

  removerProducto(id: string) {
    this.ps.removerProducto(id);
  }


}
