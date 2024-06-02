import axios from "axios";
class AxiosService {
    service;
    constructor() {
        const service = axios.create({
            responseType: 'json',
            baseURL: process.env.REACT_APP_API_URL || '',
            headers: {
                'Content-Type': 'application/json',
                'x-timestamp': new Date().getTime(),
                'x-custom-lang': 'en',
            },
        });
        service.interceptors.response.use(this.handleSuccess, this.handlError);
        this.service = service;
    }

    handleSuccess(response) {
        return response.data;
    }
    handlError(error) {
        throw error
    }
    async get(endpoint, options) {
        return this.service.get(endpoint, options);
    }

    async post(endpoint, payload, options) {
        return this.service.post(endpoint, payload, options);
    }
    async put(endpoint, payload, options) {
        return this.service.put(endpoint, payload, options);
    }

    async patch(endpoint, payload, options) {
        return this.service.patch(endpoint, payload, options);
    }

    async delete(endpoint, options) {
        return this.service.delete(endpoint, options);
    }
}
export default new AxiosService();