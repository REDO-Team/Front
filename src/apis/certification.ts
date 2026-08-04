import type { CertificationRequest, CertificationResponse, CertificationRuleResponse } from '../types/certification';
import api from './api';

// 인증 홈
export const getCertificationRule = async (): Promise<CertificationRuleResponse> => {
  const response = await api.get(`/api/certification`);

  return response.data;
};

// 신규 인증
export const postCertification = async ({ image, certificationSource, recycleGuideId }: CertificationRequest): Promise<CertificationResponse> => {
  const formData = new FormData();

  formData.append('image', image);
  formData.append('certificationSource', certificationSource);

  if (recycleGuideId !== null) {
    formData.append('recycleGuideId', recycleGuideId.toString());
  }

  const response = await api.post('/api/certification', formData);

  return response.data;
};
