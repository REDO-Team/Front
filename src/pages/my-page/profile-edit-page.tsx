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

import {
  type CharacterCode,
  isCharacterCode,
} from '../../constants/character';
import { MOCK_MY_PAGE_USER } from '../../mocks/my-page';

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>;

type NicknameStatus =
  | 'idle'
  | 'available'
  | 'duplicate'
  | 'invalid'
  | 'current';

interface CharacterItem {
  id: number;
  code: CharacterCode;
  label: string;
  defaultIcon: SvgComponent;
  selectedIcon: SvgComponent;
}

const CHARACTER_ITEMS: CharacterItem[] = [
  {
    id: 1,
    code: 'YELLOW',
    label: '노란색 캐릭터',
    defaultIcon: YellowCharacter,
    selectedIcon: YellowCharacterSelected,
  },
  {
    id: 2,
    code: 'GRAY',
    label: '회색 캐릭터',
    defaultIcon: GrayCharacter,
    selectedIcon: GrayCharacterSelected,
  },
  {
    id: 3,
    code: 'GREEN',
    label: '초록색 캐릭터',
    defaultIcon: GreenCharacter,
    selectedIcon: GreenCharacterSelected,
  },
  {
    id: 4,
    code: 'ORANGE',
    label: '주황색 캐릭터',
    defaultIcon: OrangeCharacter,
    selectedIcon: OrangeCharacterSelected,
  },
  {
    id: 5,
    code: 'PURPLE',
    label: '보라색 캐릭터',
    defaultIcon: PurpleCharacter,
    selectedIcon: PurpleCharacterSelected,
  },
  {
    id: 6,
    code: 'BLUE',
    label: '파란색 캐릭터',
    defaultIcon: BlueCharacter,
    selectedIcon: BlueCharacterSelected,
  },
];

/** 실제 API 연결 전 사용하는 중복 닉네임 목업 */
const DUPLICATE_NICKNAMES = [
  '환경이',
  '분리수거왕',
  '리사이클',
  '지구지킴이',
];

const NICKNAME_REGEX = /^[가-힣0-9]{2,10}$/;

const NICKNAME_MESSAGES: Record<NicknameStatus, string> = {
  idle: '한글과 숫자로 2~10자 이내로 입력해주세요.',
  invalid: '한글과 숫자로 2~10자 이내로 입력해주세요.',
  duplicate: '이미 사용 중인 닉네임입니다.',
  available: '사용 가능한 닉네임입니다.',
  current: '현재 사용 중인 닉네임입니다.',
};

const getNicknameStatus = (
  nickname: string,
): NicknameStatus => {
  const trimmedNickname = nickname.trim();

  if (!trimmedNickname) return 'idle';

  if (!NICKNAME_REGEX.test(trimmedNickname)) {
    return 'invalid';
  }

  if (trimmedNickname === MOCK_MY_PAGE_USER.nickname) {
    return 'current';
  }

  if (DUPLICATE_NICKNAMES.includes(trimmedNickname)) {
    return 'duplicate';
  }

  return 'available';
};

const getInitialCharacterId = () => {
  const profileImageValue = MOCK_MY_PAGE_USER.profileImageUrl;

  if (!isCharacterCode(profileImageValue)) {
    return null;
  }

  return (
    CHARACTER_ITEMS.find(
      (character) => character.code === profileImageValue,
    )?.id ?? null
  );
};

const getInitialProfileImage = () => {
  const profileImageValue = MOCK_MY_PAGE_USER.profileImageUrl;

  if (!profileImageValue || isCharacterCode(profileImageValue)) {
    return null;
  }

  return profileImageValue;
};

