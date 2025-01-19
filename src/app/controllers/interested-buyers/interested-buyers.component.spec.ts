import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedBuyersComponent } from './interested-buyers.component';

describe('InterestedBuyersComponent', () => {
  let component: InterestedBuyersComponent;
  let fixture: ComponentFixture<InterestedBuyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestedBuyersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestedBuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
