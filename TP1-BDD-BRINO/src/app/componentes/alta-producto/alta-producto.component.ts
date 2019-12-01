import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Observable } from 'rxjs';
import { LocalI } from 'src/app/interfaces/local-i';
import { LocalService } from 'src/app/servicios/local.service';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit {
  public productoForm: FormGroup;
  public locales:Observable<any[]>;
  public arrayLocales: Array<string>
  public tmp:LocalI;

  constructor(private ps: ProductoService, private localService:LocalService) {
    this.productoForm = new FormGroup({
      nombre: new FormControl(''),
      costo: new FormControl(''),
      local: new FormControl(''),
      descripcion: new FormControl(''),
      observaciones: new FormControl(''),
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
    const productoTmp = {
      nombre: this.productoForm.value.nombre,
      costo: this.productoForm.value.costo,
      local: this.productoForm.value.local,
      cantidad: 0,
      fechaCreacion: new Date(),
      descripcion: this.productoForm.value.descripcion,
      observaciones: this.productoForm.value.observaciones,
      foto: '',
      activo: true
    };

    this.ps.persistirProducto(productoTmp, this.productoForm.value.foto.files);

    this.productoForm.reset();
  }

  cancelarForm() {
    this.productoForm.reset();
  }

  ngOnInit() {}
}
