import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlotService } from '../../services/plot.service';

interface Buyer {
  id: number;
  userName: string;
  phoneNumber: string;
  city: string;
  isInterested: boolean;
}

@Component({
  selector: 'app-interested-buyers',
  standalone: true,
  imports: [CommonModule, SideBarComponent, FormsModule],
  template: `
    <div class="buyers-page">
      <app-side-bar></app-side-bar>
      <div class="main-content">
        <div class="header">
          <h1>Site Details of {{projectName}} - Plot {{plotNumber}}</h1>
        </div>

        <div class="buyers-section">
          <div class="section-header">
            <div class="title-section">
              <h2>All Buyers</h2>
              <span class="subtitle">Interested Members</span>
            </div>
            <div class="actions">
              <button class="add-btn" (click)="addBuyer()">
                <i class="fas fa-plus"></i>
                Add Interested Buyers
              </button>
              <div class="search-box">
                <input type="text" placeholder="Search" [(ngModel)]="searchQuery" (input)="onSearch()">
                <i class="fas fa-search"></i>
              </div>
              <div class="sort-box">
                <label>Sort by:</label>
                <select [(ngModel)]="sortBy" (change)="onSort()">
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>
          </div>

          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Users Name</th>
                  <th class="hide-mobile">Phone Number</th>
                  <th class="hide-mobile">City</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let buyer of filteredBuyers">
                  <td>
                    <div class="user-info">
                      <span>{{buyer.userName}}</span>
                      <!-- Show phone number only on mobile -->
                      <span class="mobile-only phone-number">{{buyer.phoneNumber}}</span>
                    </div>
                  </td>
                  <td class="hide-mobile">{{buyer.phoneNumber}}</td>
                  <td class="hide-mobile">{{buyer.city}}</td>
                  <td>
                    <button 
                      class="status-toggle" 
                      [class.interested]="buyer.isInterested"
                      [class.not-interested]="!buyer.isInterested"
                      (click)="toggleStatus(buyer)">
                      {{buyer.isInterested ? 'Interested' : 'Not Interested'}}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="pagination">
            <span>Showing data 1 to 5 of 256K entries</span>
            <div class="page-controls">
              <button><i class="fas fa-chevron-left"></i></button>
              <button class="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button>...</button>
              <button>40</button>
              <button><i class="fas fa-chevron-right"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .buyers-page {
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

    .buyers-section {
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

    .title-section h2 {
      margin: 0;
      font-size: 1.25rem;
      color: #333;
    }

    .subtitle {
      color: #666;
      font-size: 0.9rem;
    }

    .actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .add-btn {
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

    .search-box {
      position: relative;
    }

    .search-box input {
      padding: 0.5rem 2rem 0.5rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 200px;
    }

    .search-box i {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }

    .sort-box {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .sort-box select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
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

    .status-toggle {
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .status-toggle.interested {
      background: #e3f2fd;
      color: #0056b3;
    }

    .status-toggle.not-interested {
      background: #ffebee;
      color: #dc3545;
    }

    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }

    .page-controls {
      display: flex;
      gap: 0.5rem;
    }

    .page-controls button {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      border-radius: 4px;
    }

    .page-controls button.active {
      background: #0056b3;
      color: white;
      border-color: #0056b3;
    }

    @media screen and (max-width: 1024px) {
      .main-content {
        margin-left: 10px;
      }
    }

    @media screen and (max-width: 768px) {
      .buyers-page {
        flex-direction: column;
      }

      .main-content {
        padding: 1rem;
      }

      .section-header {
        flex-direction: column;
        gap: 1rem;
      }

      .actions {
        flex-direction: column;
        width: 100%;
      }

      .add-btn, .search-box, .sort-box {
        width: 100%;
      }

      .search-box input {
        width: 100%;
      }

      .pagination {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .page-controls {
        flex-wrap: wrap;
        justify-content: center;
      }

      .hide-mobile {
        display: none;
      }

      .mobile-only {
        display: block;
        font-size: 0.85rem;
        color: #666;
        margin-top: 0.25rem;
      }

      .user-info {
        display: flex;
        flex-direction: column;
      }

      td {
        padding: 0.75rem;
      }

      .status-toggle {
        padding: 0.5rem 0.75rem;
        font-size: 0.85rem;
      }
    }

    .hide-mobile {
      display: table-cell;
    }

    .mobile-only {
      display: none;
    }
  `]
})
export class InterestedBuyersComponent implements OnInit {
  projectName: string = '';
  plotNumber: string = '';
  searchQuery: string = '';
  sortBy: string = 'newest';
  buyers: Buyer[] = [
    { id: 1, userName: 'Jane Cooper', phoneNumber: '(225) 555-0118', city: 'Tumkur', isInterested: true },
    { id: 2, userName: 'Floyd Miles', phoneNumber: '(205) 555-0100', city: 'Bengaluru', isInterested: false },
    { id: 3, userName: 'Ronald Richards', phoneNumber: '(302) 555-0107', city: 'Tumkur', isInterested: false },
    { id: 4, userName: 'Marvin McKinney', phoneNumber: '(252) 555-0126', city: 'Tumkur', isInterested: true },
    { id: 5, userName: 'Jerome Bell', phoneNumber: '(629) 555-0129', city: 'Mysuru', isInterested: true }
  ];
  filteredBuyers: Buyer[] = [];

  constructor(
    private route: ActivatedRoute,
    private plotService: PlotService
  ) {}

  ngOnInit() {
    const plotDetails = this.plotService.getPlotDetails();
    this.projectName = plotDetails.projectName;
    this.plotNumber = plotDetails.plotId;
    this.filteredBuyers = [...this.buyers];
  }

  toggleStatus(buyer: Buyer) {
    buyer.isInterested = !buyer.isInterested;
    // Here you would typically call a service to update the status
    // this.buyerService.updateStatus(buyer.id, buyer.isInterested);
  }

  addBuyer() {
    // Implement add buyer functionality
  }

  onSearch() {
    this.filteredBuyers = this.buyers.filter(buyer => 
      buyer.userName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      buyer.city.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      buyer.phoneNumber.includes(this.searchQuery)
    );
  }

  onSort() {
    // Implement sort functionality
  }
}
