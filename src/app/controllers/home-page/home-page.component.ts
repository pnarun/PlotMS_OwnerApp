import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.interface';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  projects: Project[] = [];
  searchQuery: string = '';
  selectedPropertyType: string = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.searchProjects(this.searchQuery, this.selectedPropertyType)
      .subscribe(projects => {
        this.projects = projects;
      });
  }

  onSearch(): void {
    this.loadProjects();
  }
}
