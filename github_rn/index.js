/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppNavigator from './js/navigator/AppNavigator';
import App from './js/App'

AppRegistry.registerComponent(appName, () => App);
