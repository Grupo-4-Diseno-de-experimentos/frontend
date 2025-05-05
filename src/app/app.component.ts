import { Component } from '@angular/core';
import {LayoutComponent} from './public/components/layout/layout.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-frontend';
}
