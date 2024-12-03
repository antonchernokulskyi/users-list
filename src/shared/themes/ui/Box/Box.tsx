import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { separateProps, transformComponentStyle } from '../helpers';
import { BoxProps, ViewStyleWithColors } from '../types';
import { CommonStyleSchema } from '../helpers/style-schema';

const stylesheet = createStyleSheet(theme => ({
  layout: (props: BoxProps) => transformComponentStyle(props, theme),
}));

export const Box = forwardRef<View, BoxProps>(
  ({ style, children, ...rest }, ref) => {
    const { styles } = useStyles(stylesheet);

    const { styleProps, otherProps } = separateProps<
      BoxProps,
      ViewStyleWithColors
    >(rest, CommonStyleSchema.shape);

    return (
      <View
        ref={ref}
        style={[styles.layout(styleProps), style]}
        {...otherProps}>
        {children}
      </View>
    );
  },
);
