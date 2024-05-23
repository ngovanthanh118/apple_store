import { setLocalStorageItem } from "../helpers/handleStorage";
const cartMiddleware = store => next => action => {
    const result = next(action);
    setLocalStorageItem('cart', store.getState().cart.value)
    return result;
};

export default cartMiddleware;