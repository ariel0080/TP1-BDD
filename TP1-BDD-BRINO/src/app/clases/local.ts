import { Producto } from './producto';
import { Usuario } from './usuario';

export class Local {

sucursal: string;
direccion: string;
stock: Array<Producto>;
empleados: Array<Usuario>;

constructor(sucursal: string,
  direccion:string
  ){

  this.sucursal = sucursal;
  this.direccion = direccion;
  this.stock = new Array<Producto>();
  this.empleados = new Array<Usuario>();

}



}
