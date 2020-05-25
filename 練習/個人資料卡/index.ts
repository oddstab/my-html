const navMenuItems: NodeListOf<HTMLElement> = document.querySelectorAll(
    "#nav-menu a"
);
const indicator: HTMLElement = document.querySelector(".indicator");

function handlerMenuItemClick(target: HTMLElement) {
    navMenuItems.forEach((item) => {
        item.classList.remove("active");
        item.style.display = "";
    });

    target.classList.add("active");
    indicator.style.width = `${target.offsetWidth}px`;
    indicator.style.left = `${target.offsetLeft}px`;

    const currentSection = document.querySelector(".active-section");
    currentSection.classList.remove("active-section");

    const newCurrentSection = document.querySelector(
        `.${target.getAttribute("data-rel")}`
    );
    newCurrentSection.classList.add("active-section");
}

navMenuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        // handlerMenuItemClick(e.target as HTMLElement);
        handlerMenuItemClick(item);
    });
    item.classList.contains("active") && handlerMenuItemClick(item);
});
