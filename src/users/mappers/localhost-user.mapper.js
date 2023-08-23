import { User } from "../models/user"

/**
 *
 * @param {Like<User>} localHost
 * @returns User
 */
export const localHostUserToModel = (localHost) =>{

    const {
        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name
    } = localHost;
    return new User({
        avatar,
        balance,
        firstName: first_name,
        gender,
        id,
        isActive,
        lastName: last_name
    });
}