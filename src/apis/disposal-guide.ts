import type { DisposalGuideResponse } from '../types/disposal-guide';
import api from './api';

export const getDisposalGuide = async (name: string): Promise<DisposalGuideResponse> => {
  const response = await api.get(`/api/guides`, {
    params: { name },
  });

  return response.data;
};
