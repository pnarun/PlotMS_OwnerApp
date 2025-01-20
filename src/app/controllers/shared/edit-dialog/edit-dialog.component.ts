import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dialog-overlay">
      <div class="dialog-content">
        <div class="dialog-header">
          <h2>Edit General Information</h2>
          <button class="close-btn" (click)="onCancel()">×</button>
        </div>

        <div class="dialog-body">
          <div class="form-group">
            <label>Project Name</label>
            <input type="text" [(ngModel)]="editData.projectName" readonly>
          </div>

          <div class="form-group">
            <label>Plot Number</label>
            <input type="text" [(ngModel)]="editData.plotNumber" readonly>
          </div>

          <div class="form-group">
            <label>Owner Name</label>
            <input type="text" [(ngModel)]="editData.ownerName">
          </div>

          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" [(ngModel)]="editData.phoneNumber">
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="editData.email">
          </div>

          <div class="form-group">
            <label>Address</label>
            <textarea [(ngModel)]="editData.address" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label>Plot Size</label>
            <input type="text" [(ngModel)]="editData.plotSize">
          </div>

          <div class="form-group">
            <label>Plot Value</label>
            <input type="number" [(ngModel)]="editData.plotValue">
          </div>
        </div>

        <div class="dialog-footer">
          <button class="cancel-btn" (click)="onCancel()">Cancel</button>
          <button class="save-btn" (click)="onSave()">Save Changes</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .dialog-content {
      background: white;
      border-radius: 8px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 1.5rem;
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .dialog-header h2 {
      margin: 0;
      color: #333;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
    }

    input, textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    input:read-only {
      background: #f5f5f5;
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .cancel-btn, .save-btn {
      padding: 0.5rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .cancel-btn {
      background: #f5f5f5;
      color: #333;
    }

    .save-btn {
      background: #0056b3;
      color: white;
    }

    .save-btn:hover {
      background: #004494;
    }
  `]
})
export class EditDialogComponent {
  @Input() editData: any = {};
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.save.emit(this.editData);
  }

  onCancel() {
    this.cancel.emit();
  }
} 