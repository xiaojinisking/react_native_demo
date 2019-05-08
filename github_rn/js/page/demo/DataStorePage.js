import React, {Component} from 'react';
import {TextInput, Button, View, Text} from "react-native";
import DataStore from '../../expand/dao/DataStore';

const GITHUB_URL = 'https://api.github.com/search/repositories?q=';

type Props = {};

class DataStorePage extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			showText: ''
		}
		this.dataStore = new DataStore();
	}

	onPressLearnMore() {
		let url = GITHUB_URL + this.searchKey;
		this.dataStore.fetchData(url).then(response=>{
			let showData = `初次数据加载时间：${new Date(response.timestamp)}\n${JSON.stringify(response.data)}`;
			this.setState({
				showText: showData
			})
		})
		 .catch(error=>{
			 error && this.setState({
				showText: '错误信息' + error.toString()
			})
		})
	}

	render() {
		return (
			 <View>
				 <TextInput
						style={{height: 40, borderColor: 'gray', borderWidth: 1}}
						onChangeText={(key) => this.searchKey = key}
				 />
				 <Button
						onPress={() => this.onPressLearnMore()}
						title="搜索"
						color="#841584"
				 />
				 <View>
					 <Text>{this.state.showText}</Text>
				 </View>
			 </View>
		)
	}
}

export default DataStorePage;