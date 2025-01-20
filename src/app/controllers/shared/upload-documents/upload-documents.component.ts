import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'app-upload-documents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="upload-dialog">
      <div class="dialog-content">
        <div class="dialog-header">
          <h2>Upload Document</h2>
          <button class="close-btn" (click)="close()">×</button>
        </div>

        <div class="document-type">
          <select [(ngModel)]="selectedType" (change)="onTypeChange()">
            <option value="">Select Document Type</option>
            <option *ngFor="let type of documentTypes" [value]="type">
              {{type}}
            </option>
          </select>

          <input 
            *ngIf="showCustomInput"
            type="text"
            [(ngModel)]="customType"
            placeholder="Enter document type"
            class="custom-input"
          >
        </div>

        <div class="upload-area" 
             (dragover)="onDragOver($event)"
             (dragleave)="onDragLeave($event)"
             (drop)="onDrop($event)">
          <div *ngIf="!selectedFile" class="upload-placeholder">
            <div class="upload-icon">
              <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <p>Drag and Drop Files here or</p>
            <label class="browse-btn">
              Browse Files
              <input 
                type="file" 
                (change)="onFileSelected($event)"
                accept=".pdf,.doc,.docx"
                style="display: none"
              >
            </label>
          </div>
          
          <div *ngIf="selectedFile" class="selected-file">
            <i class="fas fa-file-pdf"></i>
            <span>{{selectedFile.name}}</span>
            <button class="remove-file" (click)="removeFile()">×</button>
          </div>
        </div>

        <div class="bulk-upload">
          <input 
            type="checkbox" 
            [(ngModel)]="isBulkUpload"
            id="bulkUpload"
          >
          <label for="bulkUpload">Bulk Upload</label>
        </div>

        <div class="dialog-footer">
          <button class="cancel-btn" (click)="close()">Cancel</button>
          <button 
            class="upload-btn" 
            [disabled]="!canUpload()"
            (click)="upload()">
            Upload
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .upload-dialog {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .dialog-content {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      width: 90%;
      max-width: 500px;
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }

    .document-type {
      margin-bottom: 1.5rem;
    }

    select, .custom-input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .upload-area {
      border: 2px dashed #ddd;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      margin-bottom: 1rem;
      cursor: pointer;
    }

    .upload-area.dragover {
      border-color: #0056b3;
      background: #f8f9fa;
    }

    .upload-icon {
      font-size: 2rem;
      color: #666;
      margin-bottom: 1rem;
    }

    .browse-btn {
      color: #0056b3;
      cursor: pointer;
      text-decoration: underline;
    }

    .bulk-upload {
      margin: 1rem 0;
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .cancel-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
    }

    .upload-btn {
      padding: 0.5rem 1rem;
      background: #0056b3;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .upload-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .selected-file {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border: 1px dashed #ccc;
      border-radius: 4px;
    }

    .selected-file i {
      color: #dc3545;
      font-size: 1.5rem;
    }

    .remove-file {
      background: none;
      border: none;
      color: #dc3545;
      cursor: pointer;
      font-size: 1.2rem;
    }
  `]
})
export class UploadDocumentsComponent {
  @Input() documentTypes: string[] = [];
  @Output() uploadComplete = new EventEmitter<boolean>();
  @Output() closeDialog = new EventEmitter<void>();

  selectedType: string = '';
  customType: string = '';
  selectedFile: File | null = null;
  isBulkUpload: boolean = false;
  showCustomInput: boolean = false;

  constructor(private documentService: DocumentService) {}

  onTypeChange() {
    this.showCustomInput = this.selectedType === 'Others';
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.classList.remove('dragover');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.classList.remove('dragover');
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }

  canUpload(): boolean {
    if (this.selectedType === 'Others') {
      return !!this.customType && !!this.selectedFile;
    }
    return !!this.selectedType && !!this.selectedFile;
  }

  upload() {
    if (this.selectedFile && this.selectedType) {
      const documentType = this.selectedType === 'Others' ? this.customType : this.selectedType;
      
      this.documentService.uploadDocument(this.selectedFile, documentType)
        .subscribe(success => {
          this.uploadComplete.emit(success);
        });
    }
  }

  close() {
    this.closeDialog.emit();
  }

  removeFile() {
    this.selectedFile = null;
  }
} 