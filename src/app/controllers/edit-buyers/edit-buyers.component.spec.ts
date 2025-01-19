import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBuyersComponent } from './edit-buyers.component';

describe('EditBuyersComponent', () => {
  let component: EditBuyersComponent;
  let fixture: ComponentFixture<EditBuyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBuyersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
