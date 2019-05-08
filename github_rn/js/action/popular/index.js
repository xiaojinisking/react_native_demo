import Types from '../types';
import DataStore from '../../expand/dao/DataStore';


/**
 * 获取最热数据（异步action）
 * @param storeName
 * @param url
 * @returns {Function}
 */
export function onRefreshPopular(storeName, url,pageSize) {
	return dispatch => {
		dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
		let dataStore = new DataStore();
		dataStore.fetchData(url) // 异步action与数据流
			 .then(data => {
					// handleData(Types.POPULAR_REFRESH_SUCCESS,dispatch,storeName,data,pageSize)
				 dispatch({
					 type:Types.POPULAR_REFRESH_SUCCESS,
					 items:data.data,
					 projectModels:'',
					 storeName,
					 pageIndex:1,
				 })
			 })
			 .catch(error => {
				 dispatch({
					 type: Types.POPULAR_REFRESH_FAIL,
					 storeName,
					 error
				 })
			 })
	}
}
