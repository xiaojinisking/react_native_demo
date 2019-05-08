import React, {Component} from 'react';
import {TextInput, Button, View, Text} from "react-native";

const GITHUB_URL = 'https://api.github.com/search/repositories?q=';

type Props = {};

class FetchPage extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			showText: ''
		}
	}

	onPressLearnMore() {
		let url = GITHUB_URL + this.searchKey;
		fetch(url)
			 .then((response) => {
				 if (response.ok) {
					 return response.text()
				 }
				 throw new Error('Network response was not ok')
			 })
			 .then((responseText) => {
				 this.setState({
					 showText: responseText
				 })
				 console.log(responseText)

			 })
			 .catch((error) => {
				 this.setState({
					 showText: '错误信息' + error.toString()
				 })
				 console.error(error.toString());
			 });
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

export default FetchPage;