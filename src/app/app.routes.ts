import { Routes } from '@angular/router';
import { HomePageComponent } from './controllers/home-page/home-page.component';
import { LoginComponent } from './controllers/login/login.component';
import { AnalyticsComponent } from './controllers/analytics/analytics.component';
import { SiteMapComponent } from './controllers/site-map/site-map.component';
import { DocumentsComponent } from './controllers/documents/documents.component';
import { GeneralInformationComponent } from './controllers/general-information/general-information.component';
import { InterestedBuyersComponent } from './controllers/interested-buyers/interested-buyers.component';
import { PaymentsComponent } from './controllers/payments/payments.component';
import { AuthGuard } from './guards/auth.guard';
import { LogoutComponent } from './controllers/logout/logout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },
  { path: 'site-map/:id', component: SiteMapComponent, canActivate: [AuthGuard] },
  { path: 'documents/:plotId', component: DocumentsComponent, canActivate: [AuthGuard] },
  { path: 'general-info/:plotId', component: GeneralInformationComponent, canActivate: [AuthGuard] },
  { path: 'interested-buyers/:plotId', component: InterestedBuyersComponent, canActivate: [AuthGuard] },
  { path: 'payments/:plotId', component: PaymentsComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: 'login' }
];
