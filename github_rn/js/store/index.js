import {applyMiddleware, createStore,compose} from "redux";
import reducers from '../reducer'
import {middleware} from "../navigator/AppNavigator";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//自定义的log打印
/*const logger = store => next => action => {
	if (typeof action === 'function') {
		console.log('dispatching a function');
	}else{
		console.log('dispatching ',action);
	}
	const result = next(action);
	console.log('nextState ',store.getState());
};*/

const composeEnhancers =
	 typeof window === 'object' &&
	 window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
			}) : compose;

const middlewares = [
	middleware,
	logger,
	thunk,
]

const enhancer = composeEnhancers(
	 applyMiddleware(...middlewares)
);


//创建store
export default createStore(
	 reducers,
	 // applyMiddleware(...middlewares),
	 enhancer
);