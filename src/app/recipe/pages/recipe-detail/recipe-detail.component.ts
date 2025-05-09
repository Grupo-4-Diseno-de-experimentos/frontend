import {Component, Input, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardModule
} from '@angular/material/card';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatButton, MatIconButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../user/services/user.service';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {RecipeService} from '../../services/recipe.service';
import {Ingredient, Recipe, RecipeIngredient} from '../../model/recipe.entity';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-recipe-detail',
  imports: [
    MatCard,
    MatCardModule,
    MatButton,
    MatTable,
    FormsModule,
    MatInput,
    NgIf,
    MatCardActions,
    MatCardContent,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatIconButton,
    NgForOf,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    NgClass,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipeId!: string;
  editMode = false;
  recipe!: Recipe;
  originalRecipe: any;
  recipeIngredients: RecipeIngredient[] = [];
  displayedColumns: string[] = [
    'name', 'quantity', 'calories', 'carbs', 'proteins', 'fats', 'category', 'available'
  ];
  ingredientsByRecipeIngredientId: Ingredient[] = [];
  recipeBackup: Recipe | null = null;
  ingredientSearch = '';
  allIngredients: Ingredient[] = [];
  filteredIngredients: Ingredient[] = [];
  selectedIngredients: Ingredient[] = [];
  ingredientsIdsByRecipesIngredient: number[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService, private recipeService: RecipeService) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Recibido id:', params['id']);
    });
    this.recipeId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.recipeId);
    this.fetchRecipeIngredients()
    this.fetchRecipeDetails();
    this.getRecipeById();
    this.getAllIngredients();
  }
  get isNutricionist() {
    return this.userService.isNutricionist();
  }
  getRecipeById() {
    this.recipeService.getRecipeById(this.recipeId).subscribe(recipe => {
      this.recipe = recipe;
/*      this.selectedIngredients = [...recipe.ingredients];*/
    });
  }

  getAllIngredients() {
    this.recipeService.getAllIngredients().subscribe(data => {
      this.filteredIngredients = data;
    });
  }
  filterIngredients() {
    const query = this.ingredientSearch.toLowerCase();
    this.filteredIngredients = this.allIngredients.filter(
      (ingredient) =>
        ingredient.name.toLowerCase().includes(query)
    );
  }
  addIngredient(ingredient: Ingredient) {
    if (!this.selectedIngredients.some(i => i.id === ingredient.id)) {
      this.selectedIngredients.push({ ...ingredient, quantity: 100 }); // default
    }
  }

  removeIngredient(index: number) {
    this.selectedIngredients.splice(index, 1);
  }

  cancelEdit() {
    this.editMode = false;
  }
  fetchRecipeDetails(): void {
    this.recipeService.getRecipeById(this.recipeId).subscribe({
      next: (recipe) => {
        console.log('recipe details:', recipe);
        this.recipe = recipe;
      },
      error: (err) => {
        console.error('Error fetching recipe details:', err);
      }
    });
  }
  fetchIngredients(): void {
    this.recipeService.getAllIngredients().subscribe({
      next: (ingredients) => {
        console.log('ingredients:', ingredients);
        this.allIngredients = ingredients;
      },
      error: (err) => {
        console.error('Error fetching ingredients:', err);
      }
    });
  }
  fetchRecipeIngredients(): void {
    this.recipeService.getRecipeIngredientsByRecipeId(this.recipeId).subscribe({
      next: (recipeIngredients) => {
        console.log('recipe ingredients:', recipeIngredients);
        this.recipeIngredients = recipeIngredients;
        recipeIngredients.forEach(recipeIngredient => this.ingredientsIdsByRecipesIngredient.push(recipeIngredient.ingredient_id))
        this.fetchIngredientsByRecipeId();
      },
      error: (err) => {
        console.error('Error fetching recipe ingredients:', err);
      }
    });
  }
  fetchIngredientsByRecipeId(): void {
    this.ingredientsIdsByRecipesIngredient.forEach(id => {
      this.recipeService.getIngredientsByRecipeId(id.toString()).subscribe({
        next: (ingredients) => {
          ingredients.forEach(ingredient => this.ingredientsByRecipeIngredientId.push(ingredient));
          console.log('Ingredients by ID:', this.ingredientsByRecipeIngredientId);
        },
        error: (err) => {
          console.error('Error fetching ingredient by ID:', err);
        }
      });
    });
  }
/*  saveChanges() {
    const updatedRecipe = {
      ...this.recipe,
      ingredients: this.selectedIngredients
    };
    this.recipeService.updateRecipe(updatedRecipe).subscribe(() => {
      this.editMode = false;
    });

  }*/
  saveChanges() {
 /*   console.log('Meal Plan:', this.mealPlan); // Captura el título y descripción
    console.log('Meal Plan Recipes:', this.mealPlanRecipes); // Captura las recetas asociadas
    // Aquí puedes enviar los datos al backend
    this.recipeService.updateRecipe(this.mealPlan.id.toString(), {
      mealPlan: this.mealPlan,
      recipes: this.mealPlanRecipes
    }).subscribe({
      next: (response) => {
        console.log('Recipe actualizado con éxito:', response);
        /!*          alert('¡Plan actualizado exitosamente!');*!/
      },
      error: (err) => {
        console.error('Error al actualizar la recipe:', err);
        alert('Error al actualizar la recipe.');
      }
    });
    this.editMode = false;*/
  }
  editRecipe() {
    console.log('Editar receta');
  }
}
