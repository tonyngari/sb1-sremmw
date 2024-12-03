import { Geolocation, GeolocationMonitor } from '@nativescript/geolocation';
import { Camera } from '@nativescript/camera';

export async function initializeServices(): Promise<void> {
  try {
    // Initialize location service
    const locationEnabled = await Geolocation.isEnabled();
    if (!locationEnabled) {
      await Geolocation.enableLocationRequest();
    }

    // Initialize camera service
    await Camera.requestPermissions();
    
    console.log('Services initialized successfully');
  } catch (error) {
    console.error('Error initializing services:', error);
    throw error;
  }
}