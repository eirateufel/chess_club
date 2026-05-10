const track = document.querySelector('.development__steps');
const allCards = Array.from(document.querySelectorAll('.development__card'));

const cards = allCards.filter(card => {
    return getComputedStyle(card).display !== 'none';
});

const dots = Array.from(document.querySelectorAll('.development__progress-dot'));

const btnLeft = document.querySelector('.development__carousel-button--left');
const btnRight = document.querySelector('.development__carousel-button--right');

let index = 0;

const totalSlides = dots.length;

function getStepWidth() {
    const card = cards[0];
    return card.getBoundingClientRect().width;
}

function updateUI() {
    const step = getStepWidth();
    console.log('step', step)

    track.scrollTo({
        left: index * step,
        behavior: 'smooth'
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('development__progress-dot--active', i === index);
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
}

btnRight.addEventListener('click', () => {
    if (index < totalSlides - 1) {
        index++;
        updateUI();
    }
});

btnLeft.addEventListener('click', () => {
    if (index > 0) {
        index--;
        updateUI();
    }
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        index = i;
        updateUI();
    });
});

window.addEventListener('resize', updateUI);

updateUI();