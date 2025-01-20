import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { DocumentService } from '../../services/document.service';
import { HttpClientModule } from '@angular/common/http';
import { PlotService } from '../../services/plot.service';

interface Document {
  fileName: string;
  fileSize: string;
  date: string;
  type: string;
}

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, SideBarComponent, HttpClientModule],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents: Document[] = [];
  projectName: string = '';
  plotNumber: string = '';

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private plotService: PlotService
  ) {}

  ngOnInit() {
    const plotDetails = this.plotService.getPlotDetails();
    this.projectName = plotDetails.projectName;
    this.plotNumber = plotDetails.plotId;

    this.loadDocuments();
  }

  loadDocuments() {
    // This will be replaced with actual API call
    this.documents = [
      { fileName: 'Allotment Letter', fileSize: '28.50 KB', date: '16/11/2022', type: 'pdf' },
      { fileName: 'Khata Certificate', fileSize: '28.50 KB', date: '16/11/2022', type: 'pdf' },
      { fileName: 'Sale Deed', fileSize: '28.50 KB', date: '16/11/2022', type: 'pdf' },
      { fileName: 'Property Tax Receipts', fileSize: '28.50 KB', date: '16/11/2022', type: 'pdf' },
      { fileName: 'NOC', fileSize: '28.50 KB', date: '16/11/2022', type: 'pdf' },
      { fileName: 'Payment Receipts', fileSize: '28.50 KB', date: '16/11/2022', type: 'pdf' }
    ];
  }

  uploadDocument() {
    // Implement file upload logic
  }

  viewDocument(doc: Document) {
    // Implement document view logic
  }

  deleteDocument(doc: Document) {
    // Implement document delete logic
  }
}
