/**
 * 全局导航控制类
 */
export default class NavigationUtil {

	/**
	 * 跳转到指定页面
	 * @param parmas 要传递的参数
	 * @param page 要跳转到路由名
	 */
	static goPage(parmas, page) {
		const navigation = NavigationUtil.navigation;
		if (!navigation) {
			console.log('NavigationUtil.navigation can not be null');
			return;
		}
		navigation.navigate(page, {
			...parmas
		});
	}

	/**
	 * 返回上一页
	 * @param navigation
	 */
	static goback(navigation) {
		navigation.goBack();
	}

	/**
	 * 重置到首页
	 * @param params
	 */
	static resetToHomePage(params) {
		const {navigation} = params;
		navigation.navigate('Main');
	}

}
