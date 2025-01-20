import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'api/documents'; // Replace with your actual API endpoint
  private documents: any[] = [];

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<any[]> {
    if (this.documents.length === 0) {
      this.documents = [
        { id: '1', fileName: 'Allotment Letter', fileSize: '28.50 KB', date: '16/11/2022', type: 'pdf', url: 'assets/documents/allotment-letter.pdf' },
        { id: '2', fileName: 'Khata Certificate', fileSize: '28.50 KB', date: '16/11/2022', type: 'pdf', url: 'assets/documents/khata-certificate.pdf' },
        { fileName: 'Sale Deed', fileSize: '28.50 KB', date: '16/11/2022', type: 'pdf' },
        { fileName: 'Property Tax Receipts', fileSize: '28.50 KB', date: '16/11/2022', type: 'pdf' },
        { fileName: 'NOC', fileSize: '28.50 KB', date: '16/11/2022', type: 'pdf' },
        { fileName: 'Payment Receipts', fileSize: '28.50 KB', date: '16/11/2022', type: 'pdf' }
      ];
    }
    return of(this.documents);
  }

  uploadDocument(file: File, type: string): Observable<boolean> {
    const newDoc = {
      id: Date.now().toString(),
      fileName: type,
      fileSize: `${(file.size / 1024).toFixed(2)} KB`,
      date: new Date().toLocaleDateString('en-GB'),
      type: file.type,
      url: URL.createObjectURL(file) // Create temporary URL for the file
    };
    
    this.documents.push(newDoc);
    return of(true).pipe(delay(1000)); // Simulate network delay
  }

  deleteDocument(docId: string): Observable<boolean> {
    const index = this.documents.findIndex(doc => doc.id === docId);
    if (index !== -1) {
      this.documents.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false);
  }

  viewDocument(doc: any) {
    // Open document in new tab
    window.open(doc.url, '_blank');
  }
} 