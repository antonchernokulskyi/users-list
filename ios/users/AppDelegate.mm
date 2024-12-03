#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

#import "RNBootSplash.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"users";

  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (UIView *)createRootViewWithBridge:(RCTBridge *)bridge moduleName:(NSString *)moduleName initProps:(NSDictionary *)initProps {
  UIView *rootView = [super createRootViewWithBridge:bridge moduleName:moduleName initProps:initProps];

  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView];

  return rootView;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  #if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
  #else
     return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif  
}

@end
