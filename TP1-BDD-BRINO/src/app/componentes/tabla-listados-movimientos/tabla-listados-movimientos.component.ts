import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabla-listados-movimientos',
  templateUrl: './tabla-listados-movimientos.component.html',
  styleUrls: ['./tabla-listados-movimientos.component.css']
})
export class TablaListadosMovimientosComponent implements OnInit {
  @Input() rol: string;
  @Input() tipo: string;

  constructor() { }

  ngOnInit() {
  }

}