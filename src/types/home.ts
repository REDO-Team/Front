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
  icon: 'trash' | 'camera' | 'reward' | 'chart';
}

export interface HomeCommunityPreview {
  id: number;
  category: string;
  title: string;
  content: string;
  author: string;
  createdAtText: string;
  commentCount: number;
}

export interface HomeRewardPreview {
  id: number;
  name: string;
  requiredPoint: number;
  category: string;
  imageAlt: string;
  imageVariant: 'plant' | 'gift-card';
}
