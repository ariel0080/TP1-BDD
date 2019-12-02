export interface ProductoI {
    nombre: string;
    costo: number;
    cantidad: number;
    fechaCreacion: Date;
    local: string;
    descripcion: string;
    observaciones: string;
    foto: string;
    activo: boolean;
    id?: string;
  }
