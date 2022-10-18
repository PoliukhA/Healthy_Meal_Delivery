import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'icons/spinner.svg',
        success: {
            text: 'Thank you! We will get back to you soon',
            img: 'icons/checked.png'},
        error: {
            text: 'Oops! Something went wrong.',
            img: 'icons/error.png'
        }
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.classList.add('spinner');
            statusMessage.src = message.loading;
            form.append(statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
            }).catch(() => {
                    showThanksModal(message.error);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add('hide');
        openModal('.modal');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <img class ="modal__img" src="${message.img}" alt="${message.text}">
                <div class="modal__title">${message.text}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove;
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 500000);
    }

    //Discount

    const modalDiscount = document.querySelector('.modal-discount'),
          discountCloseBtn = document.querySelector('[data-close="second-close"]');
          

    function openDiscount() {
        modalDiscount.classList.add('show');
        modalDiscount.classList.remove('hide');
        // clearInterval(modalTimerId);
    }

    function closeDiscount() {
        modalDiscount.classList.add('hide');
        modalDiscount.classList.remove('show');
    }
    
    discountCloseBtn.addEventListener('click', closeDiscount);

    // const modalTimerId = setTimeout(openDiscount, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openDiscount();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default forms;