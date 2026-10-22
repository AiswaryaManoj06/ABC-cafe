import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuStackBarComponent } from './menu-stack-bar/menu-stack-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuStackBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ABC Cafe';
}
