import { Camera, CameraOptions, ImageAsset } from '@nativescript/camera';

export class CameraService {
  async takePicture(): Promise<ImageAsset> {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) {
      throw new Error('Camera permission denied');
    }

    const options: CameraOptions = {
      width: 1024,
      height: 1024,
      keepAspectRatio: true,
      saveToGallery: false
    };

    return await Camera.takePicture(options);
  }

  private async requestPermissions(): Promise<boolean> {
    const hasPermission = await Camera.requestPermissions();
    return hasPermission;
  }
}