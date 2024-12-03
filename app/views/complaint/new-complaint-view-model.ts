import { Observable } from '@nativescript/core';
import { CameraService } from '../../services/camera.service';
import { LocationService } from '../../services/location.service';
import { NotificationService } from '../../services/notification.service';
import { StorageService } from '../../services/storage.service';
import { Complaint } from '../../models/complaint.model';
import { showError, showSuccess } from '../../utils/alert.util';
import { validateComplaint } from '../../utils/validation.util';

export class NewComplaintViewModel extends Observable {
  private cameraService: CameraService;
  private locationService: LocationService;
  private notificationService: NotificationService;
  private storageService: StorageService;

  title: string = '';
  description: string = '';
  categories = ['WATER', 'SEWAGE', 'ROAD', 'STREETLIGHT'];
  selectedCategoryIndex: number = 0;
  imageAsset: any = null;
  location: { latitude: number; longitude: number } | null = null;
  locationText: string = 'Location not set';
  isSubmitting: boolean = false;

  constructor() {
    super();
    this.cameraService = new CameraService();
    this.locationService = new LocationService();
    this.notificationService = new NotificationService();
    this.storageService = new StorageService();
  }

  async onTakePhoto() {
    try {
      const asset = await this.cameraService.takePicture();
      this.set('imageAsset', asset);
    } catch (error) {
      await showError('Failed to take photo. Please try again.');
      console.error('Error taking photo:', error);
    }
  }

  async onGetLocation() {
    try {
      const location = await this.locationService.getCurrentLocation();
      this.location = location;
      this.set('locationText', `Lat: ${location.latitude.toFixed(4)}, Long: ${location.longitude.toFixed(4)}`);
    } catch (error) {
      await showError('Failed to get location. Please try again.');
      console.error('Error getting location:', error);
    }
  }

  async onSubmit() {
    if (this.isSubmitting) return;

    try {
      this.set('isSubmitting', true);

      const complaintData = {
        title: this.title,
        description: this.description,
        category: this.categories[this.selectedCategoryIndex],
        location: this.location,
        imageAsset: this.imageAsset
      };

      const errors = validateComplaint(complaintData);
      if (errors.length > 0) {
        await showError(errors.join('\n'));
        return;
      }

      const complaint: Complaint = {
        title: this.title,
        description: this.description,
        category: this.categories[this.selectedCategoryIndex] as any,
        location: this.location,
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Store complaint locally
      const complaints = this.storageService.getItem<Complaint[]>('complaints') || [];
      complaints.push({ ...complaint, id: Date.now().toString() });
      this.storageService.setItem('complaints', complaints);

      // Schedule notification
      await this.notificationService.scheduleNotification(
        'Complaint Submitted',
        'Your complaint has been submitted successfully.'
      );

      await showSuccess('Complaint submitted successfully');
      this.resetForm();
    } catch (error) {
      await showError('Failed to submit complaint. Please try again.');
      console.error('Error submitting complaint:', error);
    } finally {
      this.set('isSubmitting', false);
    }
  }

  private resetForm() {
    this.set('title', '');
    this.set('description', '');
    this.set('selectedCategoryIndex', 0);
    this.set('imageAsset', null);
    this.set('location', null);
    this.set('locationText', 'Location not set');
  }
}