import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {  MatAutocomplete,  MatAutocompleteTrigger,  MatOption} from '@angular/material/autocomplete';
import {MatCardModule, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatFormField, MatInput} from '@angular/material/input';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Ingredient} from '../../model/recipe.entity';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RecipeService} from '../../services/recipe.service';
import {UserService} from '../../../user/services/user.service';

@Component({
  selector: 'app-recipe-create',
  imports: [ FormsModule,  MatAutocomplete,  MatOption,  MatCardContent,  MatCardModule,  MatCardHeader,  ReactiveFormsModule,  MatInput,  NgIf,  MatIconButton,
    MatIcon,  MatButton,  MatAutocompleteTrigger,  MatFormField,  MatFormFieldModule,  NgForOf ],
  templateUrl: './recipe-create.component.html',
  styleUrl: './recipe-create.component.css'
})
export class RecipeCreateComponent implements OnInit{
  recipeForm: FormGroup;
  ingredientSearch = '';
  selectedIngredients: (Ingredient & { quantity: number })[] = [];
  allIngredients: Ingredient[] = [];
  filteredIngredients: Ingredient[] = [];

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private userService: UserService) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      instructions: ['', Validators.required],
      calories: ['', [Validators.required, Validators.min(0)]],
      carbs: ['', [Validators.required, Validators.min(0)]],
      proteins: ['', [Validators.required, Validators.min(0)]],
      fats: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.fetchIngredients();
  }

  searchIngredients(): void {
    const searchTerm = this.ingredientSearch.toLowerCase();
    this.filteredIngredients = this.allIngredients.filter(ing =>
      ing.name.toLowerCase().includes(searchTerm) &&
      !this.selectedIngredients.some(selected => selected.id === ing.id)
    );
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

  addIngredient(ingredient: Ingredient): void {
    this.selectedIngredients.push({...ingredient, quantity: 100}); // Cantidad por defecto 100g
    this.ingredientSearch = '';
    this.filteredIngredients = [];
    this.updateNutritionalValues();
  }

  removeIngredient(index: number): void {
    this.selectedIngredients.splice(index, 1);
    this.updateNutritionalValues();
  }

  updateNutritionalValues(): void {
    // se calcula valores nutricionales sumando los ingredientes
    const totals = this.selectedIngredients.reduce((acc, ing) => {
      const factor = ing.quantity / 100; // se asumie valores nutricionales por 100g
      return {
        calories: acc.calories + (ing.calories * factor),
        carbs: acc.carbs + (ing.carbs * factor),
        proteins: acc.proteins + (ing.proteins * factor),
        fats: acc.fats + (ing.fats * factor)
      };
    }, { calories: 0, carbs: 0, proteins: 0, fats: 0 });

    // actualizaciion el formulario
    this.recipeForm.patchValue({
      calories: Math.round(totals.calories),
      carbs: Math.round(totals.carbs),
      proteins: Math.round(totals.proteins),
      fats: Math.round(totals.fats)
    });
  }

/*  onSubmit(): void {
    if (this.recipeForm.valid) {
      const recipeData = {
        ...this.recipeForm.value,
        ingredients: this.selectedIngredients.map(ing => ({
          id: ing.id,
          quantity: ing.quantity
        }))
      };
      console.log('Receta a guardar:', recipeData);

    }
  }*/

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const recipe: any = {
        title: this.recipeForm.value.title,
        description: this.recipeForm.value.description,
        instructions: this.recipeForm.value.instructions,
        calories: this.recipeForm.value.calories,
        nutricionist_id: this.userService.getUserId(),
      };

      const macros:any = {
        carbs: this.recipeForm.value.carbs,
        proteins: this.recipeForm.value.proteins,
        fats: this.recipeForm.value.fats
      };

      // se guarda la receta para obtener el id primero
      this.recipeService.saveRecipe(recipe).subscribe({
        next: (savedRecipe) => {
          const recipeId = savedRecipe.id;

          // asociamos el id de la receta a los ingredientes
          const recipeIngredients = this.selectedIngredients.map(ingredient => ({
            recipe_id: recipeId,
            ingredient_id: ingredient.id,
            quantity: ingredient.quantity
          }));

          // se guardan los ingredientes en RecipeIngredient
          this.recipeService.saveRecipeIngredients(recipeIngredients)
        },
        error: (err) => {
          console.error('Error al guardar la receta:', err);
        }
      });
    }
  }

  cancel(): void {

  }
}
