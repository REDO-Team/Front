import api from './api';
import type {
  AllContributionResult,
  ApiResponse,
  ContributionFeedParams,
  MyContributionResult,
} from '../types/contribution';

export const getMyContribution = async (): Promise<MyContributionResult> => {
  const response = await api.get<ApiResponse<MyContributionResult>>(
    '/api/contributions/me',
  );

  if (!response.data.result) {
    throw new Error(
      response.data.message || '나의 기여도 조회에 실패했습니다.',
    );
  }

  return response.data.result;
};

export const getAllContributions = async (
  params?: ContributionFeedParams,
): Promise<AllContributionResult> => {
  const response = await api.get<ApiResponse<AllContributionResult>>(
    '/api/contributions',
    { params },
  );

  if (!response.data.result) {
    throw new Error(
      response.data.message || '전체 기여도 조회에 실패했습니다.',
    );
  }

  return response.data.result;
};
