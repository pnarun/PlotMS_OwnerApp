import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-msg-box',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="msg-box" *ngIf="show">
      <div class="msg-content" [class.confirm-dialog]="isConfirmDialog">
        <div class="msg-text">
          <i class="fas" [class.fa-check-circle]="!isConfirmDialog" [class.fa-exclamation-triangle]="isConfirmDialog"></i>
          {{message}}
        </div>
        <div class="actions" *ngIf="isConfirmDialog">
          <button class="cancel-btn" (click)="onCancel()">Cancel</button>
          <button class="delete-btn" (click)="onConfirm()">Delete</button>
        </div>
        <button *ngIf="!isConfirmDialog" class="close-btn" (click)="onClose()">×</button>
      </div>
    </div>
  `,
  styles: [`
    .msg-box {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1100;
      animation: slideIn 0.3s ease-out;
    }

    .msg-content {
      background: #4caf50;
      color: white;
      padding: 1rem 2rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    .msg-text {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .success-icon {
      font-size: 1.2rem;
    }

    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      opacity: 0.8;
      transition: opacity 0.2s;
    }

    .close-btn:hover {
      opacity: 1;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .confirm-dialog {
      background: #ff4444;
    }

    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .cancel-btn, .delete-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .cancel-btn {
      background: #fff;
      color: #333;
    }

    .delete-btn {
      background: #dc3545;
      color: white;
    }
  `]
})
export class MsgBoxComponent {
  @Input() show: boolean = false;
  @Input() message: string = '';
  @Input() isConfirmDialog: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
