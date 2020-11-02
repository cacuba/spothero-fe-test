import {CHECKOUT_UPDATE_USER} from './checkout-actions';

const initialState = {
    user: null
};

export default function checkout(state = initialState, {type, payload}) {
    switch (type) {
        case CHECKOUT_UPDATE_USER: {
            return {
                ...state,
                user: payload || null
            };
        }

        default:
            return state;
    }
}
