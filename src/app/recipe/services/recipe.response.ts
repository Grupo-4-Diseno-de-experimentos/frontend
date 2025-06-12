// recipe-ingredient.model.ts
export interface RecipeIngredientResponse {
  id: number;
  ingredient_id: number;
  recipe_id: number;
  quantity: number;
}

// macros.model.ts
export interface MacrosResponse {
  carbs: number;
  protein: number;
  fats: number;
  recipe_id: number;
}

// favorite-recipe.model.ts
export interface FavoriteRecipeResponse {
  id: number;
  userId: number;
  recipeId: number;
}


// ingredient.model.ts
export interface IngredientResponse {
  id: number;
  name: string;
  quantity: number;
  calories: number;
  carbs: number;
  protein: number;
  fats: number;
  category: string;
  available: boolean;
}

// recipe.model.ts
export interface RecipeResponse {
  id: number;
  title: string;
  description: string;
  instructions: string;
  calories: number;
  nutricionist_id: number;
  macros:MacrosResponse;
  ingredientIds: number[];
}
