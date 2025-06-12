import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../services/recipe.service';
import {MatCardModule} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UserService} from "../../../user-profile/services/user.service";
import {Recipe} from '../../model/recipe.entity';
import {RecipeItemComponent} from '../../components/recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-list',
  imports: [MatCardModule, NgForOf, FormsModule
    , RecipeItemComponent, NgIf],
  templateUrl: './recipe-list.component.html',
  standalone: true,
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  userId!: string;
  constructor(private recipeService: RecipeService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => {
        console.log('Data fetched:', data);
        this.recipes = data;
      },
      error: (err) => console.error('Error fetching data:', err)

    })
  }
    goToDetail(id: number): void {
    this.router.navigate(['/recipe/recipedetail', id]);
    }
  get isNutricionist() {
    return this.userService.isNutricionist();
  }
  goToCreateRecipe(){
    this.router.navigate(['/recipe/create-recipe']);
  }
  onRecipeSelected(recipeId: number): void {
    console.log('Recipe selected:', recipeId);
    const userId = this.userService.getUserId();

    const favoriteRecipe = {
      recipeId: recipeId,
      userId: userId
    }
    console.log('Request enviado al backend:', favoriteRecipe);
    this.recipeService.saveFavoriteRecipe(favoriteRecipe).subscribe({
        next: (response) => {
          console.log('Recipe saved as favorite:', response);
        },
        error: (err) => {
          console.error('Error saving recipe as favorite:', err);
        }
      }
    );
  }

}
