﻿// user.model.ts
export interface UserResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}

// customer.model.ts
export interface CustomerResponse {
  id: number;
  age: number;
  height: number;
  weight: number;
  objective: string;
  activity_level: string;
  allergies: string;
  preferences: string;
  available_ingredients: string;
  user_id: number;
}

// nutritionist.model.ts
export interface NutritionistResponse {
  id: number;
  description: string;
  specialities: string;
  years_experience: number;
  user_id: number;
}

// ingredient.model.ts
export interface IngredientResponse {
  id: number;
  name: string;
  quantity: number;
  calorie: number;
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
}

// recipe-ingredient.model.ts
export interface RecipeIngredientResponse {
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

// meal-plan.model.ts
export interface MealPlanResponse {
  id: number;
  name: string;
  category: string;
  description: string;
  goal: string;
  min_bmi: number;
  max_bmi: number;
  min_age: number;
  max_age: number;
  calories_per_day: number;
  nutricionist_id: number;
  created_at: string;
}

// customer-meal-plan.model.ts
export interface CustomerMealPlan {
  id: number;
  is_current: boolean;
  customer_id: number;
  meal_plan_id: number;
}

// meal-plan-day.model.ts
export interface MealPlanRecipeResponse {
  id: number;
  day: string;
  meal_time: string;
  recipe_id: number;
  meal_plan_id: number;
}
