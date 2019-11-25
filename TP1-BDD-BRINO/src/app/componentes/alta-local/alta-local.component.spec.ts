import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaLocalComponent } from './alta-local.component';

describe('AltaLocalComponent', () => {
  let component: AltaLocalComponent;
  let fixture: ComponentFixture<AltaLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
