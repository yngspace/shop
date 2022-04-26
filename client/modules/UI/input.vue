<template lang="pug">
  label.default-input
    span.label(v-if="label") {{ label }}
    input(:type="type" :placeholder="placeholder" @input="onInput($event.target.value)")
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput(value) {
      this.$emit('input', this.modelValue, value)
    }
  },
}
</script>

<style lang="sass" scoped>
.default-input
  display: flex
  flex-direction: column
  border: 1px solid $dark-green
  border-radius: 4px
  row-gap: 10px
  padding: 8px 16px
  max-width: 420px
  .label
    font-size: 12px
</style>