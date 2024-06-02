import AxiosService from ".";
import { getCookie } from "../helpers/handleCookie";

class CommentService {
    service;
    constructor() {
        this.service = AxiosService
    }
    async postComment(payload) {
        return this.service.post('/comments', payload);
    }
    async getComments(id) {
        return this.service.get('/comments/' + id);
    }
}
export default new CommentService();