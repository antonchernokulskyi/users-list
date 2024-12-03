import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { RootNavigator } from 'navigation';
import { UnistylesRegistry } from 'react-native-unistyles';
import { DefaultTheme, breakpoints } from 'themes';
import {
  MD3LightTheme,
  PaperProvider,
  configureFonts,
} from 'react-native-paper';

UnistylesRegistry.addBreakpoints(breakpoints).addThemes({
  defaultTheme: DefaultTheme,
});

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
});

const fontConfig = {
  fontFamily: 'GoogleSans-Regular',
};

const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
};

export const Application: React.FC = () => (
  <GestureHandlerRootView style={styles.layout}>
    <KeyboardProvider>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <RootNavigator />
        </PaperProvider>
      </SafeAreaProvider>
    </KeyboardProvider>
  </GestureHandlerRootView>
);
