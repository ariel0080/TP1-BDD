import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { LocalService } from 'src/app/servicios/local.service';

@Component({
  selector: 'app-tabla-listados-locales',
  templateUrl: './tabla-listados-locales.component.html',
  styleUrls: ['./tabla-listados-locales.component.css']
})
export class TablaListadosLocalesComponent implements OnInit {
  @Input() rol: string;

  lista$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;

  locMov: boolean = false;
  localesMovimiento$: Observable<any[]>;
  movimientosTablaLocales: MatTableDataSource<any>;
  columnasTablaMov: string[];

  constructor(private ls: LocalService) {}

  ngOnInit() {
    this.lista$ = this.ls.traerLocales();
    if (this.rol === 'Administrador') {
      this.columnasTabla = ['nombre', 'direccion', 'activo', 'movProd','id'];
      this.columnasTablaMov =['fecha','local','producto','tipo','usuario'];
    } else {
      this.columnasTabla = ['nombre', 'direccion', 'activo','movProd'];
      this.columnasTablaMov =['fecha','local','producto','tipo','usuario'];
    }

    this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
    });
  }

  deshabilitarLocal(id: string) {
    this.ls.deshabilitarLocal(id);
  }

  verMovimientosproducto(id: string){

    console.log("apretaste movimientos");
    this.locMov = true;
    this.localesMovimiento$ = this.ls.traerMovimientosLocales(id,'locales');
    this.localesMovimiento$.subscribe(datosMov => {
    this.movimientosTablaLocales = new MatTableDataSource(datosMov);
      
     
    })
  }
}
