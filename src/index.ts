import { registerPlugin } from '@capacitor/core';

import { LogLevel, OneSignalPlugin } from './definitions';

const CapacitorOneSignal = registerPlugin<OneSignalPlugin>('OneSignal', {
  // web: () => import('./web').then(m => new m.OneSignalWeb()),
});

export class OneSignal {
  private onesignal = CapacitorOneSignal;

  addListener = this.onesignal.addListener;

  setLogLevel(logLevel: LogLevel, visualLevel: LogLevel = LogLevel.NONE) {
    return this.onesignal.setLogLevel({ logLevel, visualLevel });
  }
  init(appId: string) {
    return this.onesignal.initOneSignal({ appId });
  }
  setProvidesNotificationSettingsView(providesView: boolean) {
    return this.onesignal.setProvidesNotificationSettingsView({ providesView });
  }
  getDeviceState() {
    return this.onesignal.getDeviceState().then(d => d.deviceState);
  }
  setLanguage(language: string) {
    return this.onesignal.setLanguage({ language });
  }
  promptForPushNotifications() {
    return this.onesignal.promptForPushNotifications().then(a => a.accepted);
  }
  register() {
    return this.onesignal.register().then(a => a.accepted);
  }
  disablePush(disabled: boolean) {
    return this.onesignal.disablePush({ disabled });
  }
  setExternalUserId(externalUserId: string) {
    return this.onesignal.setExternalUserId({ externalUserId });
  }
  removeExternalUserId() {
    return this.onesignal.removeExternalUserId();
  }

  setLaunchURLsInApp(enabled: boolean) {
    return this.onesignal.setLaunchURLsInApp({ enabled });
  }
}

export * from './definitions';