const ProfileEditPage = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState(
    MOCK_MY_PAGE_USER.nickname,
  );

  const [nicknameStatus, setNicknameStatus] =
    useState<NicknameStatus>('current');

  const [selectedCharacterId, setSelectedCharacterId] =
    useState<number | null>(getInitialCharacterId);

  const [profileImage, setProfileImage] = useState<
    string | null
  >(getInitialProfileImage);

  const selectedCharacter = CHARACTER_ITEMS.find(
    (character) => character.id === selectedCharacterId,
  );

  const SelectedCharacterIcon =
    selectedCharacter?.selectedIcon;

  const nicknameMessage =
    NICKNAME_MESSAGES[nicknameStatus];

  const isNicknameValid =
    nicknameStatus === 'available' ||
    nicknameStatus === 'current';

  const isNicknameError =
    nicknameStatus === 'invalid' ||
    nicknameStatus === 'duplicate';

  const isNicknameSuccess = isNicknameValid;

  const isProfileSelected =
    selectedCharacterId !== null || profileImage !== null;

  const isValid = isNicknameValid && isProfileSelected;

  /** 닉네임 실시간 유효성 및 중복 확인 */
  useEffect(() => {
    setNicknameStatus(getNicknameStatus(nickname));
  }, [nickname]);

  /** blob 이미지 URL 메모리 정리 */
  useEffect(() => {
    return () => {
      if (profileImage?.startsWith('blob:')) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  const handleNicknameChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setNickname(event.target.value.slice(0, 10));
  };

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

    if (profileImage?.startsWith('blob:')) {
      URL.revokeObjectURL(profileImage);
    }

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
    setSelectedCharacterId(null);
  };

  const handleCharacterSelect = (characterId: number) => {
    if (profileImage?.startsWith('blob:')) {
      URL.revokeObjectURL(profileImage);
    }

    setSelectedCharacterId(characterId);
    setProfileImage(null);
  };

  const handleSave = () => {
    if (!isValid) return;

    const selectedCharacterCode =
      selectedCharacter?.code ?? null;

    const updatedProfile = {
      userId: MOCK_MY_PAGE_USER.userId,
      nickname: nickname.trim(),
      profileImageUrl:
        profileImage ?? selectedCharacterCode,
      totalPoint: MOCK_MY_PAGE_USER.totalPoint,
    };

    console.log('수정된 프로필:', updatedProfile);

    navigate('/my');
  };

  return (
    <div className='flex min-h-dvh w-full flex-col overflow-hidden bg-[#F9FBFB] font-pretendard text-text'>
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
          <Home className='h-[24px] w-[24px]' />
        </button>
      </header>

      {/* 내용 */}
      <main className='min-h-0 flex-1 overflow-y-auto px-5'>
        {/* 프로필 사진 및 캐릭터 */}
        <section className='flex justify-center pt-[16px]'>
          <div className='relative h-[122px] w-[122px]'>
            <div className='flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_4px_8px_rgba(0,0,0,0.08)]'>
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={`${nickname} 프로필`}
                  className='h-full w-full object-cover'
                />
              ) : SelectedCharacterIcon ? (
                <SelectedCharacterIcon className='h-full w-full translate-x-[2px] scale-[1.15]' />
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
            className='mb-[15px] block text-[16px] font-semibold leading-[15px] text-[#2A2A2A]'
          >
            닉네임 수정하기
          </label>

          <input
            id='nickname'
            type='text'
            value={nickname}
            minLength={2}
            maxLength={10}
            inputMode='text'
            autoComplete='off'
            onChange={handleNicknameChange}
            placeholder='닉네임을 입력해주세요'
            aria-invalid={isNicknameError}
            aria-describedby='nickname-message'
            className={`h-[48px] w-full rounded-[24px] border bg-white px-[18px] text-[14px] font-medium leading-[18px] text-gray-800 outline-none placeholder:text-gray-400 ${
              isNicknameError
                ? 'border-red-400 focus:border-red-400'
                : isNicknameSuccess
                  ? 'border-main-green1'
                  : 'border-gray-200 focus:border-main-green1'
            }`}
          />

          <div className='mt-[8px] flex items-start justify-between px-[4px]'>
            <p
              id='nickname-message'
              className={`text-[12px] leading-[16px] ${
                isNicknameError
                  ? 'text-red-500'
                  : isNicknameSuccess
                    ? 'text-main-green1'
                    : 'text-gray-400'
              }`}
            >
              {nicknameMessage}
            </p>

            <span className='ml-3 shrink-0 text-[12px] leading-[16px] text-gray-400'>
              {nickname.length}/10
            </span>
          </div>
        </section>

        {/* 캐릭터 선택 */}
        <fieldset className='mt-[16px] min-w-0'>
          <legend className='mb-[15px] block text-[16px] font-semibold leading-[15px] text-[#2A2A2A]'>
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
      <div className='shrink-0 bg-[#F9FBFB] px-5 pb-[32px] pt-[16px]'>
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