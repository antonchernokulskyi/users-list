import { z } from 'zod';
import { envSchema } from 'helpers';

declare module 'react-native-config' {
  interface NativeConfig extends z.infer<typeof envSchema> {}
}
