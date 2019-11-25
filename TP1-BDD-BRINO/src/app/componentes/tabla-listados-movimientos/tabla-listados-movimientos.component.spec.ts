import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadosMovimientosComponent } from './tabla-listados-movimientos.component';

describe('TablaListadosMovimientosComponent', () => {
  let component: TablaListadosMovimientosComponent;
  let fixture: ComponentFixture<TablaListadosMovimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadosMovimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadosMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
