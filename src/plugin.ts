import {
  CapacitorOnesignalPlugin as ICapacitorOnesignalPlugin,
  LaunchOptions,
  LogLevel,
} from './definitions';
import { Plugins } from '@capacitor/core';

const CapacitorOnesignalPlugin =
  Plugins.CapacitorOnesignal as ICapacitorOnesignalPlugin;

export class OneSignal {
  private onesignal = CapacitorOnesignalPlugin;

  setLogLevel(logLevel: LogLevel, visualLevel: LogLevel = LogLevel.NONE) {
    return this.onesignal.setLogLevel({ logLevel, visualLevel });
  }
  init(appId: string, launchOptions: LaunchOptions = {}) {
    return this.onesignal.initOneSignal({ appId, launchOptions });
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
    this.onesignal.disablePush({ disabled });
  }
  setExternalUserId(externalUserId: string) {
    this.onesignal.setExternalUserId({ externalUserId });
  }
  removeExternalUserId() {
    return this.onesignal.removeExternalUserId();
  }

  setLaunchURLsInApp(enabled: boolean) {
    return this.onesignal.setLaunchURLsInApp({ enabled });
  }
}
