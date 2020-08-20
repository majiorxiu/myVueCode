import router from './index'
import bus from '@/js/eventBus'

router.beforeEach((to, from , next) => {
    bus.$emit('load-show')
    document.title = to.name;
    next();
})
router.afterEach((to, from, next) => {
    bus.$emit('load-hide')
})
export default router