<template lang="pug">
mt-popup.popup-box(v-model='popupVisible', position='right')
  slot(name="header")
    mt-header(ref="header", :title="title")
      //- mt-button(icon="back", slot="left", @click.prevent="popupVisible = false") 返回
      div(slot="left")
        i.p10.iconfont.icon-guanbi(@click.prevent="popupVisible = false")
  kt-input(ref="input", :visible="visible", @input="$emit('input', $event)", @input-confirmed="$emit('popup-confirmed', $event)")
    template(slot="label")
      slot(name="label")
    template
      slot
</template>

<script>
export default {
  name: 'kt-popup-input',

  props: {
    visible: Boolean
  },

  methods: {
    init(opt = {}) {
      if (opt.title) this.title = opt.title
      this.$refs.input.init(opt)
    },

    close() {
      this.popupVisible = false
      this.$emit('visible-change', false)
    }
  },

  watch: {
    visible() {
      this.popupVisible = this.visible
    }
  },

  data() {
    return {
      title: '编辑',
      popupVisible: this.visible
    }
  }
}
</script>
