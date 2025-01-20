import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plot-success-msg',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="msg-box" *ngIf="show">
      <div class="msg-content">
        <div class="msg-text">
          <i class="fas fa-check-circle success-icon"></i>
          Plot {{plotNumber}} of {{projectName}} selected successfully!
        </div>
        <button class="close-btn" (click)="onClose()">×</button>
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
  `]
})
export class PlotSuccessMsgComponent {
  @Input() show: boolean = false;
  @Input() projectName: string = '';
  @Input() plotNumber: string = '';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
} 