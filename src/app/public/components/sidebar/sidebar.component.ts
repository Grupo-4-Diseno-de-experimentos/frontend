import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {UserService} from '../../../user-profile/services/user.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatIcon,
    RouterLink,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router, private userService: UserService) {
  }

  get isNutritionist(): boolean {
    return this.userService.isNutritionist();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
