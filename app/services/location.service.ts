import { Geolocation } from '@nativescript/geolocation';
import { CoreTypes } from '@nativescript/core';

export class LocationService {
  async getCurrentLocation() {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) {
      throw new Error('Location permission denied');
    }

    const location = await Geolocation.getCurrentLocation({
      desiredAccuracy: CoreTypes.Accuracy.high,
      maximumAge: 5000,
      timeout: 10000
    });

    return {
      latitude: location.latitude,
      longitude: location.longitude
    };
  }

  private async requestPermissions(): Promise<boolean> {
    const hasPermission = await Geolocation.hasPermission();
    if (hasPermission) {
      return true;
    }
    return await Geolocation.requestPermission();
  }
}