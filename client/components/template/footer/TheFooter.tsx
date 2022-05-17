import './style.sass'

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <footer class="footer">
        <div class="container">
          <p>footer</p>
        </div>
      </footer>
    )
  }
})
