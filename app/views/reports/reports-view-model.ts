import { Observable } from '@nativescript/core';
import { Complaint } from '../../models/complaint.model';
import { StorageService } from '../../services/storage.service';
import { getRelativeTime } from '../../utils/date.util';

export class ReportsViewModel extends Observable {
  private storageService: StorageService;
  private _reports: Complaint[] = [];
  private _isLoading: boolean = false;

  constructor() {
    super();
    this.storageService = new StorageService();
    this.loadReports();
  }

  get reports(): (Complaint & { relativeTime: string })[] {
    return this._reports.map(report => ({
      ...report,
      relativeTime: getRelativeTime(new Date(report.createdAt)),
      statusClass: this.getStatusClass(report.status)
    }));
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  private async loadReports() {
    try {
      this.set('isLoading', true);
      const reports = this.storageService.getItem<Complaint[]>('complaints') || [];
      this._reports = reports.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      this.notifyPropertyChange('reports', this.reports);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      this.set('isLoading', false);
    }
  }

  private getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'text-warning';
      case 'IN_PROGRESS': return 'text-info';
      case 'RESOLVED': return 'text-success';
      default: return '';
    }
  }
}