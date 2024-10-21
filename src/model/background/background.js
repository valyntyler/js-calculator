export default class Background {
  #isScrolling = true;
  onchange = () => {}

  get isScrolling() {
    return this.#isScrolling;
  }

  set isScrolling(value) {
    this.onchange()
    this.#isScrolling = value;
  }
}
