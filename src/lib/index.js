import SnackbarPlugin from './my-snackbar.vue'
import OverlayPlugin from './my-overlay.vue'

const allPlugin = {
    install: function(Vue) {
        Vue.component(SnackbarPlugin.name, SnackbarPlugin)
        Vue.component(OverlayPlugin.name, OverlayPlugin)
    }
}
// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(allPlugin)
}
// 导出模块
export default allPlugin