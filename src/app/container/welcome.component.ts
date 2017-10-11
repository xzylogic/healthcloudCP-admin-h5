import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-welcome',
  template: `
    <div class="welcome-container">
      <div class=welcome></div>
    </div>
  `,
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  constructor(@Inject('app') public app) {
  }
}
