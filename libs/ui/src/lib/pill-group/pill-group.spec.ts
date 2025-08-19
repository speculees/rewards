import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PillGroupComponent } from './pill-group';

describe('PillGroup', () => {
  let component: PillGroupComponent;
  let fixture: ComponentFixture<PillGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PillGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PillGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
