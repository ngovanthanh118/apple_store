import AxiosService from ".";

class CategoryService {
    service;
    constructor() {
        this.service = AxiosService
    }
    async getAllCategories() {
        return this.service.get('/categories');
    }
    async getProductsByCategoryId(id) {
        return this.service.get('/categories/' + id);
    }
}
export default new CategoryService();