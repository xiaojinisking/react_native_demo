import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {
	createMaterialTopTabNavigator,
	createAppContainer
} from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil';
import {connect} from "react-redux";
import actions from '../action/index';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';


type Props = {};
export default class PopularPage extends Component<Props> {

	constructor(props) {
		super(props);
		this.tabNames = ['Java', 'Android', 'ios', 'React', 'React Native', 'php'];
	}

	_genTabs() {
		const tabs = {};
		this.tabNames.forEach((item, index) => {
			tabs[`tab${index}`] = {
				// screen: PopularTab,
				screen: props => <PopularTabPages {...props} tableLabel={item}/>,		//实现初始化时传参
				navigationOptions: {
					title: item
				}
			}
		})
		return tabs;
	}

	render() {
		const TabNavigator = createAppContainer(createMaterialTopTabNavigator(this._genTabs(), {
			tabBarOptions: {
				tabStyle: styles.tabStyles,
				upperCaseLabel: false,	//是否使用标签大写，默认为true
				scrollEnabled: true,		//是否支持选项卡滚动，默认为false
				style: {
					backgroundColor: '#678'
				},
				indicatorStyle: styles.indicatorStyle,	//标签指示器的样式
				labelStyle: styles.labelStyle,	//文字的样式
			}
		}));


		return <View style={{flex: 1, marginTop: 30}}>
			<TabNavigator/>
		</View>

	}
}


const pageSize = 10;//设置常量防止修改
class PopularTab extends Component<Props> {
	constructor(props) {
		super(props)
		const {tableLabel} = this.props;
		this.storeName = tableLabel;	//获取顶部动态的tab名称
	}


	//页面第一次render前
	componentDidMount() {
		this.loadData();	//加载数据
	}

	//卸载页面前
	componentWillUnmount(): void {
	}

	loadData() {
		const {onRefreshPopular} = this.props;
		const url = this.genFetchUrl(this.storeName);
		onRefreshPopular(this.storeName,url,pageSize)
	}

	genFetchUrl(key){
		return URL + key + QUERY_STR;
	}


	render() {
		return (
			 <View style={styles.container}>
				 <Text style={styles.welcome}>{this.storeName}</Text>
				 <Text onPress={() => {
					 NavigationUtil.goPage({
						 navigation: this.props.navigation
					 }, "DetailPage")
				 }}>跳转到详情页</Text>
			 </View>
		);
	}
}


const mapStateToProps = state =>({
	popular:state.popular
})


const mapDispatchToProps = dispatch => ({
	onRefreshPopular: (storeName,url,pageSize)=>dispatch(actions.onRefreshPopular(storeName,url,pageSize))
})


const PopularTabPages = connect(mapStateToProps,mapDispatchToProps)(PopularTab)



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
	tabStyles: {
		minWidth: 50
	},
	indicatorStyle: {
		height: 2,
		backgroundColor: "white"
	},
	labelStyle: {
		fontSize: 13,
		marginTop: 16,
		marginBottom: 6
	}
});
