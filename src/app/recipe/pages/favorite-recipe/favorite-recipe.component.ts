import {Component, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardModule,
} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {Recipe} from '../../model/recipe.entity';
import {RecipeService} from '../../services/recipe.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {UserService} from '../../../user/services/user.service';
@Component({
  selector: 'app-favorite-recipe',
  imports: [
    MatCardActions,
    MatIcon,
    NgIf,
    MatCard,
    MatCardModule,
    MatCardContent,
    MatButton,
    MatIconButton,
    MatTooltip,
    NgForOf,
  ],
  templateUrl: './favorite-recipe.component.html',
  styleUrl: './favorite-recipe.component.css'
})
export class FavoriteRecipeComponent implements OnInit{
  favoriteRecipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchRecipeFavorites();
  }
  fetchRecipeFavorites(): void {
    this.recipeService.getFavoriteRecipesByUserId(this.userService.getUserId().toString()).subscribe({
      next: (recipes) => {
        console.log('recipes favorites:', recipes);
        this.favoriteRecipes = recipes;
      },
      error: (err) => {
        console.error('Error fetching recipe details:', err);
      }
    });
  }
  goToDetail(id: number): void {
    this.router.navigate(['/recipe/recipedetail', id]);
  }

  removeFromFavorites(recipe_id: number): void {
    this.favoriteRecipes = this.favoriteRecipes.filter(r => r.id !== recipe_id);
    this.recipeService.removeFavorite(recipe_id.toString(), this.userService.getUserId().toString());
  }
}

