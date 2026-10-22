import { Component } from '@angular/core';
import { AbcCafeComponent } from './abc-cafe/abc-cafe.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AbcCafeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cafe';
}
