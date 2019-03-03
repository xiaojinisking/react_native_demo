/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createStackNavigator} from 'react-navigation';
import FlatListDemo from './pages/FlatListDemo';
import SwipeableFlatListDemo from './pages/SwipeableFlatListDemo';
import SectionListDemo from './pages/SectionListDemo';
import {createAppContainer} from 'react-navigation';


const AppRoot = createStackNavigator({
	App:{
		screen: App
	},
	FlatListDemo:{
		screen: FlatListDemo,
		navigationOptions:{
			title:'FlatListDemo'
		}
	},
	SwipeableFlatListDemo:{
		screen: SwipeableFlatListDemo,
		navigationOptions:{
			title:'SwipeableFlatListDemo'
		}
	},

	SectionListDemo:{
		screen: SectionListDemo,
		navigationOptions:{
			title:'SectionListDemo'
		}
	},

})



AppRegistry.registerComponent(appName, () => createAppContainer(AppRoot));
