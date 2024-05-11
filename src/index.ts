import { registerPlugin } from '@capacitor/core';

import { LogLevel, OneSignalPlugin } from './definitions';

const CapacitorOneSignal = registerPlugin<OneSignalPlugin>('OneSignal', {
  // web: () => import('./web').then(m => new m.OneSignalWeb()),
});

export class OneSignal {
  private onesignal = CapacitorOneSignal;

  addListener = this.onesignal.addListener;

  init(appId: string) {
    return this.onesignal.initOneSignal({ appId });
  }
  setLogLevel(logLevel: LogLevel) {
    return this.onesignal.setLogLevel({ logLevel });
  }
  setProvidesNotificationSettingsView(providesView: boolean) {
    return this.onesignal.setProvidesNotificationSettingsView({ providesView });
  }
  getNotificationPermissionStatus() {
    return this.onesignal.getNotificationPermissionStatus().then(d => d.status);
  }
  setLanguage(language: string) {
    return this.onesignal.setLanguage({ language });
  }
  requestNotificationsPermission() {
    return this.onesignal
      .requestNotificationsPermission()
      .then(a => a.accepted);
  }
  login(externalUserId: string) {
    return this.onesignal.login({ externalUserId });
  }
  logout() {
    return this.onesignal.logout();
  }
}

export * from './definitions';
