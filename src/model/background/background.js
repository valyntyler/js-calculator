export default class Background {
  #isScrolling = true;
  onchange = () => {}

  get isScrolling() {
    return this.#isScrolling;
  }

  set isScrolling(value) {
    this.#isScrolling = value;
    this.onchange()
  }
}
