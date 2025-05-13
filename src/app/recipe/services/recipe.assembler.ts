import {Recipe, RecipeIngredient, Ingredient, FavoriteRecipe, Macros} from '../model/recipe.entity';
import {FavoriteRecipeResponse, RecipeIngredientResponse,
RecipeResponse, MacrosResponse, IngredientResponse} from './recipe.response';


export class RecipeAssembler {
  static toEntityFromResponseArray(responseArray: RecipeResponse[]): Recipe[] {
    return responseArray.map((response) =>
      this.toEntityFromResponse(response));
  }
  static toEntityFromResponse(response: RecipeResponse): Recipe {
    return new Recipe(
      response.title,
      response.description,
      response.instructions,
      response.calories,
      response.nutricionist_id,
      response.id,
      new Macros(
        response.macros.carbs,
        response.macros.protein,
        response.macros.fats,
        response.macros.recipe_id
      )
    );
  }
}
export class MacrosAssembler {
  static toEntityFromResponseArray(responseArray: MacrosResponse[]): Macros[] {
    return responseArray.map((response) =>
      this.toEntityFromResponse(response));
  }
  static toEntityFromResponse(response: MacrosResponse): Macros {
    return {
      carbs: response.carbs,
      protein: response.protein,
      fats: response.fats,
      recipe_id: response.recipe_id,
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
      userId: response.userId,
      recipeId: response.recipeId,
    };
  }
}

export class IngredientAssembler {
  static toEntityFromResponseArray(responseArray: IngredientResponse[]): Ingredient[] {
    return responseArray.map((response) =>
      this.toEntityFromResponse(response));
  }
  static toEntityFromResponse(response: IngredientResponse): Ingredient {
    return {
      id: response.id,
      name: response.name,
      quantity: response.quantity,
      calories: response.calories,
      carbs: response.carbs,
      protein: response.protein,
      fats: response.fats,
      category: response.category,
      available: response.available,
    };
  }
}

export class RecipeIngredientAssembler {
  static toEntityFromResponseArray(responseArray: RecipeIngredientResponse[]): RecipeIngredient[] {
    return responseArray.map((response) =>
      this.toEntityFromResponse(response));
  }
  static toEntityFromResponse(response: RecipeIngredientResponse): RecipeIngredient {
    return {
      id: response.id,
      ingredient_id: response.ingredient_id,
      recipe_id: response.recipe_id,
      quantity: response.quantity,
    };
  }
}
