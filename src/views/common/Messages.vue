<template lang="pug">
  section.messages
    .card-body(v-infinite-scroll="loadMore", infinite-scroll-disabled="loading", infinite-scroll-distance="10")
      .no-data(v-if="!messageList.length")
        i.iconfont.icon-car
        p 没有消息
      kt-card-item(v-for='message in messageList', :key='message.id', :arrow-visible="true", :header-left="message.createDate | moment('YYYY-MM-DD HH:mm:ss')")
        span.color-primary(slot='arrow') {{message.status | messageStatusFormat}}
        .content(@click.prevent="$router.push({name: 'messageDetail', params: {id: message.id}})")
          .content-row.mb5
            .stress {{message.title}}
          .content-row.flex.minor-content
            .content-left.flex-item
              | {{message.message}}
      .no-more-data(v-if="noMoreData")
        small 已经到底了
</template>

<script>
import { messages } from '@/common/resources.js'
import MineMixin from '@/views/mine/mixin.js'
import { debounce } from 'lodash'

export default {
  mixins: [MineMixin],
  mounted() {
    // this._fetchData()
  },

  methods: {
    loadMore: debounce(function() {
      return
      // this._fetchData(true)
    }, 500),

    search() {
      this.noMoreData = false
      this.$router.replace({
        name: this.$route.name,
        query: { ...this.filter, page: 1 }
      })
    },

    async _fetchData(isMore) {
      if (isMore) this.filter.page = +this.filter.page + 1
      else this.filter.page = 1

      this.loading = true
      if (this.filter.status === '0') this.filter.status = null

      const res = await messages.get(this.pruneParams(this.filter)).then(res => res.json()).catch(res => {
        this.loading = false
        throw res
      })

      if (isMore) this.messageList = this.messageList.concat(res.data.data)
      else this.messageList = res.data.data

      if (res.data.data.length) {
        this.loading = false
      } else {
        this.loading = true
        if (this.messageList.length) this.noMoreData = true
      }
    }
  },

  watch: {
    $route() {
      // this._fetchData()
    }
  },

  data() {
    return {
      filter: {
        page: 1,
        size: 10
      },
      loading: false,
      noMoreData: false,
      messageList: []
    }
  }
}
</script>
