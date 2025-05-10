import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAmigosComponent } from './add-amigos.component';

describe('AddAmigosComponent', () => {
  let component: AddAmigosComponent;
  let fixture: ComponentFixture<AddAmigosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAmigosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAmigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
