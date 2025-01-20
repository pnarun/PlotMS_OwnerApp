import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { DocumentService } from '../../services/document.service';
import { HttpClientModule } from '@angular/common/http';
import { PlotService } from '../../services/plot.service';
import { UploadDocumentsComponent } from '../shared/upload-documents/upload-documents.component';
import { MsgBoxComponent } from '../shared/msg-box/msg-box.component';
import { FormsModule } from '@angular/forms';

interface Document {
  fileName: string;
  fileSize: string;
  date: string;
  type: string;
}

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule, 
    SideBarComponent, 
    HttpClientModule, 
    UploadDocumentsComponent, 
    MsgBoxComponent, 
    FormsModule
  ],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents: Document[] = [];
  projectName: string = '';
  plotNumber: string = '';
  showUploadDialog = false;
  showSuccessMsg = false;
  showDeleteConfirm = false;
  documentToDelete: any = null;
  documentTypes = [
    'Allotment Letter',
    'Khata Certificate',
    'Sale Deed',
    'Property Tax Receipts',
    'NOC',
    'Payment Receipts',
    'Others'
  ];

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
    this.documentService.getDocuments().subscribe(docs => {
      this.documents = docs;
    });
  }

  uploadDocument() {
    // Implement file upload logic
  }

  viewDocument(doc: any) {
    this.documentService.viewDocument(doc);
  }

  confirmDelete(doc: any) {
    this.documentToDelete = doc;
    this.showDeleteConfirm = true;
  }

  deleteDocument() {
    if (this.documentToDelete) {
      this.documentService.deleteDocument(this.documentToDelete.id)
        .subscribe(success => {
          if (success) {
            this.showDeleteConfirm = false;
            this.documentToDelete = null;
            this.showSuccessMsg = true;
            setTimeout(() => {
              this.showSuccessMsg = false;
            }, 2000);
            this.loadDocuments();
          }
        });
    }
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
    this.documentToDelete = null;
  }

  toggleUploadDialog() {
    console.log('Toggle upload dialog');
    this.showUploadDialog = !this.showUploadDialog;
  }

  onUploadComplete(success: boolean) {
    console.log('Upload complete:', success);
    this.showUploadDialog = false;
    if (success) {
      this.showSuccessMsg = true;
      this.loadDocuments(); // Refresh the documents list immediately
      setTimeout(() => {
        this.showSuccessMsg = false;
      }, 2000);
    }
  }
}
