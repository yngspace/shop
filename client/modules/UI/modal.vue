<template lang="pug">
  .modal-window(v-show="active")
    .content
      h3.title(v-if="title") {{ title }}
      button.close(@click="$emit('close')") X
      slot
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
.modal-window
  display: flex
  justify-content: center
  align-items: center
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0, 0, 0, .3)
  .content
    position: relative
    background: #fff
    border-radius: 20px
    padding: 20px
    min-width: 80%
    min-height: 400px
    overflow: auto
  .title
    margin-bottom: 40px
  .close
    position: absolute
    right: 20px
    top: 20px
    background: #fff
    color: #ccc
    padding: 6px
    font-size: 20px
    transition: color $time
    &:hover
      transform: scale(1.1)
      cursor: pointer
      color: $color-text
</style>