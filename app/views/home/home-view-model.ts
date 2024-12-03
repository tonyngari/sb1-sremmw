import { Observable, ImageSource, Frame } from '@nativescript/core';
import { logoBase64 } from '../../assets/images/logo';

export class HomeViewModel extends Observable {
  private _logoSource: ImageSource;

  constructor() {
    super();
    this._logoSource = ImageSource.fromBase64(logoBase64);
    this.set('logoSource', this._logoSource);
  }

  onReportIncident() {
    Frame.topmost().navigate({
      moduleName: 'views/complaint/new-complaint-page',
      transition: {
        name: 'slide'
      }
    });
  }

  onViewReports() {
    Frame.topmost().navigate({
      moduleName: 'views/reports/reports-page',
      transition: {
        name: 'slide'
      }
    });
  }

  onCommunityUpdates() {
    Frame.topmost().navigate({
      moduleName: 'views/updates/updates-page',
      transition: {
        name: 'slide'
      }
    });
  }
}