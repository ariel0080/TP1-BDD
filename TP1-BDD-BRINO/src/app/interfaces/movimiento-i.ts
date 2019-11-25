import { TipoMovimiento } from '../enums/tipo-movimiento.enum';

export interface MovimientoI {


  tipo: TipoMovimiento;
  usuario: string;
  producto: string;
  local: string;
  cantidad?: number;

}
