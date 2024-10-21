export default function generate_background() {
  const scroll_container = document.querySelector("#scroll-container");
  const row_template = document.querySelector("#scroll-row-template");

  for (let i = 0; i < 64; i++) {
    const row_instance = row_template.content.cloneNode(true);
    scroll_container.appendChild(row_instance);
  }

  document.querySelectorAll(".scroll-row").forEach((element) => {
    const ul_template = document.querySelector("#scroll-ul-template");
    for (let i = 0; i < 2; i++) {
      const ul_instance = ul_template.content.cloneNode(true);
      element.appendChild(ul_instance);
    }
  });

  document.querySelectorAll(".scroll-row ul").forEach((element) => {
    const li_template = document.querySelector("#scroll-li-template");
    for (let i = 0; i < 64; i++) {
      const li_instance = li_template.content.cloneNode(true);
      element.appendChild(li_instance);
    }
  });
}
