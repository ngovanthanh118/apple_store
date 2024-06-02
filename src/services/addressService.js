import axios from "axios";
class AddressService {
    service;
    constructor() {
        const service = axios.create({
            responseType: 'json',
            baseURL: process.env.REACT_APP_API_ADDRESS || '',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.service = service;
    }
    async getProvinces() {
        return this.service.get('/province/');
    }
    async getDistricts(id) {
        return this.service.get('/province/district/' + id);
    }
    async getWards(id) {
        return this.service.get('/province/ward/' + id);
    }
    async get(endpoint, options) {
        return this.service.get(endpoint, options);
    }

}
export default new AddressService();