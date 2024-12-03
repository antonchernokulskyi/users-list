import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { Colors } from 'themes';
import { Box } from 'themes/ui';
import { useStyles } from 'react-native-unistyles';

interface LoaderProps {
  color?: keyof typeof Colors;
  size?: ActivityIndicatorProps['size'];
}

export const Loader: React.FC<LoaderProps> = ({
  color = 'primary',
  size = 'small',
}) => {
  const { theme } = useStyles();

  return (
    <Box justifyContent="center" alignItems="center">
      <ActivityIndicator
        size={size}
        color={theme.colors[color as keyof typeof Colors]}
        animating
      />
    </Box>
  );
};
