export class Producto {

  nombre: string;
  costo: number;
  cantidad: number;
  fechaCreacion: string;
  descripcion: string;
  observaciones: string;
  foto: string;
  activo: boolean;

  constructor(
    nombre: string,
    costo: number,
    cantidad: number,
    fechaCreacion: string,
    descripcion: string,
    observaciones: string,
    foto: string,
    activo: boolean

  ){

    this.nombre = nombre;
    this.costo = costo;
    this.cantidad = cantidad;
    this.fechaCreacion = fechaCreacion;
    this.descripcion = descripcion;
    this.observaciones = observaciones;
    this.foto = foto;
    this.activo = activo;

  }


}
