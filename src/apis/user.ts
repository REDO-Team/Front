import api from './api';
import type { CharacterCode } from '../constants/character';

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  errorDetail?: string | null;
}

export type ProfileGender = 'MALE' | 'FEMALE';

export interface CreateProfileRequest {
  nickname: string;
  characterCode: CharacterCode;
  gender: ProfileGender;
  birthDate: string;
}

interface ProfileResult {
  nickname: string;
  characterCode: CharacterCode;
  gender: ProfileGender;
  birthDate: string;
}

export interface MyInfo {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  characterCode: CharacterCode | null;
  totalPoint: number;
}

export interface WithdrawalReason {
  reasonId: number;
  label: string;
}

interface WithdrawalReasonsResult {
  reasons: WithdrawalReason[];
}

/**
 * 최초 프로필 생성
 */
export const createProfile = async (
  body: CreateProfileRequest,
): Promise<ProfileResult> => {
  const response = await api.post<ApiResponse<ProfileResult>>(
    '/api/users/me/profile',
    body,
  );

  return response.data.result;
};

/**
 * 현재 로그인한 사용자 정보 조회
 */
export const getMyInfo = async (): Promise<MyInfo> => {
  const response = await api.get<ApiResponse<MyInfo>>(
    '/api/users/me',
  );

  return response.data.result;
};

/**
 * 닉네임 수정
 */
export const updateNickname = async (
  nickname: string,
): Promise<void> => {
  await api.patch<ApiResponse<string>>(
    '/api/users/me/profile/nickname',
    {
      nickname,
    },
  );
};

/**
 * 기본 캐릭터 수정
 */
export const updateCharacter = async (
  characterCode: CharacterCode,
): Promise<void> => {
  await api.patch<ApiResponse<string>>(
    '/api/users/me/profile/character',
    {
      characterCode,
    },
  );
};

/**
 * 직접 선택한 프로필 이미지 업로드
 */
export const uploadProfileImage = async (
  profileImage: File,
): Promise<string> => {
  const formData = new FormData();

  formData.append('profileImage', profileImage);

  const response = await api.patch<
    ApiResponse<{ profileImageUrl: string }>
  >('/api/users/me/profile/image', formData);

  return response.data.result.profileImageUrl;
};

/**
 * 회원탈퇴 사유 조회
 */
export const getWithdrawalReasons = async (): Promise<
  WithdrawalReason[]
> => {
  const response = await api.get<
    ApiResponse<WithdrawalReasonsResult>
  >('/api/users/withdrawal-reasons');

  return response.data.result.reasons;
};

/**
 * 회원탈퇴
 */
export const withdrawUser = async (
  reasonId: number,
): Promise<void> => {
  await api.post<ApiResponse<string>>(
    '/api/users/me/withdrawal',
    {
      reasonId,
    },
  );
};