﻿import {
  MealPlanResponse,
  MealPlanRecipeResponse,
  FavoriteRecipeResponse,
  RecipeResponse, CustomerMealPlanResponse
} from './meal-plan.response';
import {
  MealPlan,
  MealPlanRecipe,
  FavoriteRecipe,
  Recipe,
  CustomerMealPlan
} from '../model/meal-plan.entity';

export class MealPlanAssembler {
  static toEntityFromResponseArray(responseArray: MealPlanResponse[]): MealPlan[] {
    return responseArray.map((response) =>
      this.toEntityFromResponse(response));
  }

  static toEntityFromResponse(response: MealPlanResponse): MealPlan {
    return {
/*      isValidForUser(bmi: number, age: number): boolean {
        return false;
      },*/
      id: response.id,
      name: response.name,
      category: response.category,
      description: response.description,
      goal: response.goal,
      min_bmi: response.min_bmi,
      max_bmi: response.max_bmi,
      min_age: response.min_age,
      max_age: response.max_age,
      calories_per_d: response.calories_per_d,
      nutricionist_id: response.nutricionist_id
    };
  }
}

export class FavoriteRecipeAssembler {
  static toEntityFromResponseArray(responseArray: FavoriteRecipeResponse[]): FavoriteRecipe[] {
    return responseArray.map((response) =>
      this.toEntityFromResponse(response));
  }
  static toEntityFromResponse(response: FavoriteRecipeResponse): FavoriteRecipe {
    return {
      id: response.id,
      user_id: response.user_id,
      recipe_id: response.recipe_id,
    };
  }
}
export class RecipeAssembler {
  static toEntityFromResponseArray(responseArray: RecipeResponse[]): Recipe[] {
    return responseArray.map((response) =>
      this.toEntityFromResponse(response));
  }
  static toEntityFromResponse(response: RecipeResponse): Recipe {
    return {
      id: response.id,
      title: response.title,
      description: response.description,
      instructions: response.instructions,
      calories: response.calories,
      nutricionist_id: response.nutricionist_id
    };
  }
}

export class MealPlanRecipeAssembler {
  static toEntityFromResponseArray(data: MealPlanRecipeResponse[]): MealPlanRecipe[] {
    const entities = data.map(d => this.toEntityFromResponse(d));
    console.log('Entities parseadas:', entities); // <-- Agrega esto
    return entities;
  }
  static toEntityFromResponse(response: MealPlanRecipeResponse): MealPlanRecipe {
    console.log('⚠️ response recibido en assembler:', response);
    return new MealPlanRecipe(
      undefined,
      response.day,
      response.mealTime,
      response.recipe?.id,
      response.mealPlan ? response.mealPlan.id : undefined
    );
  }
}

export class CustomerMealPlanAssembler {
  static toEntityFromResponseArray(responseArray: CustomerMealPlanResponse[]): CustomerMealPlan[] {
    return responseArray.map((response) =>
      this.toEntityFromResponse(response));
  }
  static toEntityFromResponse(response: CustomerMealPlanResponse): CustomerMealPlan {
    return new CustomerMealPlan (
      response.id,
      response.is_current,
      response.customer_id,
      response.meal_plan_id,
    );
  }
}
