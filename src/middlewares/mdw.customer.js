import { setSessionItem } from "../helpers/handleStorage";
const customerMiddleware = store => next => action => {
    const result = next(action);
    setSessionItem('customer', store.getState().customer.value)
    return result;
};

export default customerMiddleware;