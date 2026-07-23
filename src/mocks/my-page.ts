export interface MyPageUser {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  totalPoint: number;
}

export const MOCK_MY_PAGE_USER: MyPageUser = {
  userId: 1,
  nickname: '지구',
  profileImageUrl: 'BLUE',
  totalPoint: 5000,
};