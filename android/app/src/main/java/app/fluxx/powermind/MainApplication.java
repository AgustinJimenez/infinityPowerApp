package app.fluxx.powermind;

import android.app.Application;
import android.content.Context;
import androidx.multidex.MultiDex;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import com.github.wuxudong.rncharts.MPAndroidChartPackage;
import io.expo.appearance.RNCAppearancePackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativecommunity.rctaudiotoolkit.AudioPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.venepe.RNMusicMetadata.RNMusicMetadataPackage;


import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
          new ReactNativeHost(this) {
            @Override
            public boolean getUseDeveloperSupport() {
              return BuildConfig.DEBUG;
            }

            @Override
            protected List<ReactPackage> getPackages() {
              @SuppressWarnings("UnnecessaryLocalVariable")
              List<ReactPackage> packages = new PackageList(this).getPackages();
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // packages.add(new MyReactNativePackage());
                packages.add(new RNFirebaseMessagingPackage());
                packages.add(new RNFirebaseNotificationsPackage());
                // packages.add(new AudioPackage());
                packages.add(new MPAndroidChartPackage());
                // packages.add(new RNMusicMetadataPackage());
                packages.add(new ReactSliderPackage());
              return packages;
            }

            @Override
            protected String getJSMainModuleName() {
              return "index";
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
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
