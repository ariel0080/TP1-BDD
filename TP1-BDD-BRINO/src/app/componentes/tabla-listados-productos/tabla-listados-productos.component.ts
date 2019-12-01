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

  lista$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;
  productoExpandido: ['foto','descripcion', 'observaciones'] | null;
  

  constructor(private ps: ProductoService) {}

  ngOnInit() {
    this.lista$ = this.ps.traerProductos();
    if (this.rol === 'Administrador') {
      this.columnasTabla = [
        'nombre',
        'costo',
        'cantidad',
        'stock',
        'fechaCreacion',
       // 'det',
        'activo',
        'id'
      ];
    } else {
      this.columnasTabla = [
        'nombre',
        'costo',
        'cantidad',
        'stock',
        'fechaCreacion',
        //'det',
        'activo'
      ];
    }

    this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
    });
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
