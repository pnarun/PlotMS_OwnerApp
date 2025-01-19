import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  standalone: true,
  template: `
    <div class="analytics-container">
      <h2>Coming soon!!!</h2>
    </div>
  `,
  styles: [`
    .analytics-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    h2 {
      font-size: 2.5rem;
      color: #333;
    }
  `]
})
export class AnalyticsComponent {}
