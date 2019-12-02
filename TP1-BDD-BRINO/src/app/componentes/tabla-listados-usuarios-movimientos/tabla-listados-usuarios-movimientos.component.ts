import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { UsuarioI } from 'src/app/interfaces/usuario-i';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';

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
  userColection: AngularFirestoreCollection;
  public arrayUsers: Array<string>
  usertmp: UsuarioI;
  loc: string;
  public productoForm2: FormGroup;

  constructor(private as: AuthService, private us: UsuarioService, private af: AngularFirestore) {

    this.productoForm2 = new FormGroup({
      filtro: new FormControl('')});

    /*this.userColection = this.af.collection<UsuarioI>('usuarios');
    this.arrayUsers = new Array<string>();
    console.log("QUE ES USERCOLECTION?", this.userColection);
    /*datos.forEach(element => {
    this.tmp = JSON.parse(JSON.stringify(element));
    this.arrayUsers.push(this.tmp.nombre);*/


    /*this.productos = this.as.collection<ProductoI>('productos');
    this.locales=this.lS.traerLocales();
    this.locales.subscribe(datos => {
    this.arrayLocales = new Array<string>();
    datos.forEach(element => {
    this.tmp = JSON.parse(JSON.stringify(element));
    this.arrayLocales.push(this.tmp.nombre);*/

    this.arrayUsers = new Array<string>();
    this.us.traerUsuarios().subscribe(usuarios => {
      
                                                usuarios.forEach(element => {this.usertmp = JSON.parse(JSON.stringify(element));
                                                this.arrayUsers.push(this.usertmp.email);   
                                                //console.log("array de usuarios email ",this.arrayUsers,"id que trae: ",this.idU);                                               
                                                if(this.usertmp.email ===  this.productoForm2.value.filtro){this.idU = this.usertmp.id;}})})
   
  }
  

  ngOnInit() {}

  filtro(){
   
    this.us.traerUsuarios().subscribe(usuarios => {
      console.log("cuantosssss",usuarios.length);
      usuarios.forEach(element => {this.usertmp = JSON.parse(JSON.stringify(element));
                                                    
      if(this.usertmp.email ===  this.productoForm2.value.filtro){this.idU = this.usertmp.id}})})
      console.log ("apretaste:", this.productoForm2.value.filtro,"usertmpemail",this.usertmp.email);
      console.log("array de usuarios email ",this.arrayUsers,"id que trae: ",this.idU);

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

    this.lista$.subscribe(datos => {this.datosTabla = new MatTableDataSource(datos);});
    this.datosTabla.filter = this.productoForm2.value.filtro;
  
  


}


}