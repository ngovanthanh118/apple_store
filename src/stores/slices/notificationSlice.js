import { createAsyncThunk } from '@reduxjs/toolkit'
import notificationSevice from '../../services/notificationSevice';
const getNotificationList = createAsyncThunk(
    'notification/list',
    async () => {
        const res = await notificationSevice.getNotifications()
        return res;
    }
)

export const notificationPrvSliceActions = { getNotificationList };

