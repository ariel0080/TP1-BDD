import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-tabla-listados-usuarios-movimientos',
  templateUrl: './tabla-listados-usuarios-movimientos.component.html',
  styleUrls: ['./tabla-listados-usuarios-movimientos.component.css']
})
export class TablaListadosUsuariosMovimientosComponent implements OnInit {
  @Input() rol: string;
  lista$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;
  idU:string;

  constructor(private as: AuthService, private us: UsuarioService) {}

  ngOnInit() {

    this.us.traerUsuarios().subscribe(usuarios => {
                                                
                                                usuarios.forEach(element => {element.id = this.idU;
                                                console.log(element);});
    

    this.lista$ = this.us.traerMovimientosUsuarios(this.idU,'usuarios');
    if (this.rol === 'Administrador') {
      this.columnasTabla = [
        'fecha',
        'local',
        'producto',
        'tipo',
        'usuario'
      ];
    } else {
      this.columnasTabla = ['fecha','local','producto','tipo','usuario'];
    }

    this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
    });
  })

}

}
