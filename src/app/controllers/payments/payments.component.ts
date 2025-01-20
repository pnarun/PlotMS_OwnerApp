import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { ActivatedRoute } from '@angular/router';
import { PlotService } from '../../services/plot.service';

interface Payment {
  id: string;
  date: string;
  amount: number;
  receiptSize: string;
}

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, SideBarComponent],
  template: `
    <div class="payments-page">
      <app-side-bar></app-side-bar>
      <div class="main-content">
        <div class="header">
          <h1>Site Details of {{projectName}} - Plot {{plotNumber}}</h1>
        </div>

        <div class="summary-cards">
          <div class="card total-earnings">
            <h3>Total Earnings</h3>
            <div class="amount">₹{{totalEarnings.toLocaleString('en-IN')}}.00</div>
            <div class="date">as of {{lastUpdateDate}}</div>
          </div>
          <div class="card pending-payments">
            <h3>Pending Payments</h3>
            <div class="amount">₹{{pendingAmount.toLocaleString('en-IN')}}.00</div>
            <div class="date">as of {{lastUpdateDate}}</div>
          </div>
        </div>

        <div class="payments-section">
          <div class="section-header">
            <h2>Payment History</h2>
          </div>

          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th class="hide-mobile">Payment ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Receipt</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let payment of payments">
                  <td class="hide-mobile">{{payment.id}}</td>
                  <td>{{payment.date}}</td>
                  <td>₹{{payment.amount.toLocaleString('en-IN')}}</td>
                  <td class="receipt-cell">
                    <span class="file-size hide-mobile">{{payment.receiptSize}} KB</span>
                    <div class="action-buttons">
                      <button class="view-btn" title="View Receipt">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button class="delete-btn" title="Delete Receipt">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="table-footer">
            <div class="entries-per-page">
              <select>
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <span>per page</span>
            </div>
            <div class="pagination-info">
              1-2 of 1 pages
            </div>
            <div class="pagination-controls">
              <button disabled><i class="fas fa-chevron-left"></i></button>
              <button disabled><i class="fas fa-chevron-right"></i></button>
            </div>
          </div>

          <div class="add-payment">
            <button class="add-payment-btn" (click)="addPaymentRecord()">
              Add Payment Record
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payments-page {
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

    .summary-cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .card {
      padding: 1.5rem;
      border-radius: 8px;
      color: #333;
    }

    .card h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
    }

    .card .amount {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0.5rem 0;
    }

    .card .date {
      font-size: 0.875rem;
      color: #666;
    }

    .total-earnings {
      background: #e8f5e9;
    }

    .pending-payments {
      background: #fff3e0;
    }

    .payments-section {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .section-header {
      margin-bottom: 1.5rem;
    }

    .section-header h2 {
      margin: 0;
      font-size: 1.25rem;
      color: #333;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
    }

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      font-weight: 600;
      color: #333;
    }

    .receipt-cell {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .file-size {
      color: #666;
    }

    .edit-btn {
      padding: 0.25rem 0.75rem;
      border: 1px solid #0056b3;
      background: none;
      color: #0056b3;
      border-radius: 4px;
      cursor: pointer;
    }

    .view-btn, .delete-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
    }

    .view-btn {
      color: #0056b3;
    }

    .delete-btn {
      color: #dc3545;
    }

    .table-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
    }

    .entries-per-page {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .entries-per-page select {
      padding: 0.25rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .pagination-controls {
      display: flex;
      gap: 0.5rem;
    }

    .pagination-controls button {
      padding: 0.5rem;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      border-radius: 4px;
    }

    .pagination-controls button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .add-payment {
      margin-top: 1.5rem;
      text-align: center;
    }

    .add-payment-btn {
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
      .payments-page {
        flex-direction: column;
      }

      .main-content {
        padding: 1rem;
      }

      .summary-cards {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .receipt-cell {
        flex-wrap: wrap;
      }

      .table-footer {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
    }

    .hide-mobile {
      display: table-cell;
    }

    .receipt-cell {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .view-btn, .delete-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .view-btn {
      color: #0056b3;
    }

    .view-btn:hover {
      background-color: #e3f2fd;
    }

    .delete-btn {
      color: #dc3545;
    }

    .delete-btn:hover {
      background-color: #ffebee;
    }

    @media screen and (max-width: 768px) {
      .hide-mobile {
        display: none;
      }

      td {
        padding: 0.75rem;
      }

      .receipt-cell {
        justify-content: flex-end;
      }

      .action-buttons {
        gap: 1rem;
      }

      .view-btn, .delete-btn {
        font-size: 1.1rem;
      }

      .summary-cards {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }
  `]
})
export class PaymentsComponent implements OnInit {
  projectName: string = '';
  plotNumber: string = '';
  totalEarnings: number = 430000;
  pendingAmount: number = 100000;
  lastUpdateDate: string = '01 December 2022';
  
  payments: Payment[] = [
    { id: '#15267', date: 'Mar 1, 2023', amount: 130000, receiptSize: '28.50' },
    { id: '#15587', date: 'Jan 26, 2023', amount: 100000, receiptSize: '28.50' },
    { id: '#12436', date: 'Feb 12, 2023', amount: 100000, receiptSize: '28.50' },
    { id: '#16879', date: 'Feb 12, 2023', amount: 100000, receiptSize: '28.50' }
  ];

  constructor(
    private route: ActivatedRoute,
    private plotService: PlotService
  ) {}

  ngOnInit() {
    const plotDetails = this.plotService.getPlotDetails();
    this.projectName = plotDetails.projectName;
    this.plotNumber = plotDetails.plotId;
  }

  addPaymentRecord() {
    // Implement add payment functionality
  }

  // This would be the actual API call in production
  private loadPaymentDetails(plotId: string) {
    // this.paymentService.getPaymentDetails(plotId).subscribe(details => {
    //   this.totalEarnings = details.totalEarnings;
    //   this.pendingAmount = details.pendingAmount;
    //   this.payments = details.paymentHistory;
    // });
  }
}
