import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Observable } from 'rxjs';
import { LocalI } from 'src/app/interfaces/local-i';
import { LocalService } from 'src/app/servicios/local.service';
import { MovimientoService } from 'src/app/servicios/movimiento.service';
import { MovimientoI } from 'src/app/interfaces/movimiento-i';
import { TipoMovimiento } from 'src/app/enums/tipo-movimiento.enum';
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ProductoI } from 'src/app/interfaces/producto-i';

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
  public movProd:MovimientoI;
  usuarioActivo: Observable<any>;
  productos: AngularFirestoreCollection;
  idp: string;
  ll: string;
  kk: string;
  constructor(private ps: ProductoService,private as: AngularFirestore,  private us: AuthService,private Uss: UsuarioService ,private Ms:MovimientoService, private lS: LocalService) {
    this.productoForm = new FormGroup({
      nombre: new FormControl(''),
      costo: new FormControl(''),
      local: new FormControl(''),
      descripcion: new FormControl(''),
      observaciones: new FormControl(''),
      foto: new FormControl('')

      
    });

    this.productos = this.as.collection<ProductoI>('productos');
    this.locales=this.lS.traerLocales();
    this.locales.subscribe(datos => {
           this.arrayLocales = new Array<string>();
            datos.forEach(element => {
           this.tmp = JSON.parse(JSON.stringify(element));
            this.arrayLocales.push(this.tmp.nombre);
    
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

    let ll = this.productoForm.value.local;
    let kk = this.productoForm.value.nombre;

      
    this.ps.persistirProducto(productoTmp, this.productoForm.value.foto.files);
    

    
    //--------------------dasdassad-asdasdasdasd-asdasdasdas-dasdasd--

   
    

    this.usuarioActivo = this.us.traerUsuarioActivo();
    this.usuarioActivo.subscribe(usuario => {
      

    

    const movimientosTmp = {usuario: 'admin@admin.com',tipo: TipoMovimiento.crear,fecha: new Date(),local: ll,producto: kk}

    this.ps.traerProductos().subscribe(p => {
      
      p.forEach(pp => { if (pp.nombre === kk && pp.local == ll){this.idp = pp.id; }})

    });

    this.lS.traerLocales().subscribe(locales => {
      let idLocal: string;
      let idUser: string;
      
      locales.forEach(localFE => {
        
       
        
        if (localFE.nombre === ll) {idLocal = localFE.id;}})
      this.Uss.traerUsuarios().subscribe(UsuariosTmp => {
        UsuariosTmp.forEach(uId => {if (uId.email == usuario.email) {idUser = uId.id;}})

        console.log("PRODUCTO: ",this.idp,"---USUARIO_ ", idUser,"-----LOCAL: ",idLocal)
    this.Ms.persistirMovimiento(movimientosTmp, this.idp, "productos");
    this.Ms.persistirMovimiento(movimientosTmp, idUser, "usuarios");
    this.Ms.persistirMovimiento(movimientosTmp, idLocal, "locales");
  });
})



});
    
   ///---------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
   
  
   



    this.productoForm.reset();


  }

  cancelarForm() {
    this.productoForm.reset();
  }

  ngOnInit() {}

}
