function menu() {
    const menu = document.querySelector('.header'),
    menuItem = document.querySelectorAll('.header__link'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('header_active');
    });

    menuItem.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    })
    });
}

export default menu;