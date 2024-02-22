- Vamos a hacer algunos cambios a algunas librerías en `node_modules`. Reemplazar todo el contenido de los archivos indicados más abajo.

  - `node_modules/react-native-firebase/ios/RNFirebase/RNFirebaseUtil.h`

  ```
  #ifndef RNFirebaseUtil_h
  #define RNFirebaseUtil_h

  #import <Foundation/Foundation.h>
  #import <React/RCTEventEmitter.h>
  #import "Firebase.h"

  #ifdef DEBUG
  #define DLog(fmt, ...) NSLog((@"%s [Line %d] " fmt), __PRETTY_FUNCTION__, __LINE__, ##__VA_ARGS__);
  #else
  #define DLog(...)
  #endif

  @interface RNFirebaseUtil : NSObject

  + (NSString *)getISO8601String:(NSDate *)date;
  + (FIRApp *)getApp:(NSString *)appDisplayName;
  + (NSString *)getAppName:(NSString *)appDisplayName;
  + (NSString *)getAppDisplayName:(NSString *)appName;
  + (void)sendJSEvent:(RCTEventEmitter *)emitter name:(NSString *)name body:(id)body;
  + (void)sendJSEventWithAppName:(RCTEventEmitter *)emitter app:(FIRApp *)app name:(NSString *)name body:(id)body;

  @end

  #endif

  ```

  - `node_modules/react-native-music-metadata/RNMusicMetadata.podspec`

  ```
  require 'json'

  package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

  Pod::Spec.new do |s|
    s.name                = "RNMusicMetadata"
    s.version             = package['version']
    s.summary             = package['description']
    s.homepage            = "https://github.com/venepe/react-native-music-metadata"
    s.license             = package['license']
    s.author              = package['author']
    s.source              = { :git => package['repository']['url'], :tag => "v#{s.version}" }
    s.default_subspec     = 'Core'
    s.requires_arc        = true
    s.platform            = :ios, "7.0"

    s.dependency 'React-Core'

    s.subspec 'Core' do |ss|
      ss.source_files     = "RNMusicMetadata/*.{h,m}"
    end

  end
  ```

  - `node_modules/react-native-music-metadata/android/src/main/java/com/venepe/RNMusicMetadata/RNMusicMetadataPackage.java`

  ```
  package com.venepe.RNMusicMetadata;

  import com.facebook.react.ReactPackage;
  import com.facebook.react.bridge.JavaScriptModule;
  import com.facebook.react.bridge.NativeModule;
  import com.facebook.react.bridge.ReactApplicationContext;
  import com.facebook.react.uimanager.ViewManager;

  import java.util.ArrayList;
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.List;

  /**
  * Created by venepe on 5/06/17.
  */
  public class RNMusicMetadataPackage implements ReactPackage {

      @Override
      public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
          List<NativeModule> modules = new ArrayList<>();
          modules.add(new RNMusicMetadataModule(reactContext));
          return modules;
      }

      public List<Class<? extends JavaScriptModule>> createJSModules() {
          return Collections.emptyList();
      }

      @Override
      public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
          return Arrays.<ViewManager>asList();
      }

  }
  ```

  - `node_modules/react-native-track-player/react-native-track-player.podspec`

  ```
  require "json"

  package = JSON.parse(File.read(File.join(__dir__, "package.json")))

  Pod::Spec.new do |s|
    s.name         = package["name"]
    s.version      = package["version"]
    s.summary      = package['description']
    s.license      = package['license']

    s.author       = "David Chavez"
    s.homepage     = package['repository']['url']
    s.platform     = :ios, "10.0"

    s.source       = { :git => package['repository']['url'], :tag => "v#{s.version}" }
    s.source_files  = "ios/**/*.{h,m,swift}"
    s.exclude_files = ["ios/RNTrackPlayer/Vendor/AudioPlayer/Example"]

    s.dependency "React"
  end

  ```
