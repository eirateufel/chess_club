export default function initParticipantsSlider() {
    // DOM
    const list = document.querySelector(".participants__list");

    if (!list) return;

    const items = document.querySelectorAll(".participants__participant");
    const buttons = document.querySelectorAll(".participants__carousel-button");
    const count = document.querySelector(".participants__slide-index");

    if (buttons.length < 2 || !count) return;

    // STATE
    const total = items.length;

    let autoplay;

    // HELPERS
    const getStep = () => list.clientWidth;

    const getVisibleCount = () => {
        return window.matchMedia("(max-width: 1222px)").matches
            ? 1
            : 3;
    };

    // UI
    const updateCounter = () => {
        const visible = getVisibleCount();

        if (visible === 1) {
            const index = Math.round(
                list.scrollLeft / getStep()
            );

            count.textContent = `${index + 1}`;

            return;
        }

        const page = Math.round(
            list.scrollLeft / getStep()
        );

        const end = Math.min(
            (page + 1) * visible,
            total
        );

        count.textContent = `${end}`;
    };

    // ACTIONS
    const next = () => {
        const maxScroll =
            list.scrollWidth - list.clientWidth;

        const isEnd =
            list.scrollLeft >= maxScroll - 5;

        if (isEnd) {
            list.scrollTo({
                left: 0,
                behavior: "smooth"
            });

            return;
        }

        list.scrollBy({
            left: getStep(),
            behavior: "smooth"
        });
    };

    const prev = () => {
        const maxScroll =
            list.scrollWidth - list.clientWidth;

        const isStart = list.scrollLeft <= 5;

        if (isStart) {
            list.scrollTo({
                left: maxScroll,
                behavior: "smooth"
            });

            return;
        }

        list.scrollBy({
            left: -getStep(),
            behavior: "smooth"
        });
    };

    // AUTOPLAY
    const startAutoplay = () => {
        clearInterval(autoplay);

        autoplay = setInterval(next, 4000);
    };

    const stopAutoplay = () => {
        clearInterval(autoplay);
    };

    // LISTENERS
    const [prevButton, nextButton] = buttons;
    prevButton.addEventListener("click", prev);
    nextButton  .addEventListener("click", next);

    list.addEventListener("scroll", () => {
        window.requestAnimationFrame(updateCounter);
    });

    list.addEventListener("mouseenter", stopAutoplay);
    list.addEventListener("mouseleave", startAutoplay);

    window.addEventListener("resize", updateCounter);

    // INIT
    updateCounter();
    startAutoplay();
}