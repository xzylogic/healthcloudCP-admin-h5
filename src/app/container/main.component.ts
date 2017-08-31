import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <app-nav>
      <router-outlet></router-outlet>
    </app-nav>
  `
})
export class MainComponent {
}
