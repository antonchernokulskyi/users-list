import { RouteProp } from '@react-navigation/native';
import { Routes } from './Routes';

export type RouteType = keyof typeof Routes;

export type RootStackParamList = {
  [Routes.USERS]: undefined;
  [Routes.USER_DETAILS]: { userId?: string };
};

export type UserDetailsProp = RouteProp<RootStackParamList, 'USER_DETAILS'>;
