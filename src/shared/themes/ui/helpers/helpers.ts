import { BoxProps, TextProps, Theme, TouchableOpacityProps } from '../types';
import { CommonStyleSchema } from './style-schema';

type CommonProps = BoxProps | TouchableOpacityProps | TextProps;

const transformStyle = (styles: CommonProps, theme: Theme) => {
  const finalStyles = Object.entries(styles).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (key in CommonStyleSchema.shape && key !== 'testID') {
        if ((value && key.endsWith('Color')) || key === 'color') {
          const color = theme.colors[value as keyof Theme['colors']] ?? 'black';

          acc[key] = color ?? 'transparent';
        } else if (key === 'fontFamily' && typeof value === 'string') {
          acc[key] = theme.fonts[value as keyof Theme['fonts']];
        } else {
          acc[key] = value as string;
        }
      }
      return acc;
    },
    {},
  );

  return finalStyles;
};

export const transformComponentStyle = (props: CommonProps, theme: Theme) => {
  return transformStyle(props, theme);
};

export const separateProps = <T extends object, U extends object>(
  props: T,
  commonSchema: Record<string, any>,
) => {
  const styleProps: Partial<T> = {};
  const otherProps: Partial<U> = {};

  const keys = Object.keys(props) as Array<keyof T>;

  keys.forEach(key => {
    if (key in commonSchema) {
      styleProps[key] = props[key];
    } else {
      (otherProps as Partial<T> & Partial<U>)[key as unknown as keyof U] =
        props[key] as unknown as U[keyof U];
    }
  });

  return { styleProps, otherProps };
};
