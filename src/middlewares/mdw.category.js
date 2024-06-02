import { setLocalStorageItem } from "../helpers/handleStorage";
const categoryMiddleware = store => next => action => {
    const result = next(action);
    setLocalStorageItem('categories', store.getState().categories.value)
    return result;
};

export default categoryMiddleware;