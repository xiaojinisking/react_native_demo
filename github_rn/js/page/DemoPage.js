import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import actions from "../action";
import {connect} from "react-redux";
import NavigationUtil from "../navigator/NavigationUtil";

type Props = {};

class DemoPage extends Component<Props> {
	render() {
		const {navigation} = this.props;
		return (
			 <View style={styles.container}>
				 <Text style={styles.welcome}>Demo</Text>
				 <Button title="网络Fetch" onPress={
					 () => {
						 NavigationUtil.goPage({
							 navigation: this.props.navigation
						 }, "FetchDemoPage")
					 }
				 }/>
				 <Button title={'AsyncStorage存储'} onPress={
					 () => {
						 NavigationUtil.goPage({
							 navigation: this.props.navigation
						 }, 'AsyncStorageDemoPage')
					 }
				 }/>
				 <Button title={'离线存储'} onPress={
					 () => {
						 NavigationUtil.goPage({
							 navigation: this.props.navigation
						 }, 'DataStoreDemoPage')
					 }
				 }/>
			 </View>
		);
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
	theme: state.theme
});

const mapDispatchToProps = dispatch => ({
	onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(mapStateToProps, mapDispatchToProps)(DemoPage)
