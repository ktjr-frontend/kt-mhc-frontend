<template lang="pug">
  section.work-certify-template
    mt-header(ref="header", title="授权书说明")
      //- mt-button(icon="back", slot="left", @click.prevent="close") 返回
      div(slot="left")
        i.p10.iconfont.icon-guanbi(@click.prevent="close")
    .content
      p.line 《授权书》是用来证明您当前在申请的企业就职的文书。

      h3 要求如下
      ol
        li 在职证明中需要包含<em>真是姓名、身份证号、加盖公司红章</em>三个要素
        li 被证明人的姓名与当前账号实名认证的姓名一致
        li 公章上的公司名称与申请加入的公司名称一致
      p.line 您可以使用自己公司的《在职证明》，也可以下载卖好车提供的《在职证明模板》。
      .form-buttons
        mt-button.mint-button-block(type='primary', size='large', @click.prevent="pickTemplateVisible = true") 获取授权书模板
    .custom-model(v-if="pickTemplateVisible", @click="pickTemplateVisible = false")
    mt-popup.popup-box.popup-box-top(v-model='pickTemplateVisible', position='top')
      mt-header(ref="header", title="获取授权书模板")
        //- mt-button(icon="back", slot="left", @click.prevent="pickTemplateVisible = false") 返回
        div(slot="left")
          i.p10.iconfont.icon-guanbi(@click.prevent="pickTemplateVisible = false")
      .picker-body
        .picker-row.flex
          input.flex-item.mr5(placeholder="请输入邮箱账号", v-model="receiveEmail")
          mt-button(type="primary", size="small", @click.prevent="sendToEmail") 发送至邮箱
</template>

<script>
export default {
  props: {
    close: Function
  },

  methods: {
    // 自定义顶部标题栏的返回按钮行为
    backButtonAction() {
      if (this.pickTemplateVisible) {
        this.pickTemplateVisible = false
      } else {
        this.close()
      }
    },

    // 发送提车函模板到邮箱
    sendToEmail() {
      if (!this.receiveEmail.match(/[0-9a-zA-Z_]+@\w+/)) {
        this.$toast('邮箱格式不正确', 'error')
        return
      }
      this.pickTemplateVisible = false
      this.$toast('已发送，请注意查收', 'success')
    }
  },

  data() {
    return {
      receiveEmail: '',
      pickTemplateVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 15px;
  line-height: 1.8em;
  .line {
    margin-top: 15px;
    margin-bottom: 20px;
  }
}
</style>
