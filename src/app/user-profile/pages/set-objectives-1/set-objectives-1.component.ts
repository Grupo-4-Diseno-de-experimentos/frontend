import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-set-objectives-1',
  templateUrl: './set-objectives-1.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./set-objectives-1.component.css']
})
export class SetObjectives1Component {
  constructor(private router: Router) {}

  selectGoal(goal: string) {
    console.log('Objetivo seleccionado:', goal);
    this.router.navigate(['/set-objectives-2']);
  }
}
