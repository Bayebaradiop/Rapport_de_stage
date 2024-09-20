import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierdeclarationComponent } from './modifierdeclaration.component';

describe('ModifierdeclarationComponent', () => {
  let component: ModifierdeclarationComponent;
  let fixture: ComponentFixture<ModifierdeclarationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierdeclarationComponent]
    });
    fixture = TestBed.createComponent(ModifierdeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
