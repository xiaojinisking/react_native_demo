import {combineReducers} from 'redux'
import theme from './theme';
import popular from './popular';
import {rootCom, RootNavigator} from "../navigator/AppNavigator";
import {createNavigationReducer} from "react-navigation-redux-helpers";

const navReducer = createNavigationReducer(RootNavigator);

const index = combineReducers({
	nav:navReducer,
	theme:theme,
	popular: popular,
})

export default index;


