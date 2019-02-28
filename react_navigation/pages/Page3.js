/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput} from 'react-native';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});

type Props = {};
export default class Page3 extends Component<Props> {
	render() {
		const {navigation} = this.props;
		const {state, setParams} = navigation;
		const {params} = state;
		const showText = params && params.mode == 'edit' ? '正在编辑' : '编辑完成';

		return (
			<View style={styles.container}>
				<Text style={styles.text}>Welcome to Page3!</Text>
				<Text style={styles.showText}>{showText}</Text>
				<TextInput
					style={styles.input}
					onChangeText={text => {
						setParams({title: text})
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
		alignItems: 'center'
	},
	text: {
		fontSize: 20,
		color: 'black'
	},
	showText: {
		marginTop: 30,
		fontSize: 20,
		color: 'blue'
	},
	input: {
		height: 50,
		marginTop: 10,
		borderColor: 'black',
		borderWidth: 1
	}
});
