import {closeModal, openModal} from './modal';
import {postData} from '../sevices/services';

function forms(formSelector, modalTamerId) {


    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/054 spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = Object.fromEntries(formData.entries());

            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksDialog(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksDialog(message.failure);
            })
            .finally(() => {
                form.reset();
            });  
            
        });
    }

    function showThanksDialog(message) {
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');
        openModal('.modal', modalTamerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            thanksModal.remove();
            closeModal('.modal');
        }, 3000);

    }

}

export default forms;