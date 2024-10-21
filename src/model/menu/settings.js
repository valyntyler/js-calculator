export default class Settings {
    static DIV_ZERO_KEY = "div-zero"
    static BKG_SCRL_KEY = "bkg-scroll"
    
    #is_div_zero = false;
    #is_scroll = true;

    onchange = () => {}
    #onchange = () => {
        this.onchange()
        this.pushLocalStorage()
    }
    
    constructor(isDivZeroAllowed, isScrollAllowed) {
        this.#is_div_zero = isDivZeroAllowed;
        this.#is_scroll = isScrollAllowed
    }

    static fetchLocalStorage() {
        const div_zero = localStorage.getItem(this.DIV_ZERO_KEY)
        const bkg_scrl = localStorage.getItem(this.BKG_SCRL_KEY)

        const div_zero_default = Settings.getDefault().isDivZeroAllowed
        const bkg_scrl_default = Settings.getDefault().isScrollAllowed

        return new Settings(
            div_zero === null ? div_zero_default : div_zero,
            bkg_scrl === null ? bkg_scrl_default : bkg_scrl
        )
    }

    static getDefault() {
        return new Settings(
            false,
            !isMotionSensible()
        )
    }

    pushLocalStorage() {
        localStorage.setItem(this.DIV_ZERO_KEY, this.#is_div_zero)
        localStorage.setItem(this.BKG_SCRL_KEY, this.#is_scroll)
    }

    get isDivZeroAllowed() {
        return this.#is_div_zero
    }

    get isScrollAllowed() {
        return this.#is_scroll
    }

    set setIsDivZeroAllowed(value) {
        this.#is_div_zero = value
        this.#onchange()
    }

    set setIsScrollAllowed(value) {
        this.#is_scroll = value
        this.#onchange()
    }
}

function isMotionSensible() {
    return (
        window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
        window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true
    )
}