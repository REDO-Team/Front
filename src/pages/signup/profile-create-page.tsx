import {
  type ComponentType,
  type SVGProps,
  useState,
} from 'react';

import LeftArrowIcon from '../../assets/icons/left-arrow.svg?react';

import YellowCharacter from '../../assets/icons/character/yellow-character.svg?react';
import YellowCharacterSelected from '../../assets/icons/character/yellow-character-selected.svg?react';
import GrayCharacter from '../../assets/icons/character/gray-character.svg?react';
import GrayCharacterSelected from '../../assets/icons/character/gray-character-selected.svg?react';
import GreenCharacter from '../../assets/icons/character/green-character.svg?react';
import GreenCharacterSelected from '../../assets/icons/character/green-character-selected.svg?react';
import OrangeCharacter from '../../assets/icons/character/orange-character.svg?react';
import OrangeCharacterSelected from '../../assets/icons/character/orange-character-selected.svg?react';
import PurpleCharacter from '../../assets/icons/character/purple-character.svg?react';
import PurpleCharacterSelected from '../../assets/icons/character/purple-character-selected.svg?react';
import BlueCharacter from '../../assets/icons/character/blue-character.svg?react';
import BlueCharacterSelected from '../../assets/icons/character/blue-character-selected.svg?react';

import MaleIcon from '../../assets/icons/gender/male.svg?react';
import MaleSelectedIcon from '../../assets/icons/gender/male-selected.svg?react';
import FemaleIcon from '../../assets/icons/gender/female.svg?react';
import FemaleSelectedIcon from '../../assets/icons/gender/female-selected.svg?react';

type Gender = 'male' | 'female' | null;

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface CharacterItem {
  id: number;
  label: string;
  defaultIcon: SvgComponent;
  selectedIcon: SvgComponent;
}

const CHARACTER_ITEMS: CharacterItem[] = [
  {
    id: 1,
    label: '노란색 캐릭터',
    defaultIcon: YellowCharacter,
    selectedIcon: YellowCharacterSelected,
  },
  {
    id: 2,
    label: '회색 캐릭터',
    defaultIcon: GrayCharacter,
    selectedIcon: GrayCharacterSelected,
  },
  {
    id: 3,
    label: '초록색 캐릭터',
    defaultIcon: GreenCharacter,
    selectedIcon: GreenCharacterSelected,
  },
  {
    id: 4,
    label: '주황색 캐릭터',
    defaultIcon: OrangeCharacter,
    selectedIcon: OrangeCharacterSelected,
  },
  {
    id: 5,
    label: '보라색 캐릭터',
    defaultIcon: PurpleCharacter,
    selectedIcon: PurpleCharacterSelected,
  },
  {
    id: 6,
    label: '파란색 캐릭터',
    defaultIcon: BlueCharacter,
    selectedIcon: BlueCharacterSelected,
  },
];

