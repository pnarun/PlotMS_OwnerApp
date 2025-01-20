import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Project } from '../../models/project.interface';
import { ProjectService } from '../../services/project.service';
import { MsgBoxComponent } from '../shared/msg-box/msg-box.component';
import { PlotService } from '../../services/plot.service';

@Component({
  selector: 'app-site-map',
  standalone: true,
  imports: [CommonModule, FormsModule, MsgBoxComponent],
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.css']
})
export class SiteMapComponent implements OnInit {
  projectName: string = '';
  searchQuery: number | null = null;
  max_plots: number = 0;
  maxPlots: number[] = [];
  isValidInput: boolean = false;
  isBooked: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';
  showMsgBox: boolean = false;
  currentProject?: Project;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private projectService: ProjectService,
    private plotService: PlotService
  ) {}

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjects().subscribe(projects => {
        const project = projects.find(p => p.id.toString() === projectId);
        if (project) {
          this.projectName = project.name;
          this.max_plots = project.maxPlots || 0;
          this.maxPlots = project.availablePlotsArray || [];
          this.currentProject = project;
        }
      });
    }
  }

  validatePlotNumber() {
    if (!this.searchQuery) {
      this.resetValidation();
      return;
    }

    const plotNumber = Number(this.searchQuery);
    
    // First check if the number is within valid range
    if (plotNumber < 1 || plotNumber > this.max_plots) {
      this.showError = true;
      this.errorMessage = 'Please enter valid plot number between 1 and ' + this.max_plots;
      this.isValidInput = false;
      return;
    }

    // Check if the plot is available
    if (this.maxPlots.includes(plotNumber)) {
      // Plot is available
      this.isValidInput = true;
      this.showError = false;
      this.errorMessage = '';
    } 
    // else {
    //   // Plot is booked
    //   this.isValidInput = false;
    //   this.showError = true;
    //   this.errorMessage = 'Selected Plot is already booked. Please choose another plot.';
    // }
  }

  onSearch() {
    if (this.searchQuery && this.isValidInput) {
      // Store plot details before navigation
      this.plotService.setPlotDetails({
        projectName: this.projectName,
        plotId: this.searchQuery.toString()
      });
      
      this.router.navigate(['/documents', this.searchQuery]);
    }
  }

  closeMsgBox() {
    this.showMsgBox = false;
    this.searchQuery = null;
    this.resetValidation();
  }

  private resetValidation() {
    this.isValidInput = false;
    this.isBooked = false;
    this.showError = false;
    this.errorMessage = '';
  }

  goBack() {
    this.location.back();
  }

  handleImageError(event: any) {
    event.target.src = 'assets/images/placeholder.jpg'; // Fallback image
  }
}
