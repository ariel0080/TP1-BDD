import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LocalService } from 'src/app/servicios/local.service';

@Component({
  selector: 'app-alta-local',
  templateUrl: './alta-local.component.html',
  styleUrls: ['./alta-local.component.css']
})
export class AltaLocalComponent implements OnInit {
  public localForm: FormGroup;

  constructor(private ls: LocalService) {
    this.localForm = new FormGroup({
      nombre: new FormControl(''),
      direccion: new FormControl('')
    });
  }

  guardarForm() {
    const localTmp = {
      id: '',
      nombre: this.localForm.value.nombre,
      direccion: this.localForm.value.direccion,
      activo: true

    };

    this.ls.persistirLocal(localTmp);

    this.localForm.reset();
  }

  cancelarForm() {
    this.localForm.reset();
  }

  ngOnInit() {
  }

}
