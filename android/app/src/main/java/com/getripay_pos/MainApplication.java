package com.getripay_pos;

import android.app.Application;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.os.RemoteException;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import com.morefun.yapi.engine.DeviceServiceEngine;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    private final String TAG = "MainApplication";
    private final String SERVICE_ACTION = "com.morefun.ysdk.service";
    private final String SERVICE_PACKAGE = "com.morefun.ysdk";
    private DeviceServiceEngine deviceServiceEngine;

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          packages.add(new MorefunReactNativePackage());
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    bindDeviceService();
  }

  public DeviceServiceEngine getDeviceService() {
      return  deviceServiceEngine;
  }

    public void bindDeviceService() {
        if (null != deviceServiceEngine) {
            return;
        }

        Intent intent = new Intent();
        intent.setAction(SERVICE_ACTION);
        intent.setPackage(SERVICE_PACKAGE);

        bindService(intent, connection, Context.BIND_AUTO_CREATE);
    }

    private ServiceConnection connection = new ServiceConnection() {

        @Override
        public void onServiceDisconnected(ComponentName name) {
            deviceServiceEngine = null;
            Log.e(TAG, "======onServiceDisconnected======");
        }

        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            deviceServiceEngine = DeviceServiceEngine.Stub.asInterface(service);
            Log.d(TAG, "======onServiceConnected======");

            try {
                DeviceHelper.reset();
                DeviceHelper.initDevices(MainApplication.this);
            } catch (RemoteException e) {
                e.printStackTrace();
            }

            linkToDeath(service);
        }

        private void linkToDeath(IBinder service) {
            try {
                service.linkToDeath(new IBinder.DeathRecipient() {
                    @Override
                    public void binderDied() {
                        Log.d(TAG, "======binderDied======");
                        deviceServiceEngine = null;
                        bindDeviceService();
                    }
                }, 0);
            } catch (RemoteException e) {
                e.printStackTrace();
            }
        }
    };
}
