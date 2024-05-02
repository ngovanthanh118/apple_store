import AxiosService from ".";

class ProductService {
    service;
    constructor() {
        this.service = AxiosService
    }
    async getProducts() {
        return this.service.get('/products/list')
    }
    async getProduct(id) {
        return this.service.get('/products/' + id);
    }
}
export default new ProductService();