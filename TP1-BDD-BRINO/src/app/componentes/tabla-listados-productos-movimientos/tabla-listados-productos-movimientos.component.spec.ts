import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadosProductosMovimientosComponent } from './tabla-listados-productos-movimientos.component';

describe('TablaListadosProductosMovimientosComponent', () => {
  let component: TablaListadosProductosMovimientosComponent;
  let fixture: ComponentFixture<TablaListadosProductosMovimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadosProductosMovimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadosProductosMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
