package com.rediska1114.plugins.onesignal

import android.util.Log
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.onesignal.OneSignal
import com.onesignal.common.OneSignalWrapper
import com.onesignal.debug.LogLevel
import com.onesignal.notifications.INotification
import com.onesignal.notifications.INotificationClickEvent
import com.onesignal.notifications.INotificationClickListener
import com.onesignal.notifications.IPermissionObserver
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

@CapacitorPlugin(name = "OneSignal")
class OneSignalPlugin : Plugin(), IPermissionObserver {
  private var oneSignalInitDone = false

  private val clickListener =
      object : INotificationClickListener {
        override fun onClick(event: INotificationClickEvent) {
          val data = JSObject().apply { put("event", event.toJSObject()) }
          notifyListeners("notificationClicked", data, true)
        }
      }

  @PluginMethod
  fun initOneSignal(call: PluginCall) {
    val appId = call.getString("appId") ?: return call.reject("Must provide an appId")

    OneSignalWrapper.sdkType = "capacitor"

    if (call.hasOption("libVersion")) {
      val libVersion = call.getString("libVersion")
      OneSignalWrapper.sdkVersion = libVersion
    }

    if (oneSignalInitDone) {
      Log.e("OneSignal", "Already initialized the OneSignal Capacitor")
      return call.resolve()
    }

    // in some cases,  the activity can be null, so we can initialize with the context instead
    val context = bridge.activity ?: bridge.context.applicationContext

    OneSignal.initWithContext(context!!, appId)

    oneSignalInitDone = true

    setListeners()

    call.resolve()
  }

  private fun setListeners() {
    OneSignal.Notifications.addPermissionObserver(this)
    OneSignal.Notifications.addClickListener(clickListener)
  }

  private fun removeListeners() {
    OneSignal.Notifications.removePermissionObserver(this)
    OneSignal.Notifications.removeClickListener(clickListener)
  }

  override fun handleOnDestroy() {
    removeListeners()
    super.handleOnDestroy()
  }

  @PluginMethod
  fun setLogLevel(call: PluginCall) {
    val logLevel = call.getString("logLevel")
    if (logLevel == null) {
      call.reject("Missing logLevel argument")
      return
    }

    OneSignal.Debug.logLevel = getLogLevel(logLevel)
    call.resolve()
  }

  @PluginMethod
  fun setProvidesNotificationSettingsView(call: PluginCall) {
    //        val providesView = call.getBoolean("providesView")
    //        if (providesView == null) {
    //            call.reject("Missing providesView argument")
    //            return
    //        }
    //
    //        //providesView
    //        OneSignal
    Log.e("OneSignal", "setProvidesNotificationSettingsView not implemented")
    call.resolve()
  }

  @PluginMethod
  fun getNotificationPermissionStatus(call: PluginCall) {
    val status = OneSignal.Notifications.permission

    val data = JSObject().apply { put("status", getPermissionStatus(status)) }
    call.resolve(data)
  }

  @PluginMethod
  fun setLanguage(call: PluginCall) {
    val language = call.getString("language")
    if (language == null) {
      call.reject("Missing language argument")
      return
    }

    OneSignal.User.setLanguage(language)
    call.resolve()
  }

  @PluginMethod
  fun requestNotificationsPermission(call: PluginCall) {
    val fallbackToSettings = call.getBoolean("fallbackToSettings") ?: true

    CoroutineScope(Dispatchers.IO).launch {
      try {
        // Call the suspend function and wait for the result
        val accepted =
            OneSignal.Notifications.requestPermission(
                fallbackToSettings = fallbackToSettings)

        // Switch back to the main thread to send the result back to JavaScript
        withContext(Dispatchers.Main) {
          call.resolve(JSObject().apply { put("accepted", accepted) })
        }
      } catch (e: Exception) {
        // Handle any exceptions and send an error back to JavaScript
        withContext(Dispatchers.Main) { call.reject("Failed to request permission", e) }
      }
    }
  }

  @PluginMethod
  fun login(call: PluginCall) {
    val externalUserId = call.getString("externalUserId")
    if (externalUserId == null) {
      call.reject("Missing externalUserId argument")
      return
    }

    OneSignal.login(externalUserId)
    call.resolve()
  }

  @PluginMethod
  fun logout(call: PluginCall) {
    OneSignal.logout()
    call.resolve()
  }

  // TODO: getTags
  // TODO: sendTags
  // TODO: deleteTags

  override fun onNotificationPermissionChange(permission: Boolean) {
    val data = JSObject().apply { put("permission", getPermissionStatus(permission)) }
    notifyListeners("permissionChanged", data, true)
  }

  private fun getLogLevel(level: String): LogLevel {
    return when (level.uppercase()) {
      "FATAL" -> LogLevel.FATAL
      "ERROR" -> LogLevel.ERROR
      "WARN" -> LogLevel.WARN
      "INFO" -> LogLevel.INFO
      "DEBUG" -> LogLevel.DEBUG
      "VERBOSE" -> LogLevel.VERBOSE
      else -> LogLevel.NONE
    }
  }

  private fun getPermissionStatus(status: Boolean): Int {
    return if (status) AUTHORIZED else NOT_DETERMINED
  }

  companion object {
    private const val NOT_DETERMINED = 0
    private const val DENIED = 1
    private const val AUTHORIZED = 2
  }
}

private fun INotificationClickEvent.toJSObject(): JSObject? {
  val clickResult =
      JSObject().apply {
        put("actionId", result.actionId)
        put("url", result.url)
      }

  return JSObject().apply {
    put("notification", notification.toJSObject())
    put("result", clickResult)
  }
}

private fun INotification.toJSObject(): JSObject {
  val data =
      JSObject().apply {
        put("androidNotificationId", androidNotificationId)

        if (groupedNotifications != null) {
          put("groupKey", groupKey)
          put("groupMessage", groupMessage)
          put("groupedNotifications", groupedNotifications)
        }

        put("notificationId", notificationId)
        put("title", title)
        put("body", body)
        put("smallIcon", smallIcon)
        put("largeIcon", largeIcon)
        put("bigPicture", bigPicture)
        put("smallIconAccentColor", smallIconAccentColor)
        put("launchURL", launchURL)
        put("sound", sound)
        put("ledColor", ledColor)
        put("lockScreenVisibility", lockScreenVisibility)
        put("groupKey", groupKey)
        put("groupMessage", groupMessage)
        put("fromProjectNumber", fromProjectNumber)
        put("collapseId", collapseId)
        put("priority", priority)
        if (additionalData != null && additionalData!!.length() > 0) {
          put("additionalData", JSObject.fromJSONObject(additionalData))
        }
        put("actionButtons", actionButtons)
        put("rawPayload", rawPayload)
      }
  return data
}
