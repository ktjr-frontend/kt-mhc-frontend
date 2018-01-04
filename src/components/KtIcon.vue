<template>
  <component :class="['icon-svg', iconClass]" :is="name"></component>
</template>

<script>
import Icons from '@/assets/icons'
import { each } from 'lodash'
const components = {}
each(Icons, (v, k) => { components[k] = v })

export default {
  name: 'kt-icon',
  components,
  props: {
    name: {
      type: String,
      required: true,
      default: '',
      validator(val) {
        return Icons[val]
      }
    }
  },
  data() {
    return {
      Icons: Icons,
      iconClass: 'icon-' + this.name
    }
  }
}
</script>

<style>
.icon-svg {
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
}
</style>
