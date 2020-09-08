import router from './index'
import store from '../store';
import bus from '@/js/eventBus'

router.beforeEach((to, from , next) => {
	if((to.meta && to.meta.open) 
		&& (from.fullPath !== '/')) {
		let {href}= router.resolve({
			path: to.fullPath,   // 这里写的是要跳转的路由地址
			query: { openWindow: true}  // 这里写的是页面参数
		});
		window.open(href, '_blank');
		return false;
	}
	bus.$emit('load-show')
	document.title = to.name;
	next();
})
router.afterEach((to, from, next) => {
	bus.$emit('load-hide')
	store.dispatch('setThemeColor', {})
})
export default router