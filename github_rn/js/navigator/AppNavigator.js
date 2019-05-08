import {
	createStackNavigator,
	createSwitchNavigator,
	createAppContainer
} from 'react-navigation';
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';
import FetchPage from '../page/demo/FetchPage';
import DataStorePage from '../page/demo/DataStorePage';
import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware, createReduxContainer} from 'react-navigation-redux-helpers';
import AsyncStoragePage from "../page/demo/AsyncStoragePage";

export const rootCom = 'Init';	//设置根路由

//创建一个欢迎页面导航器
const InitNavigator = createStackNavigator({
	WelcomePage: {
		screen: WelcomePage,
		navigationOptions: {
			header: null			//隐藏顶部的Navigation bar
		}
	}
})


//创建首页导航器

const MainNavigator = createStackNavigator({
	HomePage: {
		screen: HomePage,
		navigationOptions: {
			header: null
		}
	},
	DetailPage: {
		screen: DetailPage,
		navigationOptions: {}
	},
	FetchDemoPage: {
		screen: FetchPage,
		navigationOptions: {}
	},
	AsyncStorageDemoPage: {
		screen: AsyncStoragePage,
		navigationOptions: {}
	},
	DataStoreDemoPage: {
		screen: DataStorePage,
		navigationOptions: {}
	}
})


export const RootNavigator = createAppContainer(createSwitchNavigator({
	Init: InitNavigator,
	Main: MainNavigator
}, {
	navigationOptions: {
		header: null
	}
}))


export const middleware = createReactNavigationReduxMiddleware(
	 state => state.nav
)

const AppWithNavigationState = createReduxContainer(RootNavigator);

const mapStateToProps = state => ({
	state: state.nav
})


export default connect(mapStateToProps)(AppWithNavigationState)

