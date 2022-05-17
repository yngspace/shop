import './style.sass'

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return (): JSX.Element => (
      <label class="search-input">
        <input class="search-input__input" type="text" placeholder={props.placeholder} />
        <button class="search-input__button">
          <img src="../../../assets/img/search-icon.svg" alt="Поиск" />
        </button>
      </label>
    )
  }
})
