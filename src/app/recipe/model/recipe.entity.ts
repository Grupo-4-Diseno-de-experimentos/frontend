// ingredient.entity.ts
export class Ingredient {
  constructor(
    public id: number,
    public name: string,
    public quantity: number,
    public calories: number,
    public carbs: number,
    public proteins: number,
    public fats: number,
    public category: string,
    public available: boolean
  ) {}
}
// recipe.entity.ts
export class Recipe {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public instructions: string,
    public calories: number,
    public nutricionist_id: number
  ) {}
}
// recipe-ingredient.entity.ts
export class RecipeIngredient {
  constructor(
    public id: number,
    public ingredient_id: number,
    public recipe_id: number
  ) {}
}
// macros.entity.ts
export class Macros {
  constructor(
    public carbs: number,
    public protein: number,
    public fats: number,
    public recipe_id: number
  ) {}
}
// favorite-recipe.entity.ts
export class FavoriteRecipe {
  constructor(
    public id: number,
    public user_id: number,
    public recipe_id: number
  ) {}
}
