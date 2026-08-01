import api from './api';

export const getCommunityList = async () => {
    const response = await api.get('/api/community');
    return response.data;
};

export const getCommunityDetail = async (communityId: number) => {
    const response = await api.get(`/api/community/${communityId}`);
    return response.data;
};

export const createCommunity = async (communityData: any) => {
    const response = await api.post('/api/community', communityData);
    return response.data;
};

export const deleteCommunity = async (communityId: number) => {
    const response = await api.delete(`/api/community/${communityId}`);
    return response.data;
};

export const getComments = async (communityId: number) => {
    const response = await api.get(`/api/community/${communityId}/comments`);
    return response.data;
};

export const createComment = async (communityId: number, commentData: any) => {
    const response = await api.post(`/api/community/${communityId}/comments`, commentData);
    return response.data;
};

export const deleteComment = async (communityId: number, commentId: number) => {
    const response = await api.delete(`/api/community/${communityId}/comment/${commentId}`);
    return response.data;
};

export const likeCommunity = async (communityId: number) => {
    const response = await api.post(`/api/community/${communityId}/like`);
    return response.data;
};

export const unlikeCommunity = async (communityId: number) => {
    const response = await api.post(`/api/community/${communityId}/unlike`);
    return response.data;
};
