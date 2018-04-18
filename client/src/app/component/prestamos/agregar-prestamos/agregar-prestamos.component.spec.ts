import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPrestamosComponent } from './agregar-prestamos.component';

describe('AgregarPrestamosComponent', () => {
  let component: AgregarPrestamosComponent;
  let fixture: ComponentFixture<AgregarPrestamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarPrestamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
