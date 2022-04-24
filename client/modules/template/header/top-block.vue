<template lang="pug">
  header.header.screen
    .header-top-block
      .container
        .grid
          .left-block
            include ./assets/address.svg
            span Адрес магазина: {{ meta.address }}

          .center
            router-link.logo(to="/") AQUASHOP

          .right-block.row
            .col.row
              include ./assets/work-time.svg
              span {{ meta.workTime }}
            .col.row
              include ./assets/phone.svg
              span {{ meta.phone }}
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.header-top-block
  border-bottom: 1px solid $color-text
  padding: 10px 0
  font-weight: 500

.grid
  display: grid
  grid-template-columns: 1fr max-content 1fr
  align-items: center

.row
  display: flex
  justify-content: space-between
  align-items: center

.right-block
  column-gap: 40px
  margin-left: auto

.col
  column-gap: 8px

.logo
  padding: 0 20px
  font-size: 48px
  font-weight: 700
</style>