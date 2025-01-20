import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { ActivatedRoute } from '@angular/router';
import { PlotService } from '../../services/plot.service';

interface GeneralInfo {
  projectName: string;
  plotNo: string;
  plotSize: string;
  owner: string;
  quotedPrice: string;
  direction: string;
  cornerSite: string;
}

@Component({
  selector: 'app-general-information',
  standalone: true,
  imports: [CommonModule, SideBarComponent],
  template: `
    <div class="general-info-page">
      <app-side-bar></app-side-bar>
      
      <div class="main-content">
        <div class="header">
          <h1>Site Details of {{info.projectName}} - Plot {{info.plotNo}}</h1>
        </div>

        <div class="info-section">
          <div class="section-header">
            <div class="title">
              <h2>General Information</h2>
            </div>
            <button class="edit-btn" (click)="editInfo()">
              <i class="fas fa-edit"></i>
              Edit
            </button>
          </div>

          <div class="info-content">
            <div class="info-item">
              <label>Project :-</label>
              <span>{{info.projectName}}</span>
            </div>
            <div class="info-item">
              <label>Plot No. :-</label>
              <span>{{info.plotNo}}</span>
            </div>
            <div class="info-item">
              <label>Plot Size :-</label>
              <span>{{info.plotSize}}</span>
            </div>
            <div class="info-item">
              <label>Owner :-</label>
              <span>{{info.owner}}</span>
            </div>
            <div class="info-item">
              <label>Quoted Price :-</label>
              <span>{{info.quotedPrice}}</span>
            </div>
            <div class="info-item">
              <label>Direction :-</label>
              <span>{{info.direction}}</span>
            </div>
            <div class="info-item">
              <label>Corner Site :-</label>
              <span>{{info.cornerSite}}</span>
            </div>
          </div>
        </div>

        <div class="share-section">
          <button class="share-btn">
            Share Quote
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .general-info-page {
      display: flex;
      min-height: 100vh;
      background: #f5f5f5;
      padding-top: 72px;
    }

    .main-content {
      flex: 1;
      padding: 2rem 2rem 2rem 250px;
    }

    .header {
      background: #d4b595;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    .header h1 {
      color: #333;
      font-size: 1.5rem;
      margin: 0;
    }

    .info-section {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .title h2 {
      margin: 0;
      font-size: 1.25rem;
      color: #333;
    }

    .edit-btn {
      background: #0056b3;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .info-content {
      display: grid;
      gap: 1.5rem;
    }

    .info-item {
      display: flex;
      gap: 1rem;
    }

    .info-item label {
      min-width: 120px;
      font-weight: 500;
      color: #666;
    }

    .share-section {
      margin-top: 2rem;
      text-align: center;
    }

    .share-btn {
      background: #0056b3;
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 4px;
      cursor: pointer;
    }

    @media screen and (max-width: 1024px) {
      .main-content {
        margin-left: 10px;
      }
    }

    @media screen and (max-width: 768px) {
      .general-info-page {
        flex-direction: column;
      }

      .main-content {
        padding: 1rem;
      }

      .info-item {
        flex-direction: column;
        gap: 0.5rem;
      }

      .info-item label {
        min-width: auto;
      }
    }
  `]
})
export class GeneralInformationComponent implements OnInit {
  info: GeneralInfo = {
    projectName: '',
    plotNo: '',
    plotSize: '30 × 50',
    owner: 'NA',
    quotedPrice: '22.5 lakhs (1500 per Sqft)',
    direction: 'East Facing',
    cornerSite: 'YES'
  };

  constructor(
    private route: ActivatedRoute,
    private plotService: PlotService
  ) {}

  ngOnInit() {
    const plotDetails = this.plotService.getPlotDetails();
    this.info.projectName = plotDetails.projectName;
    this.info.plotNo = plotDetails.plotId;
  }

  editInfo() {
    // Implement edit functionality
  }

  // This would be the actual API call in production
  private loadPlotDetails(plotId: string) {
    // this.plotService.getPlotDetails(plotId).subscribe(details => {
    //   this.info = details;
    // });
  }
}
