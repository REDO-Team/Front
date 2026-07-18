import {
  type ChangeEvent,
  type ComponentType,
  type SVGProps,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import LeftArrowIcon from '../../assets/icons/left-arrow.svg?react';
import GalleryIcon from '../../assets/icons/gallery.svg?react';
import Home from '../../assets/icons/home.svg?react';

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

const ProfileEditPage = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [selectedCharacterId, setSelectedCharacterId] = useState<
    number | null
  >(null);
  const [profileImage, setProfileImage] = useState<string | null>(
    null,
  );

  const selectedCharacter = CHARACTER_ITEMS.find(
    (character) => character.id === selectedCharacterId,
  );

  const SelectedCharacterIcon = selectedCharacter?.selectedIcon;

  const isValid =
    nickname.trim() !== '' && selectedCharacterId !== null;

  useEffect(() => {
    return () => {
      if (profileImage) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 선택할 수 있습니다.');
      event.target.value = '';
      return;
    }

    if (profileImage) {
      URL.revokeObjectURL(profileImage);
    }

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
  };

  const handleCharacterSelect = (characterId: number) => {
    if (profileImage) {
      URL.revokeObjectURL(profileImage);
    }

    setSelectedCharacterId(characterId);
    setProfileImage(null);
  };

  const handleSave = () => {
    if (!isValid) return;

    navigate('/my');
  };

  return (
    <div className='flex min-h-dvh w-full flex-col overflow-hidden bg-bg-green1 font-pretendard text-text'>
      {/* 자체 헤더 */}
      <header className='relative flex h-[72px] shrink-0 items-center justify-center px-5'>
        <button
          type='button'
          aria-label='뒤로가기'
          onClick={() => navigate(-1)}
          className='absolute left-5 flex h-8 w-8 items-center justify-start'
        >
          <LeftArrowIcon className='h-[18px] w-[9px]' />
        </button>

        <h1 className='text-[18px] font-semibold leading-[20px] text-[#111111]'>
          프로필 수정
        </h1>

        <button
          type='button'
          aria-label='홈으로 이동'
          onClick={() => navigate('/')}
          className='absolute right-5 flex h-8 w-8 items-center justify-center'
        >
          <Home className='h-[22px] w-[22px]' />
        </button>
      </header>

      {/* 내용 */}
      <main className='min-h-0 flex-1 overflow-y-auto px-5'>
        {/* 프로필 사진 및 캐릭터 */}
        <section className='flex justify-center pt-[16px]'>
          <div className='relative h-[122px] w-[122px]'>
            <div className='h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-main-green1 to-main-sky shadow-[0_4px_8px_rgba(0,0,0,0.08)]'>
              {profileImage ? (
                <img
                  src={profileImage}
                  alt='선택한 프로필'
                  className='h-full w-full object-cover'
                />
              ) : SelectedCharacterIcon ? (
                <div className='flex h-full w-full items-center justify-center'>
                  <SelectedCharacterIcon className='h-[130px] w-[130px] shrink-0' />
                </div>
              ) : null}
            </div>

            <label
              htmlFor='profileImage'
              aria-label='프로필 사진 변경'
              className='absolute bottom-[-2px] right-[-4px] flex h-[38px] w-[38px] cursor-pointer items-center justify-center'
            >
              <GalleryIcon className='h-[36px] w-[36px]' />
            </label>

            <input
              id='profileImage'
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='hidden'
            />
          </div>
        </section>

        {/* 닉네임 */}
        <section className='mt-[18px]'>
          <label
            htmlFor='nickname'
            className='mb-[15px] block w-[350px] text-[16px] font-semibold leading-[15px] tracking-[0] text-[#2A2A2A]'
          >
            닉네임 수정하기
          </label>

          <input
            id='nickname'
            type='text'
            value={nickname}
            maxLength={20}
            onChange={(event) => setNickname(event.target.value)}
            placeholder='닉네임을 입력해주세요'
            className='h-[48px] w-full rounded-[24px] border border-gray-200 bg-white px-[18px] text-[14px] font-medium leading-[18px] text-gray-800 outline-none placeholder:text-gray-400 focus:border-main-green1'
          />
        </section>

        {/* 캐릭터 선택 */}
        <fieldset className='mt-[16px] min-w-0'>
          <legend className='mb-[15px] block w-[350px] text-[16px] font-semibold leading-[15px] tracking-[0] text-[#2A2A2A]'>
            나의 캐릭터
          </legend>

          <div className='flex w-full gap-[8px] overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
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
                    handleCharacterSelect(character.id)
                  }
                  className='flex h-[70px] w-[70px] shrink-0 items-center justify-center'
                >
                  <CharacterIcon className='h-[70px] w-[70px]' />
                </button>
              );
            })}
          </div>
        </fieldset>
      </main>

      {/* 완료 버튼 */}
      <div className='shrink-0 bg-bg-green1 px-5 pb-[32px] pt-[16px]'>
        <button
          type='button'
          disabled={!isValid}
          onClick={handleSave}
          className={`h-[50px] w-full rounded-[25px] text-[16px] font-bold text-white transition-colors ${
            isValid
              ? 'bg-main-green1'
              : 'cursor-not-allowed bg-gray-400'
          }`}
        >
          완료하기
        </button>
      </div>
    </div>
  );
};

export default ProfileEditPage;