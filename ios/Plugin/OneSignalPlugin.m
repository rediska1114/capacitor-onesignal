#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(OneSignalPlugin, "OneSignal",
        CAP_PLUGIN_METHOD(initOneSignal, CAPPluginReturnPromise);
         CAP_PLUGIN_METHOD(setLogLevel, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(setProvidesNotificationSettingsView, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(getNotificationPermissionStatus, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(setLanguage, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(requestNotificationsPermission, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(login, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(logout, CAPPluginReturnPromise);
)
