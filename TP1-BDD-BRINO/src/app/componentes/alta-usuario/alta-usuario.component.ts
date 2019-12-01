import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Rol } from 'src/app/enums/rol.enum';
import { AuthService } from 'src/app/servicios/auth.service';
import { Observable } from 'rxjs';
import { LocalService } from 'src/app/servicios/local.service';
import { LocalI } from 'src/app/interfaces/local-i';


export class SelLoc {
  value: string;
  viewValue: string;
  constructor(v:string,vv:string){this.value=v;this.viewValue=v;}
}

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {
  public usuarioForm: FormGroup;
  public locales:Observable<any[]>;
  public arrayLocales: Array<string>
  public tmp:LocalI;
  //locs: SelLoc; 
   

  constructor(private as: AuthService, private router: Router, private localService:LocalService) {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      local: new FormControl(''),
      foto: new FormControl('')
    });
  
    this.locales=this.localService.traerLocales();
    this.locales.subscribe(datos => {
    this.arrayLocales = new Array<string>();
    datos.forEach(element => {
    this.tmp = JSON.parse(JSON.stringify(element));
    this.arrayLocales.push(this.tmp.nombre);
    //console.log(this.arrayLocales);
    //this.arrayLocales.forEach(k => {this.locs = new SelLoc(k,k);
    //                                console.log(this.locs);
    //                              }
    //                         )
                             }
                )                   })
}

  guardarForm() {
    const usuarioTmp = {
      nombre: this.usuarioForm.value.nombre,
      apellido: this.usuarioForm.value.apellido,
      email: this.usuarioForm.value.email,
      local: this.usuarioForm.value.local,
      foto: '',
      activo: true,
      rol: Rol.Usuario
    };

    this.as.registracion(
      usuarioTmp,
      this.usuarioForm.value.password,
      this.usuarioForm.value.foto.files
    );

    this.usuarioForm.reset();
  }

  cancelarForm() {
    this.usuarioForm.reset();
    this.router.navigate(['/login']);}

  ngOnInit() {}
}
