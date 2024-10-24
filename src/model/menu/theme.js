export default class Theme {
  static Shell = new Theme("shell");
  static Switchbox = new Theme("switchbox");
  static Super = new Theme("super");
  static Smith = new Theme("smith");

  static THEME_KEY = "theme";

  onchange = () => {};

  #id = null;
  #onchange = () => {
    this.pushLocalStorage();
    this.onchange();
  };

  constructor(id) {
    this.#id = id;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
    this.#onchange();
  }

  fetchLocalStorage() {
    const default_theme = Theme.Shell;
    const local_theme = localStorage.getItem(Theme.THEME_KEY);

    this.id = local_theme !== null ? local_theme : default_theme;
  }

  pushLocalStorage() {
    localStorage.setItem(Theme.THEME_KEY, this.id);
  }
}
