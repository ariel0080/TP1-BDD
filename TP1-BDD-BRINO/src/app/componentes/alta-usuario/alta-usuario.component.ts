import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Rol } from 'src/app/enums/rol.enum';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {
  public usuarioForm: FormGroup;

  constructor(private as: AuthService, private router: Router) {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      foto: new FormControl('')
    });
  }

  guardarForm() {
    const usuarioTmp = {
      nombre: this.usuarioForm.value.nombre,
      apellido: this.usuarioForm.value.apellido,
      email: this.usuarioForm.value.email,
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
    this.router.navigate(['/login']);
  }

  ngOnInit() {}
}
