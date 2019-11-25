import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadosLocalesComponent } from './tabla-listados-locales.component';

describe('TablaListadosLocalesComponent', () => {
  let component: TablaListadosLocalesComponent;
  let fixture: ComponentFixture<TablaListadosLocalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadosLocalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadosLocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
