import AxiosService from ".";
class CheckoutService {
    service;
    constructor() {
        this.service = AxiosService;
    }

    async checkout(payload) {
        return this.service.post('/checkout/create', payload);
    }

}
export default new CheckoutService();