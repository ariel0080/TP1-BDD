import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadosUsuariosComponent } from './tabla-listados-usuarios.component';

describe('TablaListadosUsuariosComponent', () => {
  let component: TablaListadosUsuariosComponent;
  let fixture: ComponentFixture<TablaListadosUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadosUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
