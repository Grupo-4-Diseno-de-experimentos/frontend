import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
import {MatCardModule, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Ingredient} from '../../model/recipe.entity';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-recipe-create',
  imports: [
    FormsModule,
    MatAutocomplete,
    MatOption,
    MatCardContent,
    MatCardModule,
    MatCardHeader,
    ReactiveFormsModule,
    MatError,
    MatInput,
    NgIf,
    MatIconButton,
    MatIcon,
    MatButton,
    MatAutocompleteTrigger,
    MatFormField,
    MatFormFieldModule,
    NgForOf
  ],
  templateUrl: './recipe-create.component.html',
  styleUrl: './recipe-create.component.css'
})
export class RecipeCreateComponent implements OnInit{
  recipeForm: FormGroup;
  ingredientSearch = '';
  selectedIngredients: (Ingredient & { quantity: number })[] = [];
  allIngredients: Ingredient[] = [];
  filteredIngredients: Ingredient[] = [];

  constructor(private fb: FormBuilder) {
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

  }

  searchIngredients(): void {
    const searchTerm = this.ingredientSearch.toLowerCase();
    this.filteredIngredients = this.allIngredients.filter(ing =>
      ing.name.toLowerCase().includes(searchTerm) &&
      !this.selectedIngredients.some(selected => selected.id === ing.id)
    );
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

    // actualizaciion el formulario (puedes hacerlo manual o automático)
    this.recipeForm.patchValue({
      calories: Math.round(totals.calories),
      carbs: Math.round(totals.carbs),
      proteins: Math.round(totals.proteins),
      fats: Math.round(totals.fats)
    });
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const recipeData = {
        ...this.recipeForm.value,
        ingredients: this.selectedIngredients.map(ing => ({
          id: ing.id,
          quantity: ing.quantity
        }))
      };
      console.log('Receta a guardar:', recipeData);
      //guardar recetas en backend
    }
  }

  cancel(): void {

  }
}
