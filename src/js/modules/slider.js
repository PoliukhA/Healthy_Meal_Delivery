function slider({container, pagination, prevArrow, nextArrow, wrapper, field}) {

    const slides = document.querySelectorAll(container),
    indicators = document.querySelector(pagination),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

    let offset = 0;
    let slideIndex = 1;
    let dots = [];

    function dotsOpacity() {
    dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    };

    for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('offer__indicators-dot');
    
    dot.setAttribute('data-slide', i + 1)

    if (i == 0) {
        dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
    }

    slidesField.style.width = 100 * slides.length + '%';

    slides.forEach(slide => {
    slide.style.width = width;
    });

    function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += deleteNotDigits(width);
    }
    
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    dotsOpacity();
    });

    prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
        offset -= deleteNotDigits(width);
    }
    
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    dotsOpacity();
    });

    dots.forEach (dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide');

        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        dotsOpacity();
    });
    });
}

export default slider;