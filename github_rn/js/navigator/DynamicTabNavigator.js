import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import PopularPage from '../page/PopularPage';
import FavoritePage from '../page/FavoritePage';
import TrendingPage from '../page/TrendingPage';
import MyPage from '../page/MyPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import NavigationUtil from "../navigator/NavigationUtil";
import {BottomTabBar} from 'react-navigation-tabs';
import {connect} from "react-redux";
import DemoPage from "../page/DemoPage";

type Props = {};

const TABS = {
	PopularPage: {
		screen: PopularPage,
		navigationOptions: {
			tabBarLabel: '最热',
			tabBarIcon: ({tintColor, focused}) => (
				 <MaterialIcons
						name={'whatshot'}
						size={26}
						style={{color: tintColor}}
				 />
			)
		}
	},
	TrendingPage: {
		screen: TrendingPage,
		navigationOptions: {
			tabBarLabel: '趋势',
			tabBarIcon: ({tintColor, focused}) => (
				 <Ionicons
						name={'md-trending-up'}
						size={26}
						style={{color: tintColor}}
				 />
			)
		}
	},
	FavoritePage: {
		screen: FavoritePage,
		navigationOptions: {
			tabBarLabel: '收藏',
			tabBarIcon: ({tintColor, focused}) => (
				 <MaterialIcons
						name={'favorite'}
						size={26}
						style={{color: tintColor}}
				 />
			)
		}
	},
	MyPage: {
		screen: MyPage,
		navigationOptions: {
			tabBarLabel: '我的',
			tabBarIcon: ({tintColor, focused}) => (
				 <Entypo
						name={'user'}
						size={26}
						style={{color: tintColor}}
				 />
			)
		}
	},
	DemoPage: {
		screen: DemoPage,
		navigationOptions: {
			tabBarLabel: 'Demo',
			tabBarIcon: ({tintColor, focused}) => (
				 <Entypo
						name={'aircraft-take-off'}
						size={26}
						style={{color: tintColor}}
				 />
			)
		}
	}
}


class DynamicTabNavigator extends Component<Props> {
	constructor(props) {
		super(props);
		console.disableYellowBox = true;
	}


	_tabNavigator() {
		if (this.Tabs) {
			return this.Tabs;
		}

		const {PopularPage, TrendingPage, FavoritePage, MyPage, DemoPage} = TABS;
		const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage,DemoPage}	//根据需要定制显示的tab
		PopularPage.navigationOptions.tabBarLabel = '最新';		//动态修改tab的名称
		return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
			// tabBarComponent: TabBarComponent
			tabBarComponent: props => {
				return <TabBarComponent theme={this.props.theme} {...props} />
			}
		}));
	}

	render() {

		// NavigationUtil.navigation = this.props.navigation;			//再创建下面的Tabnavigator之前将之前的navigation保存起来。这样避免在tabNavigation导航的页面无法调整之前的navigation.跳转之前的就使用存储在NavigationUtil内的

		const Tab = this._tabNavigator();

		return <Tab/>
	}
}


//自定义底部组件 BottomTabBar 为reactNavigation 底层的底部tab组件
class TabBarComponent extends React.Component {
	constructor(props) {
		super(props);
		this.theme = {
			tintColor: props.activateTintColor,
			updateTime: new Date().getTime()
		}
	}

	render() {
		// const {routes, index} = this.props.navigation.state;
		// if (routes[index].params) {
		// 	const {theme} = routes[index].params;
		// 	if (theme && theme.updateTime > this.theme.updateTime) {
		// 		this.theme = theme;
		// 	}
		// }
		return <BottomTabBar
			 {...this.props}
			 activeTintColor={this.props.theme}
		/>
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
});


const mapStateToProps = state => ({
	theme: state.theme.theme
})

export default connect(mapStateToProps)(DynamicTabNavigator)