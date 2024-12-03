package com.users;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "users";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    RNBootSplash.init(this, R.style.BootTheme);

    super.onCreate(null);
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
      this,
      getMainComponentName(),
      DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }
}
