import { loadUsersByPage } from "../uses-cases/load-users-by-page";


const state = {
    currentPage : 0,
    users : [],
}

const loadNextPage = async() => {
    const users = await loadUsersByPage(state.currentPage + 1);

    if( users.length === 0) return;

    state.currentPage += 1;
    state.users = users;
}

const loadPreviousPage = async () => {
    if(state.currentPage === 1) return;
    const users = await loadUsersByPage(state.currentPage -1 );

    state.currentPage -= 1;
    state.users = users;
}

const onUserChanged = async () => {
    throw new Error('Not implements');
}

const reloadPage = async () => {
    throw new Error('Not implements');
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    /**
     *
     * @returns {Users[]}
     */
    getUsers : () => [...state.users],
    
    /**
     *
     * @returns {Number}
     */
    getCurrentPage : () => state.currentPage
}