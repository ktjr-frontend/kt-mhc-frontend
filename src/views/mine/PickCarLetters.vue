<template lang="pug">
  section.pick-car-letters
    .card-body(v-infinite-scroll="loadMore", infinite-scroll-disabled="loading", infinite-scroll-distance="10")
      .no-data(v-if="!pickCarLetterList.length")
        i.iconfont.icon-car
        p 没有委托函数据
      kt-card-item.stress(v-for='pickCarLetter in pickCarLetterList', :key='pickCarLetter.number', :arrow-visible="true")
        span.color-primary(slot='arrow') {{pickCarLetter.status | pickCarLetterStatusFormat2}}
        .content(@click.prevent="$router.push({name: 'pickCarLetterDetail', params: {id: pickCarLetter.id}})")
          .content-row.mb5
            .stress 提车人：{{pickCarLetter.pickContact}}
          .content-row.flex.minor-content
            .content-left.flex-item
              | {{pickCarLetter.model}}
            .content-right
              | 共 {{pickCarLetter.count}} 辆
          .content-row.minor-content
            | 发起申请：{{pickCarLetter.startDate | moment('YYYY-MM-DD HH:mm:ss')}}
          .content-row.minor-content
            | 签章完成：{{pickCarLetter.signDate | moment('YYYY-MM-DD HH:mm:ss')}}
      .no-more-data(v-if="noMoreData")
        small 已经到底了
</template>

<script>
import { pickCarLetters } from '@/common/resources.js'
import MineMixin from '@/views/mine/mixin.js'
import { debounce } from 'lodash'

export default {
  mixins: [MineMixin],
  mounted() {
    this._fetchData()
  },

  methods: {
    loadMore: debounce(function() {
      this._fetchData(true)
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

      const res = await pickCarLetters.get(this.pruneParams(this.filter)).then(res => res.json()).catch(res => {
        this.loading = false
        throw res
      })

      if (isMore) this.pickCarLetterList = this.pickCarLetterList.concat(res.data.result)
      else this.pickCarLetterList = res.data.result

      if (res.data.result.length) {
        this.loading = false
      } else {
        this.loading = true
        if (this.pickCarLetterList.length) this.noMoreData = true
      }
    }
  },

  watch: {
    $route() {
      this._fetchData()
    }
  },

  data() {
    return {
      filter: {
        page: 1,
        size: 10,
        status: '0'
      },
      loading: false,
      noMoreData: false,
      pickCarLetterList: []
    }
  }
}
</script>
