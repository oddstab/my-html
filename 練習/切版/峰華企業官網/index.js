
/**
 * 輪播圖
 */
function useGlide() {
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

    const isotope = new Isotope(".cases", {
        layoutMode: "fitRows",
        itemSelector: ".case-item"
    });

    const filterBtns = document.querySelector(".filter-btns");

    filterBtns.addEventListener("click", (e) => {
        let { target } = e;
        const filterOption = target.getAttribute("data-filter");
        if (filterOption) {
            document.querySelectorAll(".filter-btn.active").forEach((btn) => {
                btn.classList.remove("active");
            });
            target.classList.add("active");

            isotope.arrange({ filter: filterOption });
        }
    })
}

/**
 * 導航欄位fixed
 */
function useHeader() {
    const headerEl = document.querySelector("header");
    const scrollTop = document.querySelector(".scrollTop");
    window.addEventListener("scroll", () => {

        // const topOfHeader = headerEl.offsetTop;
        // console.log(topOfHeader,window.scrollY);

        // if(window.screenY >= topOfHeader){
        //     document.body.style.paddingTop = headerEl.offsetHeight + 'px';
        //     headerEl.classList.add("sticky");
        // }
        // else{
        //     headerEl.classList.remove("sticky");
        //     document.body.style.paddingTop = 0;
        // }

        headerEl.classList.toggle("sticky", window.pageYOffset >= 100);
        if (window.pageYOffset >= 100) {
            document.querySelector(".glide").style.top = "0";
        }
        else {
            document.querySelector(".glide").style.top = "-80px";
        }

        if (window.pageYOffset > 2000) {
            scrollTop.style.display = "block";
        }
        else {
            scrollTop.style.display = "none";
        }
    });
}

/**
 * 淡入效果
 */
function useScrollReveal() {

    const staggeringOption = {
        delay: 300,
        distance: "50px",
        duration: 500,
        easing: "ease-in-out",
        origin: "bottom",
        interval: 350
    };
    //滾動淡入
    ScrollReveal().reveal(".feature", staggeringOption);
    ScrollReveal().reveal(".service-item", staggeringOption);
    ScrollReveal().reveal(".team-member", { ...staggeringOption, interval: 200 });

    ScrollReveal().reveal(".data-section", {
        beforeReveal: () => {
            anime({
                targets: ".data-piece .num",
                innerHTML: (el) => {
                    return [0, el.innerHTML];
                },
                duration: 2000,
                round: 1,
                easing: "easeInExpo"
            });

            const dataSectionEl = document.querySelector(".data-section");
            const bottom = dataSectionEl.getBoundingClientRect().bottom;
            dataSectionEl.style.backgroundPosition = `center calc(50%-${bottom / 5}px)`;
        }
    });
}

/**
 * 視差
 */
function useEffect() {
    const dataSectionEl = document.querySelector(".data-section");
    window.addEventListener("scroll", () => {
        const bottom = dataSectionEl.getBoundingClientRect().bottom;
        const top = dataSectionEl.getBoundingClientRect().top;

        if (bottom >= 0 && top <= window.innerHeight) {
            dataSectionEl.style.backgroundPosition = `center calc(50%-${bottom / 5}px)`;
        }
    });
}

/**
 * a標籤滾動
 */
function useSmoothScroll() {
    const scroll = new SmoothScroll("nav a[href*='#'], .scrollTop a[href*='#']", {
        header: "header",
        offset: 80,
    });
}

function useSideBar() {
    document.querySelector(".burger")
        .addEventListener("click", () => {
            document.querySelector("header").classList.toggle("open");
        })
}

function start() {
    useGlide();
    useHeader();
    useScrollReveal();
    useEffect();
    useSmoothScroll();
    useSideBar();
}

start();