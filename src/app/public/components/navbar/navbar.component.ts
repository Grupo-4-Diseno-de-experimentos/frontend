import { Component } from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {UserService} from '../../../user-profile/services/user.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    MatIcon,
    MatIconButton,
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private userService: UserService) {}

  get isNutritionist(): boolean {
    return this.userService.isNutritionist();
  }
}
