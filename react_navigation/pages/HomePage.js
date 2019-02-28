import React from 'react';
import {View, Text, Button} from 'react-native';

export default class HomePage extends React.Component {

	//覆盖AppNavigators中的配置
	static navigationOptions = {
		title: 'Home Page',
		headerBackTitle: '返回Home'   //设置返回此页的返回按钮的文案，有长度限制
	}

	render() {
		const {navigation} = this.props;
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text>Home Screen1</Text>
				<Button title={'Go to Page1'} onPress={() => {
					navigation.navigate('Page1', {name: '动态的'})
				}}/>
				<Button title={'Go to Page2'} onPress={() => {
					navigation.navigate('Page2')
				}}/>
				<Button title={'Go to Page3'} onPress={() => {
					navigation.navigate('Page3', {name: 'Davie'})
				}}/>
				<Button title={'Go to Bottom Navigator'} onPress={() => {
					navigation.navigate('Bottom')
				}}/>
				<Button title={'Go to Top Navigator'} onPress={() => {
					navigation.navigate('Top')
				}}/>
				<Button title={'Go to Top DrawerNav'} onPress={() => {
					navigation.navigate('DrawerNav')
				}}/>
			</View>
		);
	}
}