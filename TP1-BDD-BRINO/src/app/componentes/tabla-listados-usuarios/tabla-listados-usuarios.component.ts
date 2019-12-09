import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-tabla-listados-usuarios',
  templateUrl: './tabla-listados-usuarios.component.html',
  styleUrls: ['./tabla-listados-usuarios.component.css']
})
export class TablaListadosUsuariosComponent implements OnInit {
  @Input() rol: string;

  lista$: Observable<any[]>;
  movimiento$: Observable<any[]>;
  columnasTabla: string[];
  columnasTablaMov: string[];
  datosTabla: MatTableDataSource<any>;
  movimientosTabla: MatTableDataSource<any>;
  mov: boolean = false;

  constructor(private as: AuthService, private us: UsuarioService) {}

  ngOnInit() {
    this.lista$ = this.us.traerUsuarios();
    
    if (this.rol === 'Administrador') {
      this.columnasTabla = [
        'nombre',
        'apellido',
        'email',
        'local',
        'activo',
        'rol',
        'movUsers',
        'id'
      ];

      this.columnasTablaMov =[
        'fecha',
        'local',
        'producto',
        'tipo',
        'usuario'

      ];
    } else {
      this.columnasTabla = ['nombre', 'apellido', 'email', 'local','activo', 'rol'];
      this.columnasTablaMov =['fecha','local','producto','tipo','usuario'];
    }

    this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
      
    
    });
  }

  verMovimientosusuario(id: string){
    console.log("apretaste movimientos");
    this.mov = true;
    this.movimiento$ = this.us.traerMovimientosUsuarios(id,'usuarios');
    this.movimiento$.subscribe(datosMov => {
      this.movimientosTabla = new MatTableDataSource(datosMov);
      
     
    })

  }

  deshabilitarUsuario(id: string) {
    this.us.deshabilitarUsuario(id);
  }

  habilitarUsuario(id: string ){
    this.us.habilitarUsuario(id);
  }

   aF(filterValue: string) {
    this.datosTabla.filter = filterValue.trim().toLowerCase();
  }

  aK(filterValue: string) {
    this.movimientosTabla.filter = filterValue.trim().toLowerCase();
  }
}
