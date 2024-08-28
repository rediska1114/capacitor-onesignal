import { PluginListenerHandle } from '@capacitor/core';

export interface OneSignalPlugin {
  initOneSignal(options: { appId: string; libVersion?: string }): Promise<void>;
  setLogLevel(options: { logLevel: LogLevel }): Promise<void>;
  setProvidesNotificationSettingsView(options: {
    providesView: boolean;
  }): Promise<void>;
  getNotificationPermissionStatus(): Promise<{ status: PermissionStatus }>;
  setLanguage(options: { language: string }): Promise<void>;
  requestNotificationsPermission(): Promise<{ accepted: boolean }>;
  login(options: { externalUserId: string }): Promise<void>;
  logout(): Promise<void>;
  addListener(
    eventName: 'notificationClicked',
    listenerFunc: NotificationClickedListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'permissionChanged',
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

export type NotificationClickedListener = (
  result: NotificationClickedResult,
) => void;

export type PermissionChangedListener = (
  result: PermissionChangedResult,
) => void;

export type NotificationClickedResult = {
  event: {
    result: {
      actionId: string;
      url: string;
    };
    notification: OSNotification;
  };
};

export type PermissionChangedResult = {
  permission: boolean;
};

export type OSNotification = {
  body: string;
  sound?: string;
  title?: string;
  launchURL?: string;
  rawPayload: object | string; // platform bridges return different types
  actionButtons?: object[];
  additionalData?: object;
  notificationId: string;
} & (OSNotificationAndroid | OSNotificationIOS);

export type OSNotificationAndroid = {
  groupKey?: string;
  groupMessage?: string;
  ledColor?: string;
  priority?: number;
  smallIcon?: string;
  largeIcon?: string;
  bigPicture?: string;
  collapseId?: string;
  fromProjectNumber?: string;
  smallIconAccentColor?: string;
  lockScreenVisibility?: string;
  androidNotificationId?: number;
};

export type OSNotificationIOS = {
  badge?: string;
  badgeIncrement?: string;
  category?: string;
  threadId?: string;
  subtitle?: string;
  templateId?: string;
  templateName?: string;
  attachments?: object;
  mutableContent?: boolean;
  contentAvailable?: string;
  relevanceScore?: number;
  interruptionLevel?: string;
};
