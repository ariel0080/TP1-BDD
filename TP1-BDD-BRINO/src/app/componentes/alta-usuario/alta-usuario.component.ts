import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {

  correo = new FormControl('', [Validators.required, Validators.email]);

  public nombre: string;
  public apellido: string;
  public foto: string;
  public activo: boolean;
  public email: string;
  public rol: string;
  public password: string;

  constructor(private userService: UsuarioService) { }



  ngOnInit() {
  }

  public ver(){
    console.table(this);
  }

  altaUsuario() {
    const userTmp = new Usuario(this.nombre, this.apellido, 'foto', true, this.email, 'admin');
    this.userService.persistirUsuario(userTmp);

    //console.log(this.nombre, this.apellido,this.email, this.password);


  }

getErrorMessage() {
      return this.correo.hasError('required') ? 'You must enter a value' :
          this.correo.hasError('correo') ? 'Not a valid email' :
              '';
    }

}
