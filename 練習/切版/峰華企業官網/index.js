const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll(".slide-caption");

glide.on(["mount.after", "run.after"], () => {
    console.log(captionsEl);
    const caption = captionsEl[glide.index];
    anime({
        targets: caption.children,
        opacity: [0, 1],
        duration: 200,
        easing: "linear",
        delay: anime.stagger(300, { start: 300 }),
        translateY: [anime.stagger([40, 10]), 0]
    });
})

glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption > *").forEach((el) => {
        el.style.opacity = 0;
    });
});

glide.mount();