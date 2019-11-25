import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadosProductosComponent } from './tabla-listados-productos.component';

describe('TablaListadosProductosComponent', () => {
  let component: TablaListadosProductosComponent;
  let fixture: ComponentFixture<TablaListadosProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadosProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadosProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
