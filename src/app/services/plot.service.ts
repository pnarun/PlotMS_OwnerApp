import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface PlotDetails {
  projectName: string;
  plotId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlotService {
  private readonly STORAGE_KEY = 'currentPlotDetails';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setPlotDetails(details: PlotDetails) {
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(details));
    }
  }

  getPlotDetails(): PlotDetails {
    if (this.isBrowser) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return { projectName: '', plotId: '' };
  }

  clearPlotDetails() {
    if (this.isBrowser) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
} 