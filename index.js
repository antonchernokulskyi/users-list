import { AppRegistry, TextInput, Text, TouchableOpacity } from 'react-native';
import { touchableConfig, setDefaultProps, parseEnv } from 'helpers';
import { LocalizationService } from 'services';
import { Application } from './App';
import { name as appName } from './app.json';

setDefaultProps(Text, { allowFontScaling: false });
setDefaultProps(TextInput, { allowFontScaling: false });
setDefaultProps(TouchableOpacity, touchableConfig);

parseEnv();

LocalizationService.init();

AppRegistry.registerComponent(appName, () => Application);
