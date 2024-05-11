import { PluginListenerHandle } from '@capacitor/core';

export interface OneSignalPlugin {
  initOneSignal(options: { appId: string, libVersion?: string }): Promise<void>;
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
    notification: {
      notificationId: string;
      templateId: string | null;
      templateName: string | null;
      contentAvailable: boolean;
      mutableContent: boolean;

      category: string;
      badge: number;
      badgeIncrement: number;
      sound: string;
      title: string;
      subtitle: string;
      body: string;
      launchURL: string;
      additionalData: object;
      attachments: object;
      actionButtons: Array<any>;
      rawPayload: object;
      threadId: string;
      relevanceScore: number;
      interruptionLevel: string | null;
      collapseId: string;
    };
  };
};

export type PermissionChangedResult = {
  permission: boolean;
};
