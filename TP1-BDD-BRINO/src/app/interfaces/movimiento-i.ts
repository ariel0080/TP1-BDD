import { TipoMovimiento } from '../enums/tipo-movimiento.enum';

export interface MovimientoI {

  usuario: string;
  tipo: TipoMovimiento;
  fecha: Date;
  local: string;
  producto: string;
  
  //cantidad?: number;


}
