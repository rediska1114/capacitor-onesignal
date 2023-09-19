import { PluginListenerHandle } from '@capacitor/core';

export interface OneSignalPlugin {
  setLogLevel(options: {
    logLevel: LogLevel;
    visualLevel: LogLevel;
  }): Promise<void>;
  initOneSignal(options: { appId: string }): Promise<void>;
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
  addListener(
    eventName: 'notificationOpened',
    listenerFunc: NotificationOpenedListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'onPermissionChanged',
    listenerFunc: PermissionChangedListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
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

export type NotificationOpenedListener = (
  result: NotificationOpenedResult,
) => void;

export type PermissionChangedListener = (
  result: PermissionChangedResult,
) => void;

export type NotificationOpenedResult = {
  action: {
    actionID: string;
    OSNotificationActionType: NotificationAction;
  };
  notification: {
    additionalData: object;
    notificationId: number;
    body: string;
    subtitle: string;
    title: string;
    launchURL: string;
    attachments: object;
    actionButtons: Array<any>;
    templateId: string;
    rawPayload: object;
    category: string;
    threadId: string;
    contentAvailable: boolean;
    mutableContent: boolean;
    badge: number;
    badgeIncrement: number;
  };
};

export type PermissionState = {
  reachable: boolean;
  hasPrompted: boolean;
  providesAppNotificationSettings: boolean;
  status: PermissionStatus;
};

export type PermissionChangedResult = {
  to: PermissionState;
  from: PermissionState;
};

export enum NotificationAction {
  Opened = 0,
  ActionTaken = 1,
}
