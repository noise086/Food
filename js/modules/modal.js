function openModal(modalSelector, modalTamerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    console.log(modalTamerId);
    
    if (modalTamerId) {
        clearTimeout(modalTamerId); 
    }
} 
function closeModal (modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTamerId) {

    const modalBtn = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);


    modalBtn.forEach(element => {
        element.addEventListener('click',() => openModal(modalSelector, modalTamerId));
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
            }   
        });    

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });



    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTamerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener ('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};