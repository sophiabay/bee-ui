<template>
  <iframe v-if="$route.query.src" :src="$route.query.src" class="iframe" ref="iframe"></iframe>
  <iframe v-else :src="urlPath" class="iframe" ref="iframe"></iframe>
</template>

<script>
import { mapGetters } from 'vuex'
import NProgress from 'nprogress'
export default {
  name: 'SvueIframe',
  data() {
    return {
      urlPath: this.getUrlPath()
    }
  },
  created() {
    NProgress.configure({ showSpinner: false })
  },
  mounted() {
    this.load()
    this.resize()
  },
  props: ['routerPath'],
  watch: {
    $route: function() {
      this.load()
    },
    routerPath: function(val) {
      // 监听routerPath变化，改变src路径
      this.urlPath = this.getUrlPath()
    }
  },
  comments: {
    ...mapGetters(['tagList']),
    tagListNum: function() {
      return this.tagList.length !== 0
    }
  },
  methods: {
    // 显示等待框
    show() {
      NProgress.start()
    },
    // 隐藏等待框
    hide() {
      NProgress.done()
    },
    // 加载浏览器窗口变化自适应
    resize() {
      window.onresize = () => {
        this.iframeInit()
      }
    },
    // 加载组件
    load() {
      this.show()
      var flag = true // URL是否包含请求参数
      if (this.$route.query.src.indexOf('?') === -1) {
        flag = false
      }
      var list = []
      for (var key in this.$route.query) {
        if (key !== 'src' && key !== 'name') {
          list.push(`${key}=this.$route.query[key]`)
        }
      }
      list = list.join('&').toString()
      if (flag) {
        this.$route.query.src = `${this.$route.query.src}${list.length > 0 ? `&list` : ''}`
      } else {
        this.$route.query.src = `${this.$route.query.src}${list.length > 0 ? `?list` : ''}`
      }

      // 超时，则自动隐藏等待框
      let time = 3
      const timeFunc = setInterval(() => {
        time--
        if (time === 0) {
          this.hide()
          clearInterval(timeFunc)
        }
      }, 1000)
      this.iframeInit()
    },
    // iframe初始化
    iframeInit() {
      const iframe = this.$refs.iframe
      const clientHeight = document.documentElement.clientHeight - 200
      iframe.style.height = `${clientHeight}px`
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.hide()
        })
      }
    },
    getUrlPath() {
      // 获取iframe src路径
      let url = window.location.href
      url = url.replace('/iframe', '')
      return url
    }
  }
}
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
