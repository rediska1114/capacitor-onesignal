import Capacitor
import Foundation
import OneSignal
import UserNotifications

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapacitorOnesignal)
public class CapacitorOnesignal: CAPPlugin {
    @objc func setLogLevel(_ call: CAPPluginCall) {
        guard let _logLevel = call.getString("logLevel") else {
            return call.reject("Missing logLevel argument")
        }
        guard let _visualLevel = call.getString("visualLevel") else {
            return call.reject("Missing visualLevel argument")
        }

        OneSignal.setLogLevel(getLogLevel(_logLevel), visualLevel: getLogLevel(_visualLevel))

        call.success()
    }

    @objc func initOneSignal(_ call: CAPPluginCall) {
        guard let appId = call.getString("appId") else {
            return call.reject("Missing appId argument")
        }

        guard let launchOptions = call.getObject("launchOptions") else {
            return call.reject("Missing launchOptions argument")
        }

        OneSignal.setMSDKType("capacitor")
        OneSignal.setAppId(appId)
        OneSignal.initWithLaunchOptions(launchOptions)

        call.success()
    }

    @objc func setProvidesNotificationSettingsView(_ call: CAPPluginCall) {
        guard let providesView = call.getBool("providesView") else {
            return call.reject("Missing providesView argument")
        }

        OneSignal.setProvidesNotificationSettingsView(providesView)

        call.success()
    }

//     - (void)setNotificationWillShowInForegroundHandler:(CDVInvokedUrlCommand*)command {
//     notificationWillShowInForegoundCallbackId = command.callbackId;

//     [OneSignal setNotificationWillShowInForegroundHandler:^(OSNotification *notification, OSNotificationDisplayResponse completion) {
//         self.receivedNotificationCache[notification.notificationId] = notification;
//         self.notificationCompletionCache[notification.notificationId] = completion;
//         processNotificationWillShowInForeground(notification);
//     }];
    // }

    // - (void)setNotificationOpenedHandler:(CDVInvokedUrlCommand*)command {
//     notificationOpenedCallbackId = command.callbackId;

//     [OneSignal setNotificationOpenedHandler:^(OSNotificationOpenedResult * _Nonnull result) {
//         actionNotification = result;
//         if (pluginCommandDelegate)
//             processNotificationOpened(actionNotification);
//     }];
    // }

    @objc func getDeviceState(_ call: CAPPluginCall) {
        let deviceState = OneSignal.getDeviceState()

        call.success(["deviceState": deviceState as Any]) // TODO: json convert
    }

    @objc func setLanguage(_ call: CAPPluginCall) {
        guard let language = call.getString("language") else {
            return call.reject("Missing language argument")
        }

        OneSignal.setLanguage(language)

        call.success()
    }

    // TODO: getTags

    // TODO: sendTags

    // TODO: deleteTags

    @objc func promptForPushNotifications(_ call: CAPPluginCall) {
        OneSignal.promptForPushNotifications(userResponse: {
            accepted in
            call.success(["accepted": accepted])
        })
    }

    @objc func register(_ call: CAPPluginCall) {
        OneSignal.register {
            accepted in
            call.success(["accepted": accepted])
        }
    }

    @objc func disablePush(_ call: CAPPluginCall) {
        guard let disabled = call.getBool("disabled") else {
            return call.reject("Missing disabled argument")
        }

        OneSignal.disablePush(disabled)
        call.success()
    }

    @objc func setExternalUserId(_ call: CAPPluginCall) {
        guard let externalUserId = call.getString("externalUserId") else {
            return call.reject("Missing externalUserId argument")
        }

        OneSignal.setExternalUserId(externalUserId) {
            _ in
            call.success()
        }
    }

    @objc func removeExternalUserId(_ call: CAPPluginCall) {
        OneSignal.removeExternalUserId {
            _ in
            call.success()
        }
    }

    @objc func getLogLevel(_ level: String) -> ONE_S_LOG_LEVEL {
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
}
