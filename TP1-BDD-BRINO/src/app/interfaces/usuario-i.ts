import { Rol } from '../enums/rol.enum';

export interface UsuarioI {
  nombre: string;
  apellido: string;
  email: string;
  local: string;
  foto: string;
  activo: boolean;
  rol: Rol;
  id?: string;
}
