import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-welcome',
  template: `
    <p class="welcome-title">欢迎使用{{app.title}}</p>
  `,
  styles: [`
    .welcome-title {
      padding: 100px 0;
      color: #ddd;
      font-size: 38px;
      text-align: center;
    }
  `]
})
export class WelcomeComponent {
  constructor(@Inject('app') public app) {
  }
}
