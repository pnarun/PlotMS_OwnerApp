import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule
  ],
  template: `
    <!-- Desktop View -->
    <div class="sidebar-container desktop-view">
      <div class="sidebar-box">
        <nav>
          <ul>
            <li *ngFor="let item of menuItems" 
                [class.active]="activeTab === item.id">
              <a (click)="navigateToRoute(item)">
                <i class="fas {{item.icon}}"></i>
                {{item.label}}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Mobile View -->
    <div class="mobile-view">
      <select [(ngModel)]="activeTab" (change)="onMobileMenuChange($event)" class="mobile-dropdown">
        <option *ngFor="let item of menuItems" [value]="item.id">
          {{item.label}}
        </option>
      </select>
    </div>
  `,
  styles: [`
    /* Desktop Styles */
    .mobile-view {
      display: none;
    }

    .sidebar-container {
      width: 220px;
      height: auto;
      position: fixed;
      top: 82px;
      left: 10px;
    }

    .sidebar-box {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    nav li {
      margin: 0;
      padding: 0;
    }

    nav a {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      color: #333;
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;
      gap: 0.75rem;
    }

    nav a:hover {
      background: #f5f5f5;
      color: #0056b3;
    }

    nav li.active a {
      background: #e3f2fd;
      color: #0056b3;
      border-left: 4px solid #0056b3;
    }

    i {
      width: 20px;
      text-align: center;
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .desktop-view {
        display: none;
      }

      .mobile-view {
        display: block;
        padding: 1rem;
        background: white;
        border-bottom: 1px solid #eee;
      }

      .mobile-dropdown {
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        background: white;
        color: #333;
        outline: none;
      }

      .mobile-dropdown:focus {
        border-color: #0056b3;
      }
    }

    @media (max-width: 480px) {
      nav ul {
        grid-template-columns: 1fr;
      }

      nav li {
        border-right: none;
      }

      nav li:nth-last-child(1) {
        border-bottom: none;
      }
    }
  `]
})
export class SideBarComponent implements OnInit {
  activeTab: string = 'documents';
  plotId: string = '';
  
  menuItems: MenuItem[] = [
    { id: 'documents', label: 'Documents', icon: 'fa-file-alt', route: 'documents' },
    { id: 'general', label: 'General Information', icon: 'fa-info-circle', route: 'general-info' },
    { id: 'buyers', label: 'Interested Buyers', icon: 'fa-users', route: 'interested-buyers' },
    { id: 'payments', label: 'Payments Made', icon: 'fa-money-bill-wave', route: 'payments' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get plotId from the current route
    this.route.params.subscribe(params => {
      if (params['plotId']) {
        this.plotId = params['plotId'];
      }
    });

    // Set active tab based on current route
    this.setActiveTabFromUrl(this.router.url);

    // Listen for route changes
    this.router.events.subscribe(() => {
      this.setActiveTabFromUrl(this.router.url);
    });
  }

  private setActiveTabFromUrl(url: string) {
    const menuItem = this.menuItems.find(item => url.includes(item.route));
    if (menuItem) {
      this.activeTab = menuItem.id;
    }
  }

  navigateToRoute(item: MenuItem) {
    this.activeTab = item.id;
    this.router.navigate([`/${item.route}`, this.plotId]);
  }

  onMobileMenuChange(event: any) {
    const selectedItem = this.menuItems.find(item => item.id === this.activeTab);
    if (selectedItem) {
      this.navigateToRoute(selectedItem);
    }
  }
}
