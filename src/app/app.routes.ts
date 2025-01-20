import { Routes } from '@angular/router';
import { HomePageComponent } from './controllers/home-page/home-page.component';
import { AnalyticsComponent } from './controllers/analytics/analytics.component';
import { SiteMapComponent } from './controllers/site-map/site-map.component';
import { DocumentsComponent } from './controllers/documents/documents.component';
import { GeneralInformationComponent } from './controllers/general-information/general-information.component';
import { InterestedBuyersComponent } from './controllers/interested-buyers/interested-buyers.component';
import { PaymentsComponent } from './controllers/payments/payments.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'site-map/:id', component: SiteMapComponent },
  { path: 'documents/:plotId', component: DocumentsComponent },
  { path: 'general-info/:plotId', component: GeneralInformationComponent },
  { path: 'interested-buyers/:plotId', component: InterestedBuyersComponent },
  { path: 'payments/:plotId', component: PaymentsComponent },
  { path: '**', redirectTo: 'home' }
];
