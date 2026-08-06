import {
  type ChangeEvent,
  type ComponentType,
  type SVGProps,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import {
  createProfile,
  uploadProfileImage,
} from '../../apis/user';
import { getAccessToken } from '../../apis/token';
import type { CharacterCode } from '../../constants/character';
import LoadingSpinner from '../../components/common/LoadingSpinner';

import LeftArrowIcon from '../../assets/icons/left-arrow.svg?react';
import GalleryIcon from '../../assets/icons/gallery.svg?react';

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

type SvgComponent = ComponentType<
  SVGProps<SVGSVGElement>
>;

interface CharacterItem {
  id: CharacterCode;
  label: string;
  defaultIcon: SvgComponent;
  selectedIcon: SvgComponent;
}

const CHARACTER_ITEMS: CharacterItem[] = [
  {
    id: '1',
    label: '노란색 캐릭터',
    defaultIcon: YellowCharacter,
    selectedIcon: YellowCharacterSelected,
  },
  {
    id: '2',
    label: '회색 캐릭터',
    defaultIcon: GrayCharacter,
    selectedIcon: GrayCharacterSelected,
  },
  {
    id: '3',
    label: '초록색 캐릭터',
    defaultIcon: GreenCharacter,
    selectedIcon: GreenCharacterSelected,
  },
  {
    id: '4',
    label: '주황색 캐릭터',
    defaultIcon: OrangeCharacter,
    selectedIcon: OrangeCharacterSelected,
  },
  {
    id: '5',
    label: '보라색 캐릭터',
    defaultIcon: PurpleCharacter,
    selectedIcon: PurpleCharacterSelected,
  },
  {
    id: '6',
    label: '파란색 캐릭터',
    defaultIcon: BlueCharacter,
    selectedIcon: BlueCharacterSelected,
  },
];

const NICKNAME_REGEX = /^[가-힣0-9]{2,10}$/;

const ProfileCreatePage = () => {
  const navigate = useNavigate();

  const [isCreatingProfile, setIsCreatingProfile] =
    useState(false);

  const [nickname, setNickname] = useState('');

  const [profileImage, setProfileImage] =
    useState<string | null>(null);

  const [profileImageFile, setProfileImageFile] =
    useState<File | null>(null);

  const [selectedCharacterId, setSelectedCharacterId] =
    useState<CharacterCode | null>(null);

  const [gender, setGender] =
    useState<Gender>(null);

  const [birthDate, setBirthDate] =
    useState('');

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      navigate('/login', {
        replace: true,
      });
    }
  }, [navigate]);

  // Blob 이미지 미리보기 URL 정리
  useEffect(() => {
    return () => {
      if (profileImage?.startsWith('blob:')) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  const selectedCharacter =
    CHARACTER_ITEMS.find(
      (character) =>
        character.id === selectedCharacterId,
    );

  const SelectedCharacterIcon =
    selectedCharacter?.selectedIcon;

  const isNicknameValid =
    NICKNAME_REGEX.test(nickname.trim());

  const isNicknameError =
    nickname.trim() !== '' &&
    !isNicknameValid;

  const isValidBirthDate = (
    value: string,
  ) => {
    if (
      !/^\d{4} \/ \d{2} \/ \d{2}$/.test(
        value,
      )
    ) {
      return false;
    }

    const [year, month, day] = value
      .split(' / ')
      .map(Number);

    const date = new Date(
      year,
      month - 1,
      day,
    );

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const isBirthDateComplete =
    isValidBirthDate(birthDate);

  // 캐릭터는 필수, 프로필 사진은 선택 사항
  const isValid =
    isNicknameValid &&
    selectedCharacterId !== null &&
    gender !== null &&
    isBirthDateComplete;

  const handleNicknameChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setNickname(
      event.target.value.slice(0, 10),
    );
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(
        '이미지 파일만 선택할 수 있습니다.',
      );

      event.target.value = '';
      return;
    }

    if (profileImage?.startsWith('blob:')) {
      URL.revokeObjectURL(profileImage);
    }

    const imageUrl =
      URL.createObjectURL(file);

    setProfileImage(imageUrl);
    setProfileImageFile(file);

    // 프로필 사진과 캐릭터는 별도이므로
    // 캐릭터 선택값을 유지한다.
  };

  const handleCharacterSelect = (
    characterId: CharacterCode,
  ) => {
    setSelectedCharacterId(characterId);

    // 프로필 사진과 캐릭터는 별도이므로
    // 선택한 사진을 제거하지 않는다.
  };

  const handleBirthDateChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const numbers = event.target.value
      .replace(/\D/g, '')
      .slice(0, 8);

    let formatted = numbers;

    if (numbers.length > 4) {
      formatted = `${numbers.slice(
        0,
        4,
      )} / ${numbers.slice(4)}`;
    }

    if (numbers.length > 6) {
      formatted = `${numbers.slice(
        0,
        4,
      )} / ${numbers.slice(
        4,
        6,
      )} / ${numbers.slice(6, 8)}`;
    }

    setBirthDate(formatted);
  };

  const handleCreateProfile = async () => {
    if (
      !isValid ||
      isCreatingProfile ||
      !gender ||
      selectedCharacterId === null
    ) {
      return;
    }

    try {
      setIsCreatingProfile(true);

      await createProfile({
        nickname: nickname.trim(),
        characterCode:
          selectedCharacterId,
        gender:
          gender === 'male'
            ? 'MALE'
            : 'FEMALE',
        birthDate: birthDate.replaceAll(
          ' / ',
          '-',
        ),
      });

      // 사진은 캐릭터와 별도로 추가 업로드
      if (profileImageFile) {
        try {
          await uploadProfileImage(
            profileImageFile,
          );
        } catch (error) {
          console.error(
            '프로필 이미지 업로드 실패:',
            error,
          );

          alert(
            '프로필은 생성되었지만 이미지 업로드에 실패했습니다. 마이페이지에서 다시 등록해주세요.',
          );
        }
      }

      sessionStorage.setItem(
        'signupProfileCompleted',
        'true',
      );

      navigate('/signup/complete', {
        replace: true,
      });
    } catch (error) {
      console.error(
        '프로필 생성 실패:',
        error,
      );

      alert(
        '프로필 생성에 실패했습니다. 다시 시도해주세요.',
      );
    } finally {
      setIsCreatingProfile(false);
    }
  };

  if (isCreatingProfile) {
    return (
      <div className='flex min-h-dvh items-center justify-center bg-white'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='mx-auto flex h-dvh w-full max-w-[402px] flex-col overflow-hidden bg-white font-pretendard text-text'>
      {/* 상단 헤더 */}
      <header className='shrink-0 px-5 pt-[28px]'>
        <div className='flex h-[22px] items-center'>
          <button
            type='button'
            aria-label='뒤로가기'
            onClick={() =>
              navigate('/signup')
            }
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
          <div className='relative h-[122px] w-[122px]'>
            <div className='h-full w-full overflow-hidden rounded-full bg-[#C4C4C4] shadow-[0_4px_4px_rgba(0,0,0,0.1)]'>
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
              aria-label='프로필 사진 선택'
              className='absolute bottom-[-2px] right-[-2px] flex h-[36px] w-[36px] cursor-pointer items-center justify-center'
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
              maxLength={10}
              inputMode='text'
              autoComplete='off'
              onChange={handleNicknameChange}
              placeholder='닉네임을 입력하세요'
              aria-invalid={isNicknameError}
              className='h-[48px] w-full rounded-[24px] border border-gray-200 bg-gray-50 px-[16px] text-[15px] font-medium leading-[18px] outline-none placeholder:text-[#ACACAC]'
            />

            {isNicknameError && (
              <p className='mt-2 text-xs text-red-500'>
                닉네임은 한글과 숫자만 사용
                가능하며 2~10글자로
                입력해주세요.
              </p>
            )}
          </div>

          {/* 캐릭터 선택 */}
          <fieldset className='mt-[26px] min-w-0'>
            <legend className='text-[16px] font-semibold leading-[15px] text-[#2A2A2A]'>
              나의 캐릭터
            </legend>

            <div className='mt-[10px] flex h-[70px] w-full gap-[9px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
              {CHARACTER_ITEMS.map(
                (character) => {
                  const isSelected =
                    selectedCharacterId ===
                    character.id;

                  const CharacterIcon =
                    isSelected
                      ? character.selectedIcon
                      : character.defaultIcon;

                  return (
                    <button
                      key={character.id}
                      type='button'
                      aria-label={`${character.label} 선택`}
                      aria-pressed={isSelected}
                      onClick={() =>
                        handleCharacterSelect(
                          character.id,
                        )
                      }
                      className='flex h-[70px] w-[70px] shrink-0 items-center justify-center'
                    >
                      <CharacterIcon className='h-[70px] w-[70px]' />
                    </button>
                  );
                },
              )}
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
                aria-pressed={
                  gender === 'male'
                }
                onClick={() =>
                  setGender('male')
                }
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
                aria-pressed={
                  gender === 'female'
                }
                onClick={() =>
                  setGender('female')
                }
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
              inputMode='numeric'
              value={birthDate}
              maxLength={14}
              onChange={
                handleBirthDateChange
              }
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
          disabled={
            !isValid ||
            isCreatingProfile
          }
          onClick={handleCreateProfile}
          className={`h-[50px] w-full rounded-[25px] text-[16px] font-bold text-white transition-colors ${
            isValid &&
            !isCreatingProfile
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