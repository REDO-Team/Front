import type {
    AddressSearchResponse,
    RewardProduct,
    RewardShippingAddress,
    RewardSummary,
    ShippingAddressListResponse,
} from '../types/reward';

export const mockRewardSummary: RewardSummary = {
    nickname: '지구',
    currentPoint: 5000,
    monthlyPoint: 1200,
};

export const mockRecentShippingAddress: RewardShippingAddress | null = null;

export const mockRewardProducts: RewardProduct[] = [
    {
        id: 1,
        name: '친환경 수세미 1개입',
        type: 'PARTNER',
        point: 1000,
        description: '자연 소재로 만든 다회용 친환경 수세미입니다.',
    },
    {
        id: 2,
        name: '기프티콘 5,000원권',
        type: 'GIFTICON',
        point: 5000,
        usageGuide: '결제 시 모바일 쿠폰의 바코드를 제시해 사용해 주세요.',
        validityPeriod: '발급일로부터 90일',
    },
    {
        id: 3,
        name: '친환경 대나무 칫솔',
        type: 'PARTNER',
        point: 1500,
        description: '플라스틱 사용을 줄인 대나무 손잡이 칫솔입니다.',
    },
    {
        id: 4,
        name: '카페 음료 기프티콘',
        type: 'GIFTICON',
        point: 4500,
        usageGuide: '매장 주문 시 모바일 쿠폰을 제시해 주세요.',
        validityPeriod: '발급일로부터 60일',
    },
    {
        id: 5,
        name: '재생 플라스틱 화분',
        type: 'PARTNER',
        point: 2000,
        description: '재생 플라스틱 소재를 활용한 소형 화분입니다.',
    },
    {
        id: 6,
        name: '편의점 모바일 상품권 3,000원권',
        type: 'GIFTICON',
        point: 3000,
        usageGuide: '편의점 결제 시 모바일 상품권 바코드를 제시해 주세요.',
        validityPeriod: '발급일로부터 90일',
    },
    {
        id: 7,
        name: '천연 설거지 비누',
        type: 'PARTNER',
        point: 1200,
        description: '플라스틱 용기 없이 사용할 수 있는 고체형 설거지 비누입니다.',
    },
    {
        id: 8,
        name: '영화 관람 기프티콘',
        type: 'GIFTICON',
        point: 6000,
        usageGuide: '영화관 예매 시 쿠폰 번호를 등록해 사용해 주세요.',
        validityPeriod: '발급일로부터 120일',
    },
];


export const MOCK_EMPTY_SHIPPING_ADDRESS_RESPONSE: ShippingAddressListResponse =
  {
    isSuccess: true,
    code: 'SHIPPING_ADDRESS_200_002',
    message: '배송지 목록 조회에 성공했습니다.',
    result: {
      shippingAddresses: [],
    },
  };

export const MOCK_SHIPPING_ADDRESS_RESPONSE: ShippingAddressListResponse = {
  isSuccess: true,
  code: 'SHIPPING_ADDRESS_200_002',
  message: '배송지 목록 조회에 성공했습니다.',
  result: {
    shippingAddresses: [
      {
        shippingAddressId: 3,
        addressType: 'HOME',
        receiverName: '허건우',
        phone: '010-5685-9058',
        postalCode: '14662',
        address1: '경기도 부천시 원미구 지봉로 43',
        address2: '가톨릭대학교 성심교정',
        isDefault: false,
      },
    ],
  },
};

export const MOCK_ADDRESS_SEARCH_RESPONSE: AddressSearchResponse = {
  isSuccess: true,
  code: 'ADDRESS_SEARCH_200_001',
  message: '주소 검색에 성공했습니다.',
  result: {
    addressCandidates: [
      {
        roadAddress: '경기도 부천시 원미구 지봉로 43',
        jibunAddress:
          '경기도 부천시 원미구 역곡동 산43-1 가톨릭대학교 성심교정',
        postalCode: '14662',
        buildingName: '가톨릭대학교 성심교정',
      },
      {
        roadAddress: '서울특별시 종로구 지봉로 43',
        jibunAddress: '서울특별시 종로구 창신동 243',
        postalCode: '03104',
        buildingName: null,
      },
      {
        roadAddress: '경기도 부천시 원미구 지봉로 43-3',
        jibunAddress: '경기도 부천시 원미구 역곡동 28-3',
        postalCode: '14662',
        buildingName: null,
      },
      {
        roadAddress: '경기도 부천시 원미구 지봉로 43-7',
        jibunAddress: '경기도 부천시 원미구 역곡동 28-10 우석 미소지움',
        postalCode: '14662',
        buildingName: '우석 미소지움',
      },
      {
        roadAddress: '경기도 부천시 원미구 지봉로 43-11',
        jibunAddress: '경기도 부천시 원미구 역곡동 28-11',
        postalCode: '14662',
        buildingName: null,
      },
    ],
    page: 1,
    size: 10,
    totalCount: 5,
    hasNext: false,
  },
};
