import {Component, OnInit} from '@angular/core';
import {LayoutComponent} from './public/components/layout/layout.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'app-frontend';
  ngOnInit(): void {
    const enableDarkMode = () => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    };

    const disableDarkMode = () => {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    };

    const loadTheme = () => {
      const theme = localStorage.getItem('theme');
      if (
        theme === 'dark' ||
        (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    };

    loadTheme();

  }

}
