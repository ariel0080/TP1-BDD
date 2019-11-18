export  class Usuario {
  public nombre: string;
  public apellido: string;
  public foto: string;
  public activo: boolean;
  public email: string;
  public rol: string;

  constructor(
    nombre: string,
    apellido: string,
    foto: string,
    activo: boolean,
    email: string,
    rol: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.foto = foto;
    this.activo = activo;
    this.email = email;
    this.rol = rol;
  }
}
