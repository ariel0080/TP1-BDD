import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadosUsuariosMovimientosComponent } from './tabla-listados-usuarios-movimientos.component';

describe('TablaListadosUsuariosMovimientosComponent', () => {
  let component: TablaListadosUsuariosMovimientosComponent;
  let fixture: ComponentFixture<TablaListadosUsuariosMovimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadosUsuariosMovimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadosUsuariosMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
