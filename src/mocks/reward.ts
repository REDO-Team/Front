import type {
    RewardHistory,
    RewardProduct,
    RewardSummary,
} from '../types/reward';

export const mockRewardSummary: RewardSummary = {
    nickname: '지구',
    currentPoint: 5000,
    monthlyPoint: 1200,
};

export const mockRewardHistory: RewardHistory[] = [
    {
        id: 1,
        title: '분리수거 인증',
        type: 'EARN',
        point: 500,
        createdAt: '2026-06-21T12:00:00Z',
    },
    {
        id: 2,
        title: '분리수거 인증',
        type: 'EARN',
        point: 500,
        createdAt: '2026-06-21T12:00:00Z',
    },
    {
        id: 3,
        title: '분리수거 인증',
        type: 'EARN',
        point: 500,
        createdAt: '2026-06-21T12:00:00Z',
    },
    {
        id: 4,
        title: '친환경 수세미 교환',
        type: 'USE',
        point: -1000,
        createdAt: '2026-06-21T12:00:00Z',
    },
    {
        id: 5,
        title: '분리수거 인증',
        type: 'EARN',
        point: 300,
        createdAt: '2026-06-18T09:30:00Z',
    },
    {
        id: 6,
        title: '다회용 컵 교환',
        type: 'USE',
        point: -1500,
        createdAt: '2026-06-15T14:20:00Z',
    },
    {
        id: 7,
        title: '분리수거 인증',
        type: 'EARN',
        point: 500,
        createdAt: '2026-06-12T11:10:00Z',
    },
    {
        id: 8,
        title: '친환경 장바구니 교환',
        type: 'USE',
        point: -2000,
        createdAt: '2026-06-08T16:40:00Z',
    },
    {
        id: 9,
        title: '분리수거 인증',
        type: 'EARN',
        point: 400,
        createdAt: '2026-06-05T08:50:00Z',
    },
    {
        id: 10,
        title: '분리수거 인증',
        type: 'EARN',
        point: 500,
        createdAt: '2026-06-01T13:15:00Z',
    },
    {
        id: 11,
        title: '친환경 수세미 교환',
        type: 'USE',
        point: -1000,
        createdAt: '2026-05-28T10:00:00Z',
    },
    {
        id: 12,
        title: '분리수거 인증',
        type: 'EARN',
        point: 300,
        createdAt: '2026-05-24T15:30:00Z',
    },
];

export const mockRewardProducts: RewardProduct[] = [
    {
        id: 1,
        name: '친환경 수세미 1개입',
        type: 'PARTNER',
        point: 1000,
    },
    {
        id: 2,
        name: '기프티콘 5,000원권',
        type: 'GIFTICON',
        point: 5000,
    },
    {
        id: 3,
        name: '친환경 대나무 칫솔',
        type: 'PARTNER',
        point: 1500,
    },
    {
        id: 4,
        name: '카페 음료 기프티콘',
        type: 'GIFTICON',
        point: 4500,
    },
    {
        id: 5,
        name: '재생 플라스틱 화분',
        type: 'PARTNER',
        point: 2000,
    },
    {
        id: 6,
        name: '편의점 모바일 상품권 3,000원권',
        type: 'GIFTICON',
        point: 3000,
    },
    {
        id: 7,
        name: '천연 설거지 비누',
        type: 'PARTNER',
        point: 1200,
    },
    {
        id: 8,
        name: '영화 관람 기프티콘',
        type: 'GIFTICON',
        point: 6000,
    },
];
