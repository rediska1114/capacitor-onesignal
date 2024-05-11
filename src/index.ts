import { registerPlugin } from '@capacitor/core';

import { LogLevel, OneSignalPlugin } from './definitions';

const CapacitorOneSignal = registerPlugin<OneSignalPlugin>('OneSignal', {
  // web: () => import('./web').then(m => new m.OneSignalWeb()),
});

const LIB_VERSION = import.meta.env.PUBLIC_VERSION;

export class OneSignal {
  private onesignal = CapacitorOneSignal;

  private resolveActivation: ((value: void) => void) | null = null;
  private activatingPromise: Promise<void> | null = new Promise(
    resolve => (this.resolveActivation = resolve),
  );

  private async awaitActivation() {
    if (this.activatingPromise) {
      await this.activatingPromise;
      this.activatingPromise = null;
    }
  }

  async init(appId: string) {
    // transform 5.1.3 to 050103
    const libVersion = LIB_VERSION.split('.')
      .map(v => v.padStart(2, '0'))
      .join('');

    const promise = this.onesignal.initOneSignal({
      appId,
      libVersion,
    });

    if (!this.activatingPromise) {
      this.activatingPromise = promise;
    }

    const result = await promise;

    if (this.resolveActivation) {
      this.resolveActivation();
      this.resolveActivation = null;
    }

    return result;
  }
  async setLogLevel(logLevel: LogLevel) {
    return this.onesignal.setLogLevel({ logLevel });
  }
  async setProvidesNotificationSettingsView(providesView: boolean) {
    return this.onesignal.setProvidesNotificationSettingsView({ providesView });
  }
  async getNotificationPermissionStatus() {
    await this.awaitActivation();
    return this.onesignal.getNotificationPermissionStatus().then(d => d.status);
  }
  async setLanguage(language: string) {
    await this.awaitActivation();

    return this.onesignal.setLanguage({ language });
  }
  async requestNotificationsPermission() {
    await this.awaitActivation();

    return this.onesignal
      .requestNotificationsPermission()
      .then(a => a.accepted);
  }
  async login(externalUserId: string) {
    await this.awaitActivation();

    return this.onesignal.login({ externalUserId });
  }
  async logout() {
    await this.awaitActivation();

    return this.onesignal.logout();
  }

  addListener = this.onesignal.addListener;
}

export * from './definitions';
