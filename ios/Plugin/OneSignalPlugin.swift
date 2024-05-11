import Capacitor
import Foundation
import OneSignalFramework
import UserNotifications

/// Please read the Capacitor iOS Plugin Development Guide
/// here: https://capacitorjs.com/docs/plugins/ios
@objc(OneSignalPlugin)
public class OneSignalPlugin: CAPPlugin, OSNotificationPermissionObserver,
  OSNotificationClickListener
{
  var didInitialize = false

  @objc func initOneSignal(_ call: CAPPluginCall) {
    if didInitialize {
      return call.resolve()
    }

    guard let appId = call.getString("appId") else {
      return call.reject("Missing appId argument")
    }

    OneSignalWrapper.sdkType = "capacitor"

    OneSignal.Notifications.addPermissionObserver(self as OSNotificationPermissionObserver)
    OneSignal.Notifications.addClickListener(self)

    OneSignal.initialize(appId, withLaunchOptions: nil)

    didInitialize = true

    call.resolve()
  }

  @objc func setLogLevel(_ call: CAPPluginCall) {
    guard let _logLevel = call.getString("logLevel") else {
      return call.reject("Missing logLevel argument")
    }
    guard let _visualLevel = call.getString("visualLevel") else {
      return call.reject("Missing visualLevel argument")
    }

    OneSignal.Debug.setLogLevel(getLogLevel(_logLevel))

    call.resolve()
  }

  @objc func setProvidesNotificationSettingsView(_ call: CAPPluginCall) {
    guard let providesView = call.getBool("providesView") else {
      return call.reject("Missing providesView argument")
    }

    OneSignal.setProvidesNotificationSettingsView(providesView)

    call.resolve()
  }

  @objc func getNotificationPermissionStatus(_ call: CAPPluginCall) {
    // 0 = NotDetermined
    // 1 = Denied
    // 2 = Authorized
    // 3 = Provisional (only available in iOS 12+)
    // 4 = Ephemeral (only available in iOS 14+)
    let status = OneSignal.Notifications.permissionNative

    call.resolve(["status": status.rawValue])
  }

  @objc func setLanguage(_ call: CAPPluginCall) {
    guard let language = call.getString("language") else {
      return call.reject("Missing language argument")
    }

    OneSignal.User.setLanguage(language)

    call.resolve()
  }

  @objc func requestNotificationsPermission(_ call: CAPPluginCall) {
    OneSignal.Notifications.requestPermission(
      { accepted in
        call.resolve(["accepted": accepted])
      }, fallbackToSettings: true)

  }

  @objc func login(_ call: CAPPluginCall) {
    guard let externalUserId = call.getString("externalUserId") else {
      return call.reject("Missing externalUserId argument")
    }

    OneSignal.login(externalUserId)
    call.resolve()

  }

  @objc func logout(_ call: CAPPluginCall) {
    OneSignal.logout()

    call.resolve()
  }

  // TODO: getTags
  // TODO: sendTags
  // TODO: deleteTags

    public func onClick(event: OSNotificationClickEvent) {
    notifyListeners(
      "notificationClicked", data: ["event": event.jsonRepresentation()], retainUntilConsumed: true)
  }

  public func onNotificationPermissionDidChange(_ permission: Bool) {
    notifyListeners("permissionChanged", data: ["permission": permission], retainUntilConsumed: true)
  }
}

func getLogLevel(_ level: String) -> ONE_S_LOG_LEVEL {
  if level == "FATAL" {
    return ONE_S_LOG_LEVEL.LL_FATAL
  } else if level == "ERROR" {
    return ONE_S_LOG_LEVEL.LL_ERROR
  } else if level == "WARN" {
    return ONE_S_LOG_LEVEL.LL_WARN
  } else if level == "INFO" {
    return ONE_S_LOG_LEVEL.LL_INFO
  } else if level == "DEBUG" {
    return ONE_S_LOG_LEVEL.LL_DEBUG
  } else if level == "VERBOSE" {
    return ONE_S_LOG_LEVEL.LL_VERBOSE
  } else {
    return ONE_S_LOG_LEVEL.LL_NONE
  }
}
