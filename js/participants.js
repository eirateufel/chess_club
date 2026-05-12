const list = document.querySelector(".participants__list");
const items = document.querySelectorAll(".participants__participant");
const buttons = document.querySelectorAll(".participants__carousel-button");
const count = document.querySelector(".participants__slide-index");

const total = items.length;

function getStep() {
    return list.clientWidth;
}

function getVisibleCount() {
    return window.matchMedia("(max-width: 1222px)").matches ? 1 : 3;
}

function getCurrentIndex() {
    return Math.round(list.scrollLeft / getStep());
}

function updateCounter() {
    const visible = getVisibleCount();
    if (visible === 1) {
        const index = Math.round(list.scrollLeft / getStep());
        count.textContent = `${index + 1}`;
    } else {
        const page = Math.round(list.scrollLeft / getStep());
        const end = Math.min((page + 1) * visible, total);

        count.textContent = `${end}`;
    }
}

function next() {
    const maxScroll = list.scrollWidth - list.clientWidth;

    const isEnd = list.scrollLeft >= maxScroll - 5;

    if (isEnd) {
        list.scrollTo({
            left: 0,
            behavior: "smooth"
        });
    } else {
        list.scrollBy({
            left: getStep(),
            behavior: "smooth"
        });
    }
}

function prev() {
    const maxScroll = list.scrollWidth - list.clientWidth;

    const isStart = list.scrollLeft <= 5;

    if (isStart) {
        list.scrollTo({
            left: maxScroll,
            behavior: "smooth"
        });
    } else {
        list.scrollBy({
            left: -getStep(),
            behavior: "smooth"
        });
    }
}

buttons[0].addEventListener("click", prev);
buttons[1].addEventListener("click", next);

list.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateCounter);
});

window.addEventListener("resize", updateCounter);

updateCounter();

let autoplay;

function startAutoplay() {
    clearInterval(autoplay);

    autoplay = setInterval(() => {
        next();
    }, 4000);
}

function stopAutoplay() {
    clearInterval(autoplay);
}

list.addEventListener("mouseenter", stopAutoplay);
//list.addEventListener("mouseleave", startAutoplay);

//startAutoplay();