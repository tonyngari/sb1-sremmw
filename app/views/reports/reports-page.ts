import { NavigatedData, Page } from '@nativescript/core';
import { ReportsViewModel } from './reports-view-model';

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  page.bindingContext = new ReportsViewModel();
}