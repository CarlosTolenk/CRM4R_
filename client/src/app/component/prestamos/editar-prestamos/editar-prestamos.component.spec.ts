import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPrestamosComponent } from './editar-prestamos.component';

describe('EditarPrestamosComponent', () => {
  let component: EditarPrestamosComponent;
  let fixture: ComponentFixture<EditarPrestamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPrestamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
