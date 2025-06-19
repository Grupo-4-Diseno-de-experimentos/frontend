import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizeObjectivesComponent } from './start-objectives.component';

describe('PersonalizeObjectivesComponent', () => {
  let component: PersonalizeObjectivesComponent;
  let fixture: ComponentFixture<PersonalizeObjectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalizeObjectivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalizeObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
