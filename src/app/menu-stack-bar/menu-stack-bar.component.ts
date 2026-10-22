import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu-stack-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu-stack-bar.component.html',
  styleUrls: ['./menu-stack-bar.component.css']
})
export class MenuStackBarComponent {}

/** Alias export for MenuStackBar */
export { MenuStackBarComponent as MenuStackBar };
