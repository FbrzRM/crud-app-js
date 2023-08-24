import { localHostUserToModel } from "../mappers/localhost-user.mapper";
import { userToModelLocalhost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user";

/**
 *
 * @param {Like<User>} userLike
 */

export const saveUser = async( likeUser) => {
    const user = new User(likeUser);

    if( !user.firstName || !user.lastName)
        throw 'First & Last name are required';

    const userToSave = userToModelLocalhost( user );

    let userUpdated;
    if(user.id){
        userUpdated = await updateUser(userToSave);
    }else{
        userUpdated = await createUser( userToSave );
    }

    return localHostUserToModel(userUpdated);
}

/**
 *
 * @param {Like<User>} user
 */
const createUser = async(user) =>{
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch(url, {
        method: 'Post',
        body:JSON.stringify(user),
        headers: {
            'Content-type':'application/json'
        }
    });

    const newUser = await res.json();
    return newUser;
}

/**
 *
 * @param {Like<User>} user
 */
const updateUser = async(user) =>{
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const res = await fetch(url, {
        method: 'PATCH',
        body:JSON.stringify(user),
        headers: {
            'Content-type':'application/json'
        }
    });

    const updatedUser = await res.json();
    return updatedUser;
}


