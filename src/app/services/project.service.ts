import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Project } from '../models/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private mockProjects: Project[] = [
    {
      id: 1,
      name: 'N R Layout',
      location: 'Sadashivanagar',
      imageUrl: 'assets/images/projects/nr-layout.jpg',
      siteMapUrl: 'assets/images/sitemapImages/sitemap-img.jpg',
      propertyType: 'residential',
      description: 'Premium residential plots',
      maxPlots: 100,
      availablePlotsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
    },
    {
      id: 2,
      name: 'Balaji Layout',
      location: 'Saraswathipuram',
      imageUrl: 'assets/images/projects/balaji-layout.jpg',
      siteMapUrl: 'assets/images/sitemapImages/sitemap-img.jpg',
      propertyType: 'residential',
      description: 'Luxury residential plots',
      maxPlots: 100,
      availablePlotsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
    },
    {
      id: 3,
      name: 'SLN Layout',
      location: 'Antharasanahalli',
      imageUrl: 'assets/images/projects/sln-layout.jpg',
      siteMapUrl: 'assets/images/sitemapImages/sitemap-img.jpg',
      propertyType: 'residential',
      description: 'Premium residential plots',
      maxPlots: 100,
      availablePlotsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
    },
    {
      id: 4,
      name: 'TVS Layout',
      location: 'Kyathasandra',
      imageUrl: 'assets/images/projects/tvs-layout.jpg',
      siteMapUrl: 'assets/images/sitemapImages/sitemap-img.jpg',
      propertyType: 'residential',
      description: 'Premium residential plots',
      maxPlots: 96,
      availablePlotsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96]
    },
    {
      id: 5,
      name: 'Dollars Colony',
      location: 'Batawadi',
      imageUrl: 'assets/images/projects/dollars-colony.jpg',
      siteMapUrl: 'assets/images/sitemapImages/sitemap-img.jpg',
      propertyType: 'residential',
      description: 'Premium residential plots',
      maxPlots: 100,
      availablePlotsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
    },
    {
      id: 6,
      name: 'TUDA Layout',
      location: 'Sira Gate',
      imageUrl: 'assets/images/projects/tuda-layout.jpg',
      siteMapUrl: 'assets/images/sitemapImages/sitemap-img.jpg',
      propertyType: 'residential',
      description: 'Premium residential plots',
      maxPlots: 100,
      availablePlotsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
    }
  ];

  getProjects(): Observable<Project[]> {
    return of(this.mockProjects);
  }

  searchProjects(query: string, propertyType: string): Observable<Project[]> {
    let filteredProjects = this.mockProjects;
    
    if (query) {
      query = query.toLowerCase();
      filteredProjects = filteredProjects.filter(project => 
        project.name.toLowerCase().includes(query) || 
        project.location.toLowerCase().includes(query)
      );
    }

    if (propertyType) {
      filteredProjects = filteredProjects.filter(project => 
        project.propertyType === propertyType
      );
    }

    return of(filteredProjects);
  }

  projectExists(id: string): Observable<boolean> {
    return this.getProjects().pipe(
      map(projects => projects.some(p => p.id.toString() === id))
    );
  }
} 