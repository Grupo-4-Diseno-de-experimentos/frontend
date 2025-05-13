import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {Recipe} from '../../model/recipe.entity';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Router, RouterLink} from '@angular/router';
@Component({
  selector: 'app-recipe-item',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './recipe-item.component.html',
  standalone: true,
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;
  @Output() recipeSelected = new EventEmitter<number>();
  constructor(private router: Router) {}

  addFavorite(): void {
    this.recipeSelected.emit(this.recipe.id);
  }
}
