import api from './api';

export interface Term {
  termId: number;
  code: string;
  title: string;
  content: string;
  isRequired: boolean;
}

interface TermsResult {
  terms: Term[];
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  errorDetail: string | null;
}

export const getTerms = async (): Promise<Term[]> => {
  const response =
    await api.get<ApiResponse<TermsResult>>('/api/terms');

  return response.data.result.terms;
};