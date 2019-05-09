import React, {Component} from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Button,
	FlatList,
	RefreshControl,
	ActivityIndicator
} from 'react-native';
import {
	createMaterialTopTabNavigator,
	createAppContainer
} from 'react-navigation'
import {connect} from "react-redux";
import actions from '../action/index';
import PopularItem from "../common/PopularItem";
import Toast from 'react-native-easy-toast';

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
			if (item == 'Java') {
				tabs[`tab${index}`] = {
					// screen: PopularTab,
					screen: props => <PopularTabPages {...props} tableLabel={item}/>,		//实现初始化时传参
					navigationOptions: {
						title: item
					}
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
		this.loadData(false);	//加载数据
	}

	//卸载页面前
	componentWillUnmount(): void {
	}

	loadData(loadmore) {
		const {onRefreshPopular, onLoadMorePopular} = this.props;
		const url = this.genFetchUrl(this.storeName);
		const store = this._store();
		if (loadmore) {
			onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
				this.refs.toast.show('没有更多了');
				alert('没有更多')
			})
		} else {
			onRefreshPopular(this.storeName, url, pageSize)
		}


	}

	genFetchUrl(key) {
		return URL + key + QUERY_STR;
	}

	_store() {
		const {popular} = this.props;
		let store = popular[this.storeName];
		if (!store) {
			store = {
				items: [],
				isLoading: false,
				projectModels: [],//要显示的数据
				hideLoadingMore: true//默认隐藏加载更多
			}
		}

		return store;
	}

	_renderItem(data) {
		return <PopularItem
			 item={data.item}
			 onSelect={() => {

			 }}
		/>
	}

	//底部上拉加载组件
	genIndicator() {

		console.log('hideLoadingMore', this._store().hideLoadingMore)
		return this._store().hideLoadingMore ? null :
			 <View style={styles.indicatorContainer}>
				 <ActivityIndicator
						style={styles.indicator}
				 />
				 <Text>正在加载更多</Text>
			 </View>
	}

	render() {
		let store = this._store();
		const {theme} = this.props;
		return (
			 <View style={styles.container}>
				 <FlatList
						data={store.projectModels}
						renderItem={data => this._renderItem(data)}
						keyExtractor={(item, index) => index}
						refreshControl={
							<RefreshControl
								 title={'Loading'}        //指定刷新指示器下显示的文字
								 titleColor={theme.theme}  //刷新指示器下显示等文字的颜色
								 colors={theme.theme}      //刷新指示器颜色
								 refreshing={store.isLoading}        //视图是否应该在刷新时显示指示器。
								 onRefresh={() => this.loadData()}    //在视图开始刷新时调用
								 tintColor={theme.theme}            //指定刷新指示器的颜色
							/>
						}
						ListFooterComponent={() => this.genIndicator()}
						onEndReachedThreshold={0.5}      //决定当距离内容最底部还有多远时触发onEndReached回调。注意此参数是一个比值而非像素单位。比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发。
						onEndReached={() => {//当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用。
							setTimeout(() => {
								if (this.canLoadMore) {
									console.log('---onEndReachedLoad----');
									this.canLoadMore = false;
									this.loadData(true);
								}
								console.log('---onEndReached----');
							}, 100)
						}}
						onScrollBeginDrag={() => {
							this.canLoadMore = true;//fix 初始化时页面调用onEndReached的问题
							console.log('-----onMomentumScrollBegin-----');
						}}
				 />
				 <Toast ref='toast'/>
			 </View>
		);
	}
}


const mapStateToProps = state => ({
	popular: state.popular,
	theme: state.theme
})


const mapDispatchToProps = dispatch => ({
	onRefreshPopular: (storeName, url, pageSize) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
	onLoadMorePopular: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callBack))
})


const PopularTabPages = connect(mapStateToProps, mapDispatchToProps)(PopularTab)


const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	},
	indicator: {
		color: 'red',
		margin: 10

	},
	indicatorContainer: {
		alignItems: "center"
	},
});
