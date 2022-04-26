<template lang="pug">
  .checkbox(:class="{active: isActive}" @click="click")
    span.rect
      span.icon: include ./assets/checkbox.svg
    p.text(v-html="label")
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    click() {
      this.$emit('click', this.isActive, this.modelValue)
    },
  },
}
</script>

<style lang="sass" scoped>
  .checkbox
    display: inline-grid
    grid-template-columns: 20px 1fr
    align-items: center
    grid-gap: 10px
    .rect
      display: flex
      align-items: center
      justify-content: center
      width: 20px
      height: 20px
      border-radius: 2px
      margin: 4px 0
      transition: $time
      background: #F3F5F5
    .icon
      width: 14px
      height: 14px
      opacity: 0
      transition: $time
    &.active, &.active:hover
      .rect
        opacity: 1
      .icon
        opacity: 1
    &:hover
      cursor: pointer
      .rect
        opacity: .5
    .text
      font-weight: 300
      font-size: 16px
      line-height: 19px

</style>
