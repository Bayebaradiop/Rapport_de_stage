import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDecPieceRemisComponent } from './modifier-dec-piece-remis.component';

describe('ModifierDecPieceRemisComponent', () => {
  let component: ModifierDecPieceRemisComponent;
  let fixture: ComponentFixture<ModifierDecPieceRemisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierDecPieceRemisComponent]
    });
    fixture = TestBed.createComponent(ModifierDecPieceRemisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
