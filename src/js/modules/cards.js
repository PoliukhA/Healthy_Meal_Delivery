import {getData} from '../services/services';

function cards() {
    class MenuCard {
        constructor(img, alt, title, descr, price, parent) {
          this.img = img;
          this.alt = alt;
          this.title = title;
          this.descr = descr;
          this.price = price;
          this.parent = document.querySelector(parent);
        }

        render() {
            const element = document.createElement('div');

            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.img} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Price:</div>
                        <div class="menu__item-total"><span>${this.price}</span> $/day</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { //деструктуризация
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            })
        });
}

export default cards;