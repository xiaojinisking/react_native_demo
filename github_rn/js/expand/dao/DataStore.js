import {AsyncStorage} from "react-native";

export default class DataStore {
	/**
	 * 存储数据
	 * @param url
	 * @param data
	 * @param clallback
	 */
	saveData(url, data, clallback) {
		if (!data || !url) return;
		AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)),clallback)				//JSON.stringify是将一个javascript值（对象或者数组）转为js字符串
	}

	/**
	 * 获取数据，优先获取本地数据，如果本地数据或本地数据过期则获取网络数据
	 * @param url
	 * @returns {Promise<any> | Promise<*>}
	 */
	fetchData(url) {
		return new Promise((resolve, reject) => {
			this.fetchLocalData(url).then(wrapData => {
				if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
					resolve(wrapData);
				} else {
					this.fetchNetData(url).then(data => {
						resolve(this._wrapData((data)));
					}).catch(error => {
						reject(error)
					})
				}
			}).catch(error => {
				this.fetchNetData(url).then(data => {
					resolve(this._wrapData(data));
				}).catch(error => {
					reject(error);
				})
			})
		})
	}

	/**
	 * 获取本地数据
	 * @param url
	 * @returns {Promise<any> | Promise<*>}
	 */
	fetchLocalData(url) {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem(url)
				 .then(result => {
					 try {
						 resolve(JSON.parse(result))
					 } catch (e) {
						 reject(e);
					 }

				 })
				 .catch(error => {
					 reject(error);
				 })
		})
	}

	/**
	 * 获取网络数据
	 * @param url
	 * @returns {Promise<any> | Promise<*>}
	 */
	fetchNetData(url) {
		return new Promise((resolve, reject) => {
			fetch(url)
				 .then((response) => {
					 if (response.ok) {
						 return response.json();
					 }
					 throw new error('Network response was not ok');
				 })
				 .then(responseData => {
					 this.saveData(url, responseData)
					 resolve(responseData)
				 })
				 .catch(error => {
					 reject(error);
				 })
		})
	}

	/**
	 * 数据包裹时间戳
	 * @param data
	 * @returns {{data: *, timestamp: number}}
	 * @private
	 */
	_wrapData(data) {
		return {
			data,
			timestamp: new Date().getTime()					//注意这里只能获取到客户端的时间，客户端的时间是不可靠的，有条件应该获取服务端的时间
		}
	}

	/**
	 * 检查timestamp是否在有效期内
	 * @param timestamp 项目更新时间
	 * @returns {boolean} true 不需要更新，false需要更新
	 */
	static checkTimestampValid(timestamp) {
		const currentDate = new Date();
		const targetDate = new Date();
		targetDate.setTime(timestamp);
		if (currentDate.getMonth() !== targetDate.getMonth()) return false;
		if (currentDate.getDate() !== targetDate.getDate()) return false;
		if (currentDate.getHours() - targetDate.getHours() > 4) return false;	//有效期未4小时
		return true;
	}

}