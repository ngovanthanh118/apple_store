import axios from "axios";
import { getCookie } from "../ultis";
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
        service.interceptors.request.use(this.handleInterceptRequest);
        service.interceptors.response.use(this.handleSuccess, this.handlError);
        this.service = service;
    }
    handleInterceptRequest(config) {
        const token = getCookie('token');
        if (token) config.headers.token = token;
        return config;
    }
    handleSuccess(response) {
        return response.data;
    }
    handlError(error) {
        throw error
    }
    async get(endpoint) {
        return this.service.get(endpoint);
    }

    async post(endpoint, payload) {
        return this.service.post(endpoint, payload);
    }
    async put(endpoint, payload) {
        return this.service.put(endpoint, payload);
    }

    async patch(endpoint, payload) {
        return this.service.patch(endpoint, payload);
    }

    async delete(endpoint) {
        return this.service.delete(endpoint);
    }
}
export default new AxiosService();