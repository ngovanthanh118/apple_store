import AxiosService from ".";

class NotificationService {
    service;
    constructor() {
        this.service = AxiosService
    }

    async getNotifications() {
        return this.service.get('/notifications');
    }
}
export default new NotificationService();