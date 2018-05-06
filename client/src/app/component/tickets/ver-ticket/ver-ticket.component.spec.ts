import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTicketComponent } from './ver-ticket.component';

describe('VerTicketComponent', () => {
  let component: VerTicketComponent;
  let fixture: ComponentFixture<VerTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
