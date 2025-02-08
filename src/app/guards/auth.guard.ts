import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('isLoggedIn'); // Check if user is logged in
    if (!isLoggedIn) {
      if (typeof window !== 'undefined') {
        const intendedUrl = route.url.join('/'); // Get the intended URL
        localStorage.setItem('redirectUrl', intendedUrl); // Store the intended URL
      }
      this.router.navigate(['/login']); // Redirect to login if not logged in
      return false;
    }
    return true; // Allow access if logged in
  }
} 