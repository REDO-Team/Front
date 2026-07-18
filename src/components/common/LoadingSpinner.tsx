import YellowCharacter from '../../assets/icons/character/yellow.svg?react';
import GrayCharacter from '../../assets/icons/character/gray.svg?react';
import GreenCharacter from '../../assets/icons/character/green.svg?react';
import OrangeCharacter from '../../assets/icons/character/orange.svg?react';
import PurpleCharacter from '../../assets/icons/character/purple.svg?react';
import BlueCharacter from '../../assets/icons/character/blue.svg?react';
import ShadowIcon from '../../assets/icons/character/shadow.svg?react';

const CHARACTERS = [
  YellowCharacter,
  GrayCharacter,
  GreenCharacter,
  OrangeCharacter,
  PurpleCharacter,
  BlueCharacter,
];

const LoadingSpinner = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex items-end gap-[5px]'>
        {CHARACTERS.map((Character, index) => {
          const delays = [0, 280, 520, 760, 1000, 1240];

          return (
            <div
              key={index}
              className='flex flex-col items-center'
            >
              <Character
                className='h-[57px] w-auto animate-[loading-jump_1.3s_ease-in-out_infinite]'
                style={{
                    animationDelay: `${delays[index]}ms`,
                }}
              />

              <ShadowIcon
                className='mt-[2px] h-[9px] w-[34px] animate-[loading-shadow_1.3s_ease-in-out_infinite]'
                style={{
                    animationDelay: `${delays[index]}ms`,
                }}
              />
            </div>
          );
        })}
      </div>

      <p className='mt-[25px] text-[22px] font-semibold tracking-[0] text-gray-400'>
        LOADING...
      </p>
    </div>
  );
};

export default LoadingSpinner;