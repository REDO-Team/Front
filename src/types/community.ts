import type { CommonResponse } from './common';

export interface MyCommunityItem {
  communityId: number;
  title: string;
  preview: string;
  category: string;
  imageUrl: string | null;
  numComments: number;
  numLikes: number;
  createdAt: string;
}

export interface MyCommentItem {
  commentId: number;
  content: string;
  createdAt: string;
  communityId: number;
  communityTitle: string;
  communityCategory: string;
  communityImageUrl: string | null;
}

export interface CommunityPageResult<T> {
  items: T[];
  page: number;
  size: number;
  hasNext: boolean;
}

export type MyCommunityListResponse = CommonResponse<
  CommunityPageResult<MyCommunityItem>
>;

export type MyCommentListResponse = CommonResponse<
  CommunityPageResult<MyCommentItem>
>;

