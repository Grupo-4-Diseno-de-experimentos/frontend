import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRecipeComponent } from './favorite-recipe.component';

describe('FavoriteRecipeComponent', () => {
  let component: FavoriteRecipeComponent;
  let fixture: ComponentFixture<FavoriteRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
