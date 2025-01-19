import { Routes } from '@angular/router';
import { HomePageComponent } from './controllers/home-page/home-page.component';
import { AnalyticsComponent } from './controllers/analytics/analytics.component';
import { SiteMapComponent } from './controllers/site-map/site-map.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'site-map/:id', component: SiteMapComponent },
  { path: '**', redirectTo: 'home' }
];
