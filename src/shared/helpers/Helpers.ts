import uuid from 'react-native-uuid';
import { runOnJS } from 'react-native-reanimated';

export type AnyType = any;

/* eslint-disable no-undef */
export const isDev = __DEV__;

export const noop = () => {};

export const getUUID = () => uuid.v4();

export const withDelay = (ms: number) => {
  return new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });
};

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  worklet: F,
  wait = 0,
) => {
  'worklet';

  let lastCallTime = -1;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    'worklet';

    const now = Date.now();

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (lastCallTime === -1 || now - lastCallTime >= wait) {
        lastCallTime = now;
        runOnJS(worklet)(...args);
      }
    }, wait);
  };
};
