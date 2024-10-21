const menu_buttons = document.querySelectorAll(".menu .menu-item .button")

export default function handle_menu() {
    // hook up menu button click callback
    menu_buttons.forEach(btn => {
        btn.onclick = () => {
            const parent_item = btn.closest(".menu-item")
            parent_item.classList.toggle("active")
        }
    });

    // allow deselect by clicking off of menu item
    document.onclick = (event) => {
        menu_buttons.forEach(btn => {
            const parent_item = btn.closest(".menu-item")
            if (event.target.closest(".menu-item") != parent_item) {
                parent_item.classList.remove("active")
            }
        });
    }
}
