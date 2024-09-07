import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleDeclarationComponent } from './detaille-declaration.component';

describe('DetailleDeclarationComponent', () => {
  let component: DetailleDeclarationComponent;
  let fixture: ComponentFixture<DetailleDeclarationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailleDeclarationComponent]
    });
    fixture = TestBed.createComponent(DetailleDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
