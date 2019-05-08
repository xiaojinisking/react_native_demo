import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import PopularPage from './PopularPage';
import DetailPage from './DetailPage';
import FavoritePage from './FavoritePage';
import TrendingPage from './TrendingPage';
import MyPage from './MyPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import NavigationUtil from "../navigator/NavigationUtil";
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import {BackHandler} from "react-native";
import {NavigationActions} from "react-navigation";
import {connect} from "react-redux";

type Props = {};

class HomePage extends Component<Props> {
	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
	}

	onBackPress = () => {
		const {dispatch, nav} = this.props;
		// alert(nav.routes[1].index)
		if (nav.routes[1].index === 0) {
			return false;
		}
		dispatch(NavigationActions.back());
		return true;
	};

	//静态底部导航
	/*_tabNavigator() {
		return createAppContainer(createBottomTabNavigator({
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
		}));
	}*/

	render() {

		NavigationUtil.navigation = this.props.navigation;			//再创建下面的Tabnavigator之前将之前的navigation保存起来。这样避免在tabNavigation导航的页面无法调整之前的navigation.跳转之前的就使用存储在NavigationUtil内的
		//动态底部导航
		return <DynamicTabNavigator/>
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
	nav: state.nav
})


export default connect(mapStateToProps)(HomePage)