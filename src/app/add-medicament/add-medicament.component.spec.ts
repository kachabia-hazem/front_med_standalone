import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicamentComponent } from './add-medicament.component';

describe('AddMedicamentComponent', () => {
  let component: AddMedicamentComponent;
  let fixture: ComponentFixture<AddMedicamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMedicamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
