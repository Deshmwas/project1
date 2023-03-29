import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedingRequestComponent } from './peding-request.component';

describe('PedingRequestComponent', () => {
  let component: PedingRequestComponent;
  let fixture: ComponentFixture<PedingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedingRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
