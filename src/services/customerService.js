import AxiosService from ".";
import { getCookie } from "../helpers/handleCookie";
class CustomerService {
    service;
    constructor() {
        this.service = AxiosService;
    }
    async signIn(payload) {
        return this.service.post('/users/login', payload, {
            headers: {
                token: getCookie('token')
            }
        });
    }
    async signUp(payload) {
        return this.service.post('/users/register', payload);
    }
    async updateProfile(id, payload) {
        return this.service.put('/users/' + id, payload, {
            headers: {
                "Content-Type": !!payload.image ? 'multipart/form-data' : 'application/json',
            }
        })
    }
}
export default new CustomerService();