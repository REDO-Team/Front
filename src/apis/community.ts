import api from './api';

export const getCommunityList = async () => {
    const response = await api.get('/api/community');
    return response.data;
};

export const getCommunityDetail = async (communityId: number) => {
    const response = await api.get(`/api/community/${communityId}`);
    return response.data;
};

export const postCommunity = async (formData: FormData) => {
    const response = await api.post('/api/community', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const deleteCommunity = async (communityId: number) => {
    const response = await api.delete(`/api/community/${communityId}`);
    return response.data;
};

export const updateCommunity = async (communityId: number, formData: FormData) => {
    const response = await api.post(`/api/community/${communityId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const getComments = async (communityId: number) => {
    const response = await api.get(`/api/community/${communityId}/comments`);
    return response.data;
};

export const postComment = async (communityId: number, content: string) => {
    const response = await api.post(`/api/community/${communityId}/comments`,
        { comment: content },
        { headers: { 'Content-Type': 'application/json' } });
    return response.data;
};

export const deleteComment = async (communityId: number, commentId: number) => {
    const response = await api.delete(`/api/community/${communityId}/comment/${commentId}`);
    return response.data;
};

export const updateComment = async (communityId: number, commentId: number, content: string) => {
    const response = await api.patch(`/api/community/${communityId}/comment/${commentId}`,
        { comment: content },
        { headers: { 'Content-Type': 'application/json' } });
    return response.data;
}

export const likeCommunity = async (communityId: number) => {
    const response = await api.post(`/api/community/${communityId}/like`);
    return response.data;
};

export const unlikeCommunity = async (communityId: number) => {
    const response = await api.post(`/api/community/${communityId}/unlike`);
    return response.data;
};
