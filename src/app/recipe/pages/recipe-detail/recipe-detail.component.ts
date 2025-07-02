import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardModule} from '@angular/material/card';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableModule} from '@angular/material/table';
import {MatButton, MatIconButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../user-profile/services/user.service';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {RecipeService} from '../../services/recipe.service';
import {Ingredient, Macros, Recipe, RecipeIngredient} from '../../model/recipe.entity';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {forkJoin} from 'rxjs';
import {NotificationService} from '../../../shared/services/notification.service';

@Component({
  selector: 'app-recipe-detail',
  imports: [
    MatCard, MatCardModule, MatButton, MatTable, FormsModule, MatInput, NgIf, MatCardActions, MatCardContent, MatFormFieldModule, MatAutocompleteModule,
    MatIconModule, MatIconButton, NgForOf, MatColumnDef, MatHeaderCell, MatCell, MatCellDef, MatHeaderCellDef, NgClass, MatHeaderRow, MatHeaderRowDef,
    MatRow, MatRowDef, MatSelectModule, MatTableModule],
  templateUrl: './recipe-detail.component.html',
  standalone: true,
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipeId!: string;
  editMode = false;
  recipe!: Recipe;
  recipeIngredients: RecipeIngredient[] = [];
  displayedColumns: string[] = [
    'name', 'quantity', 'calories', 'carbs', 'proteins', 'fats', 'category', 'available'
  ];
  ingredientsByRecipeIngredientId: Ingredient[] = [];
  ingredientSearch = '';
  allIngredients: Ingredient[] = [];
  filteredIngredients: Ingredient[] = [];
  ingredientsIdsByRecipesIngredient: string[] = [];
  selectedIngredient: Ingredient | null = null;
  macros!: Macros;

  constructor(private route: ActivatedRoute, private userService: UserService, private recipeService: RecipeService, private notificationService: NotificationService,) {}
  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id')!;
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      recipe: this.recipeService.getRecipeById(this.recipeId),
      allIngredients: this.recipeService.getAllIngredients(),
      recipeIngredients: this.recipeService.getRecipeIngredientsByRecipeId(this.recipeId)
    }).subscribe({
      next: ({ recipe, allIngredients, recipeIngredients }) => {
        this.recipe = recipe;
        this.allIngredients = allIngredients;
        this.recipeIngredients = recipeIngredients;

        // Mapear los RecipeIngredient con su información de ingrediente
        this.ingredientsByRecipeIngredientId = this.recipeIngredients.map(ri => {
          const ingredient = allIngredients.find(i => i.id === ri.ingredient_id);
          if (ingredient) {
            return {
              ...ingredient,
              quantity: ri.quantity
            };
          }
          return null;
        }).filter(i => i !== null) as Ingredient[];

        // Macros
        this.macros = recipe.macros;

        // Inicializar búsqueda
        this.filteredIngredients = [...this.ingredientsByRecipeIngredientId];

        console.log('Datos cargados correctamente:', {
          recipe,
          recipeIngredients,
          ingredients: this.ingredientsByRecipeIngredientId,
          macros: this.macros
        });
      },
      error: (err) => {
        console.error('Error cargando datos iniciales:', err);
      }
    });
  }

  get isNutricionist() {
    return this.userService.isNutricionist();
  }
  removeIngredient(index: number): void {
    this.ingredientsByRecipeIngredientId.splice(index, 1);
    console.log('Updated ingredients:', this.ingredientsByRecipeIngredientId);
  }
  onIngredientSelect(event: any): void {
    console.log('Selected ingredient:', event.value);
    this.ingredientsByRecipeIngredientId.push(event.value);
    console.log('Ingredients by ID:', this.ingredientsByRecipeIngredientId);
  }
  filterIngredients() {
    const query = this.ingredientSearch.toLowerCase();
    this.filteredIngredients = this.allIngredients.filter(
      (ingredient) =>
        ingredient.name.toLowerCase().includes(query)
    );
  }

  cancelEdit() {
    this.editMode = false;
  }
  saveChanges() {
    const currentIngredientIds = this.ingredientsByRecipeIngredientId.map(i => i.id);

    // ingrediente eliminado
    const ingredientsToDelete = this.recipeIngredients.filter(ri => !currentIngredientIds.includes(ri.ingredient_id));
    ingredientsToDelete.forEach(ri => {
      if (ri.id) {
        this.recipeService.removeRecipeIngredient(ri.id.toString()).subscribe({
          next: () => console.log('Eliminado:', ri),
          error: (err) => console.error('Error eliminando:', err)
        });
      }
    });

    // crear o actualizar recipe-ingredientes
    const updatedIngredients: RecipeIngredient[] = this.ingredientsByRecipeIngredientId.map(ingredient => {
      const existing = this.recipeIngredients.find(ri => ri.ingredient_id === ingredient.id);
      return existing
        ? {
          ...existing,
          quantity: ingredient.quantity
        }
        : {
          recipe_id: Number(this.recipeId),
          ingredient_id: ingredient.id,
          quantity: ingredient.quantity
        } as RecipeIngredient;
    });
    // crear nuevos
    const ingredientsToCreate = updatedIngredients.filter(ri => !ri.id);
    if (ingredientsToCreate.length > 0) {
      this.recipeService.saveRecipeIngredients(ingredientsToCreate).subscribe({
        next: () => console.log('Ingredientes creados:', ingredientsToCreate),
        error: (err) => console.error('Error al crear ingredientes:', err)
      });
    }

    // actualizar
    updatedIngredients.filter(ri => ri.id).forEach(ri => {
      this.recipeService.updateRecipeIngredient(ri.id!.toString(), ri).subscribe({
        next: () => console.log('Actualizado:', ri),
        error: (err) => console.error('Error actualizando:', err)
      });
    });

    // actualizar la receta principal
    this.recipeService.updateRecipe(this.recipe.id.toString(), {
      recipe: this.recipe
    }).subscribe({
      next: () => {
        this.notificationService.add('Receta guardada correctamente.');
        console.log('Recipe actualizada con éxito');
        alert('¡Recipe actualizada exitosamente!');
      },
      error: (err) => {
        console.error('Error al actualizar la receta:', err);
        alert('Error al actualizar la receta.');
      }
    });

    this.editMode = false;
  }

}
