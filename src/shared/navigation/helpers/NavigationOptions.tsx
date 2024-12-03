import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Theme } from '@react-navigation/native';
import { Colors } from 'themes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../models';

export const Stack = createNativeStackNavigator<RootStackParamList>();

export const Tab = createBottomTabNavigator();

export const theme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
    border: Colors.transparent,
  },
};
