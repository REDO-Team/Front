import api from './api';

export const getCommunityList = async () => {
    const response = await api.get('/api/community');
    return response.data;
};

export const getCommunityDetail = async (communityId: number) => {
    const response = await api.get(`/api/community/${communityId}`);
    return response.data;
};

export const postCommunity = async (communityData: any) => {
    const response = await api.post('/api/community', communityData, {
        headers: { 'Content-Type': 'application/json' },
    });
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

export const likeCommunity = async (communityId: number) => {
    const response = await api.post(`/api/community/${communityId}/like`);
    return response.data;
};

export const unlikeCommunity = async (communityId: number) => {
    const response = await api.post(`/api/community/${communityId}/unlike`);
    return response.data;
};
