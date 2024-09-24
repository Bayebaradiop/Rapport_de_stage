import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDecComponent } from './modifier-dec.component';

describe('ModifierDecComponent', () => {
  let component: ModifierDecComponent;
  let fixture: ComponentFixture<ModifierDecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierDecComponent]
    });
    fixture = TestBed.createComponent(ModifierDecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
