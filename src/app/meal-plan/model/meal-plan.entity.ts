// user.entity.ts
export class User {
  constructor(
    public id: number,
    public name: string,
    public lastName: string,
    public email: string,
    public password: string,
    public role: string,
    public created_at: string
  ) {}
}

// customer.entity.ts
export class Customer {
  constructor(
    public id: number,
    public age: number,
    public height: number,
    public weight: number,
    public objective: string,
    public activity_level: string,
    public allergies: string,
    public preferences: string,
    public available_ingredients: string,
    public user_id: number
  ) {}
}
// nutritionist.entity.ts
export class Nutritionist {
  constructor(
    public id: number,
    public description: string,
    public specialities: string,
    public years_experience: number,
    public user_id: number
  ) {}
}
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

// macros.entity.ts
export class Macros {
  constructor(
    public carbs: number,
    public proteins: number,
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
// meal-plan.entity.ts
export class MealPlan {
  constructor(
    public id: number,
    public name: string,
    public category: string,
    public description: string,
    public goal: string,
    public min_bmi: number,
    public max_bmi: number,
    public min_age: number,
    public max_age: number,
    public calories_per_d: number,
    public nutricionist_id: number
  ) {}

/*  isValidForUser(bmi: number, age: number): boolean {
    return (
      bmi >= this.min_bmi &&
      bmi <= this.max_bmi &&
      age >= this.min_age &&
      age <= this.max_age
    );
  }*/
}
// meal-plan-recipe.entity.ts
export class MealPlanRecipe {
  constructor(
    public id: number,
    public day: string,
    public meal_time: string,
    public recipe_id: number,
    public meal_plan_id: number
  ) {}

  isBreakfast(): boolean {
    return this.meal_time.toLowerCase() === 'desayuno';
  }
  isLunch(): boolean {
    return this.meal_time.toLowerCase() === 'almuerzo';
  }
  isDinner(): boolean {
    return this.meal_time.toLowerCase() === 'cena';
  }
}
// customer-meal-plan.entity.ts
export class CustomerMealPlan {
  constructor(
    public id: number,
    public is_current: boolean,
    public customer_id: number,
    public meal_plan_id: number
  ) {}

  markAsCurrent() {
    this.is_current = true;
  }

  unselect() {
    this.is_current = false;
  }
}
// bmi.value-object.ts
export class BMI {
  constructor(public value: number) {
    if (value <= 0) {
      throw new Error('El IMC debe ser mayor a 0');
    }
  }

  getCategory(): string {
    if (this.value < 18.5) return 'Bajo peso';
    if (this.value < 24.9) return 'Normal';
    if (this.value < 29.9) return 'Sobrepeso';
    return 'Obesidad';
  }
}
