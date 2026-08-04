import type { CertificationRuleResponse } from '../types/certification';
import api from './api';

// 인증 홈
export const getCertificationRule = async (): Promise<CertificationRuleResponse> => {
  const response = await api.get(`/api/certification`);

  return response.data;
};
