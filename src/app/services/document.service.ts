import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'api/documents'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getDocuments(plotId: string): Observable<any[]> {
    // This will be replaced with actual API call
    return of([
      { fileName: 'Allotment Letter', fileSize: '28.50 KB', date: '16/11/2022', type: 'pdf' },
      { fileName: 'Khata Certificate', fileSize: '28.50 KB', date: '16/11/2022', type: 'pdf' },
      // ... other documents
    ]);
  }

  uploadDocument(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.apiUrl + '/upload', formData);
  }

  deleteDocument(docId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${docId}`);
  }
} 