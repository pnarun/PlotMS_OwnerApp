import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { ActivatedRoute } from '@angular/router';
import { PlotService } from '../../services/plot.service';
import { MsgBoxComponent } from '../shared/msg-box/msg-box.component';

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
  imports: [CommonModule, SideBarComponent, FormsModule, MsgBoxComponent],
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
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

  isEditing = false;
  showSuccessMsg = false;
  editedInfo: GeneralInfo = { ...this.info };

  constructor(
    private route: ActivatedRoute,
    private plotService: PlotService
  ) {}

  ngOnInit() {
    const plotDetails = this.plotService.getPlotDetails();
    this.info.projectName = plotDetails.projectName;
    this.info.plotNo = plotDetails.plotId;
    this.editedInfo = { ...this.info };
  }

  startEditing() {
    this.editedInfo = { ...this.info };
    this.isEditing = true;
  }

  saveChanges() {
    this.info = { ...this.editedInfo };
    this.isEditing = false;
    this.showSuccessMsg = true;
    setTimeout(() => {
      this.showSuccessMsg = false;
    }, 2000);
  }

  cancelEdit() {
    this.editedInfo = { ...this.info };
    this.isEditing = false;
  }

  // This would be the actual API call in production
  private loadPlotDetails(plotId: string) {
    // this.plotService.getPlotDetails(plotId).subscribe(details => {
    //   this.info = details;
    // });
  }
}
