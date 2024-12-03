import React from 'react';
import {
  KeyboardAvoidingViewProps as BaseProps,
  StyleSheet,
} from 'react-native';
import { KeyboardAvoidingView as KeyboardAvoidingComponent } from 'react-native-keyboard-controller';

interface KeyboardAvoidingViewProps extends BaseProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({
  behavior = 'padding',
  children,
  ...rest
}) => {
  return (
    <KeyboardAvoidingComponent
      behavior={behavior}
      style={styles.container}
      contentContainerStyle={styles.container}
      {...rest}>
      {children}
    </KeyboardAvoidingComponent>
  );
};
