<template>
  <el-input-number v-model="text" @change="handleChange" 
  :precision="precision" :size="size" :min="minRows" :max="maxRows" 
  :label="'请输入'+placeholder" :disabled="disabled"></el-input-number>
</template>

<script>
export default {
  name: 'SvueCrudInputNumber',
  data() {
    return {
      text: ''
    }
  },
  props: {
    value: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    },
    precision: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    minRows: {
      type: Number,
      default: -Infinity
    },
    maxRows: {
      type: Number,
      default: Infinity
    }
  },
  watch: {
    value: function(n, o) {
      this.text = this.value
    }
  },
  created() {
    this.text = this.value
  },
  mounted() {},
  methods: {
    handleChange(value) {
      this.$emit('input', value)
    }
  }
}
</script>
