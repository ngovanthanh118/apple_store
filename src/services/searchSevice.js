import AxiosService from ".";

class SearchService {
    service;
    constructor() {
        this.service = AxiosService
    }
    async search(payload) {
        return this.service.get('/search?q=' + payload);
    }
}
export default new SearchService();