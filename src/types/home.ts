export interface HomeUser {
  nickname: string;
}

export interface HomePointSummary {
  totalPoint: number;
}

export interface HomeServiceMenuItem {
  id: string;
  title: string;
  path: string;
}

export interface HomeCommunityPreview {
  id: number;
  title: string;
  content: string;
  commentCount: number;
}

export interface HomeRewardPreview {
  id: number;
  name: string;
  requiredPoint: number;
  category: string;
}
