import Paper from '/src/assets/icons/paper.svg?react';
import Plastic from '/src/assets/icons/plastic.svg?react';
import Can from '/src/assets/icons/can.svg?react';
import Glass from '/src/assets/icons/glass.svg?react';
import Trash from '/src/assets/icons/etc-trash.svg?react';
import GreenCharacter from '/src/assets/icons/character/green-character.svg';
import GrayCharacter from '/src/assets/icons/character/gray-character.svg';
import OrangeCharacter from '/src/assets/icons/character/orange-character.svg';
import PurpleCharacter from '/src/assets/icons/character/purple-character.svg';
import BlueCharacter from '/src/assets/icons/character/blue-character.svg';

export const CATEGORY_LIST = [
  {
    icon: Paper,
    category: '종이',
    image: GreenCharacter,
  },
  {
    icon: Plastic,
    category: '플라스틱',
    image: BlueCharacter,
  },
  {
    icon: Can,
    category: '캔',
    image: GrayCharacter,
  },
  {
    icon: Glass,
    category: '유리',
    image: OrangeCharacter,
  },
  {
    icon: Trash,
    category: '기타',
    image: PurpleCharacter,
  },
];

export const CATEGORY_DETAILS = [
  {
    category: '종이',
    details: ['종이팩', '신문지', '박스', '종이컵'],
  },
  {
    category: '플라스틱',
    details: ['투명 PET', '일반 PET', '플라스틱 용기'],
  },
  {
    category: '캔',
    details: ['음료캔', '통조림 캔', '스프레이 캔'],
  },
  {
    category: '유리',
    details: ['유리병', '유리용기', '내열/특수 용기'],
  },
  {
    category: '기타',
    details: ['일반쓰레기', '비닐', '스티로폼'],
  },
];
