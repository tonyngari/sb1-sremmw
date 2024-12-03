import { NavigatedData, Page } from '@nativescript/core';
import { NewComplaintViewModel } from './new-complaint-view-model';

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  page.bindingContext = new NewComplaintViewModel();
}