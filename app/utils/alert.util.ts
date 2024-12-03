import { alert, AlertOptions } from '@nativescript/core';

export async function showAlert(options: AlertOptions): Promise<void> {
  return alert(options);
}

export async function showError(message: string): Promise<void> {
  return alert({
    title: 'Error',
    message,
    okButtonText: 'OK'
  });
}

export async function showSuccess(message: string): Promise<void> {
  return alert({
    title: 'Success',
    message,
    okButtonText: 'OK'
  });
}