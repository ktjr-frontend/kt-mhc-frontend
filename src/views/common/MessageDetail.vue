<template lang="pug">
  section.message-detail
    kt-card-item(:key='message.id', :header-left="message.createDate | moment('YYYY-MM-DD HH:mm:ss')")
        //- span.color-primary(slot='arrow') {{message.status | messageStatusFormat}}
        .content(@click.prevent="$router.push({name: 'messageDetail', params: {id: message.id}})")
          .content-row.mb5
            .stress {{message.title}}
          .content-row.flex.minor-content
            | {{message.message}}
</template>

<script>

export default {
  data() {
    return {
      message: {
        id: '3',
        title: '消息标题3',
        status: '2',
        message: '这里是消息的内容部分，可以很多啊，这里是消息的内容部分，可以很多啊，这里是消息的内容部分，可以很多啊，这里是消息的内容部分，可以很多啊',
        createDate: new Date()
      }
    }
  }
}
</script>
