<template lang="pug">
  section.picker-letter
    .top-alert
      p.mb5.el-green(v-if="model.status === '1'") 签章成功，完成提车委托函申请，可提车
      p.mb5.el-orange(v-else-if="model.status === '2'") 尚未签章，请耐心等待
      small {{model.signDate | moment('YYYY-MM-DD HH:mm:ss')}}
    section
      mt-cell(title="提车人姓名", :value="model.pickContact")
      mt-cell(title="联系方式", :value="model.pickerPhone")
      mt-cell(title="身份证号码", :value="model.pickerIdCard")
      mt-cell(title="预计提车日期")
        span {{model.pickStartDate | moment('YYYY-MM-DD')}} 至 {{model.pickStartDate | moment('YYYY-MM-DD')}}
    section.mt10
      .fields
        mt-cell.title-cell.ui-border-b
          span(slot="title") 本次提车车辆
          span 共 <em>{{model.count}}</em> 辆
        mt-cell.no-border.pb10.pt10(v-for="v in model.vehicles", :key="v.frameNo")
          div(slot="title")
            .content-row.flex
              .content-left.flex-item {{v.model}}
              .content-right <em>{{v.count}}</em> 辆
            p.title-hint 车架号：{{v.frameNo}} {{v.appearTrim}}


</template>

<script>
import MineMixin from '@/views/mine/mixin.js'

export default {
  mixins: [MineMixin],
  data() {
    return {
      model: {
        pickerPhone: 14411231111,
        pickerIdCard: '1231231322222212311',
        pickStartDate: new Date(),
        pickEndDate: new Date(),
        count: 2,
        signDate: new Date(),
        status: this.$route.params.id,
        vehicles: [{
          model: '奥迪 A3 2017款 18T SPORT',
          appearTrim: '云母灰/黑色',
          count: 1,
          frameNo: 'GZX11231321ADFS1111'
        }, {
          model: '奥迪 A3 2017款 18T SPORT',
          appearTrim: '云母灰/黑色',
          count: 1,
          frameNo: 'GZX11231321ADFS1112'
        }]
      }
    }
  }
}
</script>