const ProfileCreatePage = () => {
  const [nickname, setNickname] = useState('');
  const [selectedCharacterId, setSelectedCharacterId] = useState<
    number | null
  >(null);
  const [gender, setGender] = useState<Gender>(null);
  const [birthDate, setBirthDate] = useState('');

  const isValid =
    nickname.trim() !== '' &&
    selectedCharacterId !== null &&
    gender !== null &&
    birthDate.trim() !== '';

  return (
    <div className='mx-auto flex h-dvh w-full max-w-[402px] flex-col overflow-hidden bg-white font-pretendard text-text'>
      {/* 상단 헤더 */}
      <header className='shrink-0 px-5 pt-[28px]'>
        <div className='flex h-[22px] items-center'>
          <button
            type='button'
            aria-label='뒤로가기'
            className='flex h-6 w-6 shrink-0 items-center justify-center'
          >
            <LeftArrowIcon className='h-[18px] w-[9px]' />
          </button>

          <h1 className='ml-[8px] text-[18px] font-semibold leading-[100%] text-[#111111]'>
            프로필 생성
          </h1>
        </div>
      </header>

      {/* 내용 영역 */}
      <main className='min-h-0 flex-1 overflow-y-auto px-5 pb-6'>
        {/* 프로필 이미지 */}
        <div className='mt-[35px] flex w-full justify-center'>
          <div className='h-[122px] w-[122px] rounded-full bg-[#C4C4C4] shadow-[0_4px_4px_rgba(0,0,0,0.1)]' />
        </div>

        <section className='mt-[20px] flex w-full flex-col'>
          {/* 닉네임 */}
          <div className='flex w-full flex-col'>
            <label
              htmlFor='nickname'
              className='mb-[8px] text-[16px] font-semibold leading-[15px] text-[#2A2A2A]'
            >
              닉네임
            </label>

            <input
              id='nickname'
              type='text'
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder='닉네임을 입력하세요'
              className='h-[48px] w-full rounded-[24px] border border-gray-200 bg-gray-50 px-[16px] text-[15px] font-medium leading-[18px] outline-none placeholder:text-[#ACACAC]'
            />
          </div>

          {/* 캐릭터 선택 */}
          <fieldset className='mt-[26px] min-w-0'>
            <legend className='text-[16px] font-semibold leading-[15px] text-[#2A2A2A]'>
              나의 캐릭터
            </legend>

            <div className='mt-[10px] flex h-[70px] w-full gap-[9px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
              {CHARACTER_ITEMS.map((character) => {
                const isSelected =
                  selectedCharacterId === character.id;

                const CharacterIcon = isSelected
                  ? character.selectedIcon
                  : character.defaultIcon;

                return (
                  <button
                    key={character.id}
                    type='button'
                    aria-label={`${character.label} 선택`}
                    aria-pressed={isSelected}
                    onClick={() =>
                      setSelectedCharacterId(character.id)
                    }
                    className='flex h-[70px] w-[70px] shrink-0 items-center justify-center'
                  >
                    <CharacterIcon className='h-[70px] w-[70px]' />
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* 성별 */}
          <fieldset className='mt-[26px] min-w-0'>
            <legend className='text-[16px] font-semibold leading-[15px] text-[#2A2A2A]'>
              성별
            </legend>

            <div className='mt-[10px] flex w-full gap-[10px]'>
              <button
                type='button'
                aria-label='남성 선택'
                aria-pressed={gender === 'male'}
                onClick={() => setGender('male')}
                className='h-[48px] min-w-0 flex-1'
              >
                {gender === 'male' ? (
                  <MaleSelectedIcon className='h-[48px] w-full' />
                ) : (
                  <MaleIcon className='h-[48px] w-full' />
                )}
              </button>

              <button
                type='button'
                aria-label='여성 선택'
                aria-pressed={gender === 'female'}
                onClick={() => setGender('female')}
                className='h-[48px] min-w-0 flex-1'
              >
                {gender === 'female' ? (
                  <FemaleSelectedIcon className='h-[48px] w-full' />
                ) : (
                  <FemaleIcon className='h-[48px] w-full' />
                )}
              </button>
            </div>
          </fieldset>

          {/* 생년월일 */}
          <div className='mt-[26px] flex w-full flex-col'>
            <label
              htmlFor='birthDate'
              className='mb-[8px] text-[16px] font-semibold leading-[15px] text-[#2A2A2A]'
            >
              생년월일
            </label>

            <input
              id='birthDate'
              type='text'
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              placeholder='YYYY / MM / DD'
              className='h-[48px] w-full rounded-[24px] border border-gray-200 bg-gray-50 px-[16px] text-[15px] font-medium leading-[18px] outline-none placeholder:text-[#ACACAC]'
            />
          </div>
        </section>
      </main>

      {/* 하단 버튼 */}
      <div className='shrink-0 bg-white px-5 pb-[24px]'>
        <button
          type='button'
          disabled={!isValid}
          className={`h-[50px] w-full rounded-[25px] text-[16px] font-bold text-white transition-colors ${
            isValid
              ? 'bg-main-green1'
              : 'cursor-not-allowed bg-gray-400'
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default ProfileCreatePage;