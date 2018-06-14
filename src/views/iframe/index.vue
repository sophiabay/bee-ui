<template>
  <iframe :src="urlPath" class="iframe" ref="iframe"></iframe>
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
  watch: {
    $route: function(to, from) {
      if (to.name !== from.name) {
        this.urlPath = this.getUrlPath()
      }
      this.load()
    }
  },
  computed: {
    ...mapGetters(['tagList'])
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
      const clientHeight = document.documentElement.clientHeight - 90
      iframe.style.height = `${clientHeight}px`
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.hide()
        })
      }
    },
    getUrlPath() {
      // 获取iframe src路径
      if (this.$route.matched.some(record => record.meta.urlPath)) {
        return this.$route.meta.urlPath
      }
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
