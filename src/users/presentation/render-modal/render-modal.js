import modalHtml from './render-modal.html?raw'
import './render-modal.css'
import { User } from '../../models/user';
import { getUsersById } from '../../uses-cases/get-user-by-id';

let modal, form;
let loadedUser = {};
/**
 *
 * @param {String|Number} id
 */
export const showModal = async(id) => {
    modal?.classList.remove('hide-modal');
    loadedUser = {};
    if( !id) return;

    const user = await getUsersById(id);
    serFormValues(user);

}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    form?.reset();

}

/**
 *
 * @param {User} user
 */
const serFormValues = ( user ) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    const check = form.querySelector('[name="isActive"]');
    check.checked = user.isActive;
    loadedUser = user;
}

/**
 *
 * @param {HTMLDivElement} element
 * @param { (userLike) => Promise<void>} callback
 */
export const renderModal = (element, callback) =>{
    if(modal) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';
    element.append(modal);
    form = document.querySelector('form');

    modal.addEventListener('click', (event) => {
        if( event.target.className === 'modal-container'){
            hideModal();
        }
    });

    form.addEventListener('submit', async(event) => {
        event.preventDefault();
        const formData = new FormData( form );
        const userLike = {...loadedUser};

        for (const [key, value] of formData) {
            if( key === 'balance'){
                userLike[key] = +value;
                continue;
            }

            if( key === 'isActive'){
                userLike[key] = (value === 'on') ? true : false;
                continue;
            }


            userLike[key] = value;
        }
        await callback(userLike);

        hideModal();
    });

}