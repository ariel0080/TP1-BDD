import { TipoMovimiento } from '../enums/tipo-movimiento.enum';

export interface MovimientoI {

  
  
  fecha: Date;
  local: string;
  producto: string;
  tipo: TipoMovimiento;
  usuario: string;
  
  //cantidad?: number;


}
