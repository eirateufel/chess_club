export default function initDevelopmentSlider() {
    const track = document.querySelector('.development__steps');

    if (!track) return;

    const allCards = Array.from(
        document.querySelectorAll('.development__card')
    );

    const dots = Array.from(
        document.querySelectorAll('.development__progress-dot')
    );

    const btnLeft = document.querySelector(
        '.development__carousel-button--left'
    );

    const btnRight = document.querySelector(
        '.development__carousel-button--right'
    );

    if (!btnLeft || !btnRight) return;


    const totalSlides = dots.length;

    let index = 0;

    const getVisibleCards = () => {
        return allCards.filter(card => {
            return getComputedStyle(card).display !== 'none';
        });
    };

    const getStepWidth = () => {
        const cards = getVisibleCards();

        if (!cards.length) return 0;

        return cards[0].getBoundingClientRect().width;
    };

    const updateUI = () => {
        const step = getStepWidth();

        track.scrollTo({
            left: index * step,
            behavior: 'smooth'
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle(
                'development__progress-dot--active',
                i === index
            );
        });

        const isFirst = index === 0;
        const isLast = index === totalSlides - 1;

        btnLeft.classList.toggle(
            'development__carousel-button--disabled',
            isFirst
        );

        btnRight.classList.toggle(
            'development__carousel-button--disabled',
            isLast
        );

        btnLeft.disabled = isFirst;
        btnRight.disabled = isLast;
    };

    const handleNext = () => {
        if (index < totalSlides - 1) {
            index++;
            updateUI();
        }
    };

    const handlePrev = () => {
        if (index > 0) {
            index--;
            updateUI();
        }
    };

    btnRight.addEventListener('click', handleNext);
    btnLeft.addEventListener('click', handlePrev);

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            index = i;
            updateUI();
        });
    });

    window.addEventListener('resize', updateUI);

    updateUI();
}