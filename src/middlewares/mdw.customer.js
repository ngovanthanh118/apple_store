import { setSessionItem } from "../helpers/handleStorage";
const customerMiddleware = store => next => action => {
    const result = next(action);
    if (!!!store.getState().customer.value) {
        setSessionItem('customer', {});
        return;
    }
    setSessionItem('customer', store.getState().customer.value)
    return result;
};

export default customerMiddleware;