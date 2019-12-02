import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { UsuarioI } from 'src/app/interfaces/usuario-i';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/servicios/producto.service';
import { LocalService } from 'src/app/servicios/local.service';
import { LocalI } from 'src/app/interfaces/local-i';

@Component({
  selector: 'app-tabla-listados-productos-movimientos',
  templateUrl: './tabla-listados-productos-movimientos.component.html',
  styleUrls: ['./tabla-listados-productos-movimientos.component.css']
})
export class TablaListadosProductosMovimientosComponent implements OnInit {

  @Input() rol: string;

  lista$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;
  idU: string;
  userColection: AngularFirestoreCollection;
  public arrayUsers: Array<string>;
  public arrayLocales: Array<string>;
  usertmp: UsuarioI;
  loctmp: LocalI;
  localtmp: string;
  loc: string;
  public productoForm3: FormGroup;
  constructor(private as: AuthService, private ls: LocalService, private us: ProductoService, private af: AngularFirestore) {

    this.productoForm3 = new FormGroup({
      filtro: new FormControl(''),
      local:  new FormControl('')});

      this.arrayUsers = new Array<string>();
      this.arrayLocales = new Array<string>();


      this.ls.traerLocales().subscribe( locales => locales.forEach(element => { this.loctmp = JSON.parse(JSON.stringify(element));
      this.arrayLocales.push(this.loctmp.nombre);

    //  if(this.loctmp.nombre === this.productoForm3.value.local){this.localtmp = this.productoForm3.value.local
    //  }

    }));

      this.us.traerProductos().subscribe(usuarios =>
      usuarios.forEach(element => {this.usertmp = JSON.parse(JSON.stringify(element))
      {this.arrayUsers.push(this.usertmp.nombre);
      console.log("localtmp: ------>",this.localtmp);}
      //if(this.usertmp.nombre ===  this.productoForm3.value.filtro && this.localtmp === this.productoForm3.value.local)
      //{this.idU = this.usertmp.id;}

    }));


      }
  ngOnInit() {
  }

  filtro2() {

    this.ls.traerLocales().subscribe( locales => locales.forEach(element => { this.loctmp = JSON.parse(JSON.stringify(element));


    if(this.loctmp.nombre === this.productoForm3.value.local){this.localtmp = this.productoForm3.value.local
    ;console.log("LOCALLOCALLOCALTMP",this.localtmp)}

    }));

    this.us.traerProductos().subscribe(usuarios => {
      //console.log("cuantosssss",usuarios.length);
      usuarios.forEach(element => {this.usertmp = JSON.parse(JSON.stringify(element));

        if(this.usertmp.nombre ===  this.productoForm3.value.filtro &&  this.productoForm3.value.local === this.localtmp){this.idU = this.usertmp.id;
    }
    console.log("AAAAAAAAAAAAAAHhhhhhhhh",this.usertmp.nombre,this.localtmp);
  })})
      //console.log ("apretaste:", this.productoForm3.value.filtro,"usertmpemail",this.usertmp.email);
      //console.log("array de usuarios email ",this.arrayUsers,"id que trae: ",this.idU);

    this.lista$ = this.us.traerMovimientosUsuarios(this.idU,'productos');
    if (this.rol === 'Administrador') {
      this.columnasTabla = [
        'fecha',
        'local',
        'producto',
        'tipo',
        'usuario'
      ];
    } else {
      this.columnasTabla = ['fecha', 'local', 'producto', 'tipo', 'usuario'];
    }

    this.lista$.subscribe(datos => {this.datosTabla = new MatTableDataSource(datos);});

    this.datosTabla.filter = this.productoForm3.value.filtro.local;

}}
