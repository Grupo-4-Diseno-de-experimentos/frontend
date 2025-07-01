import { Component } from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    MatIcon,
    MatIconButton,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  toggleDarkMode(): void {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage['theme'] = 'light';
    } else {
      html.classList.add('dark');
      localStorage['theme'] = 'dark';
    }
  }


}
