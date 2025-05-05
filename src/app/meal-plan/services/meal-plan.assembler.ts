import {
  MealPlanResponse,
  MealPlanRecipeResponse,
  FavoriteRecipeResponse,
  RecipeIngredientResponse,
  RecipeResponse
} from './meal-plan.response';
import {MealPlan, MealPlanRecipe, FavoriteRecipe, RecipeIngredient, Recipe} from '../model/meal-plan.entity';

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
      calories_per_day: response.calories_per_day,
      nutricionist_id: response.nutricionist_id,
      created_at: response.created_at,
    };
  }
}

export class MealPlanDayAssembler {
  static toEntityFromResponseArray(responseArray: MealPlanRecipeResponse[]): MealPlanRecipe[] {
    return responseArray.map((response) =>
      this.toEntityFromResponse(response));
  }
  static toEntityFromResponse(response: MealPlanRecipeResponse): MealPlanRecipe {
    return {
      isBreakfast(): boolean {
        return false;
      }, isDinner(): boolean {
        return false;
      }, isLunch(): boolean {
        return false;
      },
      id: response.id,
      meal_plan_id: response.meal_plan_id,
      recipe_id: response.recipe_id,
      day: response.day,
      meal_time: response.meal_time
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
  static toEntityFromResponseArray(responseArray: MealPlanRecipeResponse[]): MealPlanRecipe[] {
    return responseArray.map((response) =>
      this.toEntityFromResponse(response));
  }
  static toEntityFromResponse(response: MealPlanRecipeResponse): MealPlanRecipe {
    return new MealPlanRecipe(
      response.id,
      response.day,
      response.meal_time,
      response.recipe_id,
      response.meal_plan_id
    );
  }
}
