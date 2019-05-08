import React from 'react';
import {Button, Text, TextInput, View, AsyncStorage} from 'react-native';

const KEY = 'CACHE_KEY';

class AsyncStoragePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputText: '',
			showText: ''
		};
	}

	addKey = async () => {
		try {
			await AsyncStorage.setItem(KEY, this.state.inputText);
		} catch (e) {

		}

	}

	async delKey(){
		await AsyncStorage.removeItem(KEY);
		this.setState({
			showText:''
		})
	}



	seaKey = async () => {
		try{
			const value = await AsyncStorage.getItem(KEY);
			if (value !== null) {
				// We have data!!
				console.log(value);
				this.setState({
					showText:value
				})
			}
		}catch (e) {
			
		}
	}

	render() {
		return (
			 <View>
				 <TextInput
						style={{height: 40, borderColor: 'gray', borderWidth: 1}}
						onChangeText={(inputText) => this.setState({inputText})}
						value={this.state.inputText}
				 />
				 <Button
						onPress={() => this.addKey()}
						title="新增"
						color="#841584"
				 />
				 <Button
						onPress={() => this.delKey()}
						title="删除"
						color="#841584"
				 />

				 <Button
						onPress={() => this.seaKey()}
						title="查询"
						color="#841584"
				 />
				 <View>
					 <Text>{this.state.showText}</Text>
				 </View>
			 </View>
		)
	}
}

export default AsyncStoragePage;