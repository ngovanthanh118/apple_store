import { createAsyncThunk } from '@reduxjs/toolkit'
import commentService from '../../services/commentService';
const postComment = createAsyncThunk(
    'comment/post',
    async (payload) => {
        const res = await commentService.postComment(payload)
        return res;
    }
)
const getCommentList = createAsyncThunk(
    'comment/list',
    async (payload) => {
        const res = await commentService.getComments(payload)
        return res;
    }
)

export const commentPrvSliceActions = { postComment, getCommentList };

