export interface MyComment {
  id: number;
  content: string;
  createdAt: string;
}

export const MOCK_MY_COMMENTS: MyComment[] = [
  {
    id: 1,
    content: '유용한 정보 감사합니다!!',
    createdAt: '2026.06.04',
  },
  {
    id: 2,
    content: '친구들한테 공유해야겠어요',
    createdAt: '2026.05.10',
  },
];