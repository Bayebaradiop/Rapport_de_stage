import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecePerduByPersonComponent } from './piece-perdu-by-person.component';

describe('PiecePerduByPersonComponent', () => {
  let component: PiecePerduByPersonComponent;
  let fixture: ComponentFixture<PiecePerduByPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiecePerduByPersonComponent]
    });
    fixture = TestBed.createComponent(PiecePerduByPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
