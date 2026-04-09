import Vue from 'vue'
import App from './App'

// 引入uView主JS库
import uView from '@/uni_modules/uview-ui'

Vue.use(uView)

// 引入uView的全局SCSS主题文件
import '@/uni_modules/uview-ui/index.scss'

// 引入uView基础样式
import '@/uni_modules/uview-ui/theme.scss'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()