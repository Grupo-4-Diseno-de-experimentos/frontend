// recipe-ingredient.model.ts
export interface RecipeIngredientResponse {
  id: number;
  ingredient_id: number;
  recipe_id: number;
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
  user_id: number;
  recipe_id: number;
}


// ingredient.model.ts
export interface IngredientResponse {
  id: number;
  name: string;
  quantity: number;
  calories: number;
  carbs: number;
  proteins: number;
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
}
