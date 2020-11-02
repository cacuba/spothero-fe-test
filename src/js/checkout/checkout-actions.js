export const CHECKOUT_UPDATE_USER = 'CHECKOUT_UPDATE_USER';

export const updateUser = user => {
    return {
        type: CHECKOUT_UPDATE_USER,
        payload: user
    };
};
