import React, { forwardRef } from 'react';
import { Text as BaseText } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { TextProps, TextStyleWithColors } from '../types';
import { transformComponentStyle, separateProps } from '../helpers';
import { CommonStyleSchema } from '../helpers/style-schema';

const stylesheet = createStyleSheet(theme => ({
  layout: (props: TextProps) => transformComponentStyle(props, theme),
}));

export const Text = forwardRef<BaseText, TextProps>(
  ({ style, children, ...rest }, ref) => {
    const { styles, theme } = useStyles(stylesheet);

    const { styleProps, otherProps } = separateProps<
      TextProps,
      TextStyleWithColors
    >(rest, CommonStyleSchema.shape);

    return (
      <BaseText
        ref={ref}
        style={[
          { fontFamily: theme.fonts.Regular, color: theme.colors.black },
          styles.layout(styleProps),
          style,
        ]}
        {...otherProps}>
        {children}
      </BaseText>
    );
  },
);
