import Paper from '/src/assets/icons/paper.svg?react';
import Plastic from '/src/assets/icons/plastic.svg?react';
import Can from '/src/assets/icons/can.svg?react';
import Glass from '/src/assets/icons/glass.svg?react';

export const CATEGORY_LIST = [
  {
    icon: Paper,
    category: '종이',
  },
  {
    icon: Plastic,
    category: '플라스틱',
  },
  {
    icon: Can,
    category: '캔',
  },
  {
    icon: Glass,
    category: '유리',
  },
];

export const CATEGORY_DETAILS = [
  {
    category: '종이',
    details: ['종이팩', '신문지', '박스', '종이컵', '기타'],
  },
  {
    category: '플라스틱',
    details: ['투명 PET', '일반 PET', '기타', '플라스틱 용기'],
  },
  {
    category: '캔',
    details: ['음료캔', '통조림', '기타', '스프레이 캔'],
  },
  {
    category: '유리',
    details: ['유리병', '유리 용기', '기타', '내열/특수 유리'],
  },
];
