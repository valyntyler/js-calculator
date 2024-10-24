export default class Theme {
  static Shell = new Theme("shell");
  static Switchbox = new Theme("switchbox");
  static Super = new Theme("super");
  static Smith = new Theme("smith");

  static THEME_KEY = "theme";

  onchange = () => {};

  #id = null;
  #onchange = () => {
    this.onchange();
    this.pushLocalStorage();
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
    const default_theme_id = Theme.Shell.id;
    const local_theme_id = localStorage.getItem(Theme.THEME_KEY)

    this.id = local_theme_id === null ? default_theme_id : local_theme_id;
  }

  pushLocalStorage() {
    localStorage.setItem(Theme.THEME_KEY, this.id);
  }
}
