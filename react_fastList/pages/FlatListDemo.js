/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

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

type Props = {};
const CITY_NAMES=['北京','上海','广州','深圳','杭州','苏州','成都','武汉','郑州','洛阳','厦门','青岛','拉萨'];
export default class FlatListDemo extends Component<Props> {
	constructor(props){
		super(props);
		this.state = {
			isLoading:false,
			dataArray:CITY_NAMES
		}
	}

	loadData(refreshing){
		if(refreshing){
			this.setState({
				isLoading:true
			});
		}
		setTimeout(()=>{
			let dataArray = [];
			if(refreshing){
				for(let i = this.state.dataArray.length-1;i>=0;i--){
					dataArray.push(this.state.dataArray[i]);
				}
			}else{
				// dataArray  = this.state.dataArray.concat(CITY_NAMES)
				dataArray  = [...this.state.dataArray, ...CITY_NAMES]
			}
			this.setState({
				// dataArray:[...this.state.dataArray,...dataArray],
				dataArray:dataArray,
				isLoading:false
			})
		},2000)
	}

	_renderItem(data){
		return (
			<View style={styles.item}>
				<Text style={styles.text}>{data.item}</Text>
			</View>
		)
	}

	genIndicator(){
		return <View style={styles.indicatorContainer}>
			<ActivityIndicator
				style={styles.indicator}
				size={'large'}
				color={'red'}
				animating={true}
			/>
			<Text>正在加载更多</Text>
		</View>
	}


  render() {
    return (
      <View style={styles.container}>
				<FlatList
					data={this.state.dataArray}
					renderItem={(data)=>this._renderItem(data)}
					keyExtractor={(item,index) => (index)}
					// refreshing={this.state.isLoading}
					// onRefresh={()=>{
					// 	this.loadData()
					// }}
					refreshControl={	//自定义上拉刷选
						<RefreshControl
							title={'Loading'}
							colors={['#f0f']}
							titleColor={'red'}
							tintColor={'orange'}
							refreshing={this.state.isLoading}
							onRefresh={()=>{
								this.loadData(true)
							}}
						/>
					}

					ListFooterComponent={()=>this.genIndicator()}	//下拉加载效果
					onEndReached={()=>{
						this.loadData();
					}}
				/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5FCFF',
  },
  item:{
  	backgroundColor: '#169',
		height:200,
		marginRight:15,
		marginLeft:15,
		marginBottom:15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text:{
		color: 'white',
		fontSize: 20
	},
	indicatorContainer:{
  	alignItems: 'center'
	},
	indicator:{
  	color: 'red',
		margin:10
	}
});
