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

  constructor(private ls: LocalService) {}

  ngOnInit() {
    this.lista$ = this.ls.traerLocales();
    if (this.rol === 'Administrador') {
      this.columnasTabla = ['nombre', 'direccion', 'activo', 'id'];
    } else {
      this.columnasTabla = ['nombre', 'direccion', 'activo'];
    }

    this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
    });
  }

  deshabilitarLocal(id: string) {
    this.ls.deshabilitarLocal(id);
  }
}
