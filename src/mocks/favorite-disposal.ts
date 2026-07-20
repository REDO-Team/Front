export interface FavoriteDisposal {
  id: number;
  title: string;
  createdAt: string;
  category: string;
  name: string;
  content: string;
  guide: string[];
  info?: string;
}

export const MOCK_FAVORITE_DISPOSALS: FavoriteDisposal[] = [
  {
    id: 1,
    title: '오염된 배달 용기 쉽게 배출하는 법',
    createdAt: '2026.06.10',
    category: '플라스틱',
    name: '투명 페트병',
    content: '분리배출이 가능한 품목이에요',
    guide: [
      '비닐 라벨을 뜯어 따로 분리해요',
      '내용물을 비우고 물로 헹궈요',
      '찌그러뜨려 부피를 줄여요',
      '투명 페트병 전용함에 배출해요',
    ],
    info: '라벨, 뚜껑은 비닐/플라스틱으로 따로 버려요',
  },
  {
    id: 2,
    title: '종이팩 쉽게 배출하는 법',
    createdAt: '2026.05.02',
    category: '종이',
    name: '종이팩',
    content: '분리배출이 가능한 품목이에요',
    guide: [
      '내용물을 모두 비워요',
      '물로 가볍게 헹궈요',
      '말린 후 펼쳐서 배출해요',
    ],
    info: '종이류와 구분하여 종이팩 전용 수거함에 배출하세요.',
  },
  {
    id: 3,
    title: '공병 배출하는 법',
    createdAt: '2026.04.19',
    category: '유리',
    name: '공병',
    content: '분리배출이 가능한 품목이에요',
    guide: [
      '내용물을 모두 비워요',
      '병뚜껑을 분리해요',
      '이물질을 제거한 후 배출해요',
    ],
    info: '깨진 유리는 일반 공병과 함께 배출하면 안 됩니다.',
  },
];