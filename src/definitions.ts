declare module '@capacitor/core' {
  interface PluginRegistry {
    CapacitorOnesignal: CapacitorOnesignalPlugin;
  }
}

export interface CapacitorOnesignalPlugin {
  setLogLevel(options: {
    logLevel: LogLevel;
    visualLevel: LogLevel;
  }): Promise<void>;
  initOneSignal(options: {
    appId: string;
    launchOptions: LaunchOptions;
  }): Promise<void>;
  setProvidesNotificationSettingsView(options: {
    providesView: boolean;
  }): Promise<void>;
  getDeviceState(): Promise<{ deviceState: DeviceState }>;
  setLanguage(options: { language: string }): Promise<void>;
  promptForPushNotifications(): Promise<{ accepted: boolean }>;
  register(): Promise<{ accepted: boolean }>;
  disablePush(options: { disabled: boolean }): Promise<void>;
  setExternalUserId(options: { externalUserId: string }): Promise<void>;
  removeExternalUserId(): Promise<void>;
  setLaunchURLsInApp(options: { enabled: boolean }): Promise<void>;
}

export enum LogLevel {
  FATAL = 'FATAL',
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  VERBOSE = 'VERBOSE',
  NONE = 'NONE',
}

export enum PermissionStatus {
  NotDetermined = 0,
  Denied = 1,
  Authorized = 2,
  Provisional = 3,
  Ephemeral = 4,
}

export type DeviceState = {
  userId: string;
  emailUserId: string;
  smsUserId: string;
  emailAddress: string;
  smsNumber: string;
  pushToken: string;
  hasNotificationPermission: boolean;
  isSubscribed: boolean;
  isPushDisabled: boolean;
  isEmailSubscribed: boolean;
  isSMSSubscribed: boolean;
  notificationPermissionStatus: PermissionStatus;
};

export type LaunchOptions = object; // TODO typing
