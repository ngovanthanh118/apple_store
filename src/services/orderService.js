import AxiosService from ".";

class OrderService {
    service;
    constructor() {
        this.service = AxiosService
    }
    async createOrder(payload) {
        return this.service.post('/orders/create', payload)
    }
    async getOrders(payload) {
        return this.service.get('/orders/' + payload + '/list')
    }
    async getOrder(payload) {
        return this.service.get('/orders/' + payload + '/detail')
    }
    async cancelOrder(payload) {
        return this.service.put('/orders/cancel/' + payload);
    }
}
export default new OrderService();