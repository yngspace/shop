<template lang="pug">
  .edit
    .categories-list
      .categories-item(
        v-for="item, idx in categories" :key="item.slug"
      )
        .col
          input(:value="item.name" @input="changeName($event.target.value, item)")
          input(:value="item.slug" disablet)
        .col
          CheckboxCmp(
            label="Показывать"
            @click="item.active = !item.active"
            :isActive="item.active"
          )
        .col
          span(@click="toggleEditFilters(item.slug, item.filters)") Фильтры: {{ item.filters.length }}
        .col
          button.primary-button(@click="save(item.slug, idx)") Сохранить
    Modal(
      title="Редактировать фильтры"
      :active="editFilters"
      @close="toggleEditFilters()"
    )
      Filters(
        :slug="currentItemSlug"
        :filters="currentItemFilters"
        @close="toggleEditFilters()"
        @addfilter="addFilter"
        @deletefilter="deleteFilter"
      )
</template>

<script>
import CheckboxCmp from '../../../UI/checkbox.vue'
import Modal from '../../../UI/modal.vue'
import Filters from './filters.vue'
import { request } from '../../axios'

export default {
  components: {
    CheckboxCmp,
    Modal,
    Filters
  },
  data() {
    return {
      categories: null,
      editFilters: false,
      currentItemSlug: null,
      currentItemFilters: []
    }
  },
  async mounted() {
    this.categories = (await this.$axios.get('/categories/?admin=true')).data
  },
  methods: {
    async save(slug, idx) {
      try {
        await request('patch', `/categories/${slug}`, this.categories[idx])
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e.response.data.message)
      } finally {
        const { data } = await this.$axios.get(`/categories/${slug}`)
        Object.keys(this.categories[idx]).forEach((key) => {
          if (data[key]) this.categories[idx][key] = data[key]
        })
      }
    },
    changeName(value, item) {
      const current = item
      current.name = value
    },
    toggleEditFilters(slug, filters) {
      if (slug) {
        this.currentItemSlug = slug
        this.editFilters = true
        this.currentItemFilters = filters
      } else {
        this.currentItemSlug = null
        this.editFilters = false
      }
    },
    async addFilter(filter) {
      try {
        const { data } = await request('post', '/filters/', filter)
        this.currentItemFilters.push(data)
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e.response.data.message)
      }
    },
    async deleteFilter(id) {
      try {
        await request('delete', `/filters/${id}`)
        this.currentItemFilters = this.currentItemFilters.filter((item) => item.id !== id)
        const current = this.categories.find((item) => item.slug === this.currentItemSlug)
        current.filters = this.currentItemFilters
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert('Что-то пошло не так')
      }
    }
  },
}
</script>

<style lang="sass">
.categories-item
  display: flex
  justify-content: space-between
  align-items: center
  padding: 14px 16px
  border: 1px solid $dark-green
.col
  display: flex
  justify-content: space-between
  column-gap: 20px
</style>
