import React, { forwardRef } from 'react';
import { TouchableOpacity as BaseTouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { TouchableOpacityProps, ViewStyleWithColors } from '../types';
import { separateProps, transformComponentStyle } from '../helpers';
import { CommonStyleSchema } from '../helpers/style-schema';

const stylesheet = createStyleSheet(theme => ({
  layout: (props: TouchableOpacityProps) =>
    transformComponentStyle(props, theme),
}));

export const TouchableOpacity = forwardRef<
  BaseTouchableOpacity,
  TouchableOpacityProps
>(({ style, children, ...rest }, ref) => {
  const { styles } = useStyles(stylesheet);

  const { styleProps, otherProps } = separateProps<
    TouchableOpacityProps,
    ViewStyleWithColors
  >(rest, CommonStyleSchema.shape);

  return (
    <BaseTouchableOpacity
      ref={ref}
      style={[styles.layout(styleProps), style]}
      {...otherProps}>
      {children}
    </BaseTouchableOpacity>
  );
});
