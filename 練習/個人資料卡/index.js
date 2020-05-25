var navMenuItems = document.querySelectorAll("#nav-menu a");
var indicator = document.querySelector(".indicator");
function handlerMenuItemClick(target) {
    navMenuItems.forEach(function (item) {
        item.classList.remove("active");
        item.style.display = "";
    });
    target.classList.add("active");
    indicator.style.width = target.offsetWidth + "px";
    indicator.style.left = target.offsetLeft + "px";
    var currentSection = document.querySelector(".active-section");
    currentSection.classList.remove("active-section");
    var newCurrentSection = document.querySelector("." + target.getAttribute("data-rel"));
    newCurrentSection.classList.add("active-section");
}
navMenuItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
        // handlerMenuItemClick(e.target as HTMLElement);
        handlerMenuItemClick(item);
    });
    item.classList.contains("active") && handlerMenuItemClick(item);
});
//# sourceMappingURL=index.js.map