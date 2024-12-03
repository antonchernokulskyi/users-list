import React, { FC } from 'react';
import { ScrollViewProps } from 'react-native';
import { KeyboardAwareScrollView as KeyboardAwareScrollViewComponent } from 'react-native-keyboard-controller';
import { Colors } from 'themes';

interface KeyboardAwareScrollViewProps extends ScrollViewProps {
  bottomOffset?: number;
  enabled?: boolean;
  backgroundColor?: typeof Colors;
}

export const KeyboardAwareScrollView: FC<KeyboardAwareScrollViewProps> = ({
  children,
  showsVerticalScrollIndicator = false,
  alwaysBounceVertical = false,
  keyboardDismissMode = 'none',
  keyboardShouldPersistTaps = 'handled',
  bottomOffset = 70,
  ...rest
}) => {
  return (
    <KeyboardAwareScrollViewComponent
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      alwaysBounceVertical={alwaysBounceVertical}
      keyboardDismissMode={keyboardDismissMode}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      bottomOffset={bottomOffset}
      {...rest}>
      {children}
    </KeyboardAwareScrollViewComponent>
  );
};
