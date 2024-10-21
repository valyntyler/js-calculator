export default class Settings {
  DIV_ZERO_KEY = "div-zero";
  BKG_SCRL_KEY = "bkg-scroll";

  #is_div_zero = false;
  #is_bkg_scrl = true;

  onchange = () => {};
  #onchange = () => {
    this.onchange();
    this.pushLocalStorage();
  };

  constructor(isDivZeroAllowed, isScrollAllowed) {
    this.#is_div_zero = isDivZeroAllowed;
    this.#is_bkg_scrl = isScrollAllowed;
  }

  static getDefault() {
    return new Settings(false, !isMotionSensible());
  }

  fetchLocalStorage() {
    const div_zero = localStorage.getItem(this.DIV_ZERO_KEY);
    const bkg_scrl = localStorage.getItem(this.BKG_SCRL_KEY);

    const div_zero_default = Settings.getDefault().isDivZeroAllowed;
    const bkg_scrl_default = Settings.getDefault().isScrollAllowed;

    this.#is_div_zero = div_zero === null ? div_zero_default : div_zero;
    this.#is_bkg_scrl = bkg_scrl === null ? bkg_scrl_default : bkg_scrl;

    this.#is_div_zero = this.#is_div_zero == "true";
    this.#is_bkg_scrl = this.#is_bkg_scrl == "true";
    
    this.#onchange()
  }

  pushLocalStorage() {
    localStorage.setItem(this.DIV_ZERO_KEY, this.#is_div_zero);
    localStorage.setItem(this.BKG_SCRL_KEY, this.#is_bkg_scrl);
  }

  get isDivZeroAllowed() {
    return this.#is_div_zero;
  }

  get isScrollAllowed() {
    return this.#is_bkg_scrl;
  }

  set setIsDivZeroAllowed(value) {
    this.#is_div_zero = value;
    this.#onchange();
  }

  set setIsScrollAllowed(value) {
    this.#is_bkg_scrl = value;
    this.#onchange();
  }
}

function isMotionSensible() {
  return (
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true
  );
}
