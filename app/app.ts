import { Application } from '@nativescript/core';
import { initializeServices } from './services/init.service';

initializeServices()
  .then(() => {
    Application.run({ moduleName: 'app-root' });
  })
  .catch(error => {
    console.error('Failed to initialize app:', error);
    // Show error dialog to user
    alert({
      title: 'Error',
      message: 'Failed to initialize app. Please restart.',
      okButtonText: 'OK'
    });
  });