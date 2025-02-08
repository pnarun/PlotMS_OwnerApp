import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './controllers/loading/loading.component';
import { HeaderComponent } from './controllers/shared/header/header.component';
import { FooterComponent } from './controllers/shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LoadingComponent
  ],
  template: `
    <app-loading *ngIf="isLoading"></app-loading>
    <app-header *ngIf="!isLoading"></app-header>
    <router-outlet *ngIf="!isLoading"></router-outlet>
    <app-footer *ngIf="!isLoading"></app-footer>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading = true;

  constructor(private router: Router) {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    // Simulate a delay for loading
    setTimeout(() => {
      if (typeof window !== 'undefined') { // Check if running in a browser
        const isLoggedIn = !!localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        } else {
          // User is logged in, navigate to the intended page
          const redirectUrl = localStorage.getItem('redirectUrl') || '/home';
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirectUrl'); // Clear the redirect URL
        }
      }
      this.isLoading = false; // Hide loading after checking
    }, 1000); // Adjust the delay as needed
  }
}
