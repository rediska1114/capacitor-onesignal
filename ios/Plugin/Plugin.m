#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(CapacitorOnesignal, "CapacitorOnesignal",
        CAP_PLUGIN_METHOD(setLogLevel, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(initOneSignal, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(setProvidesNotificationSettingsView, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(getDeviceState, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(setLanguage, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(promptForPushNotifications, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(register, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(disablePush, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(setExternalUserId, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(removeExternalUserId, CAPPluginReturnPromise);
)
