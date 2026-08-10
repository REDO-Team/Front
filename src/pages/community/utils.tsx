import YellowCharacter from '../../assets/icons/character/yellow.svg?react';
import GrayCharacter from '../../assets/icons/character/gray.svg?react';
import GreenCharacter from '../../assets/icons/character/green.svg?react';
import OrangeCharacter from '../../assets/icons/character/orange.svg?react';
import PurpleCharacter from '../../assets/icons/character/purple.svg?react';
import BlueCharacter from '../../assets/icons/character/blue.svg?react';
import ShadowIcon from '../../assets/icons/character/shadow.svg?react';

export const renderCharacterProfile = (code: number) => {
    switch (code) {
        case 1:
            return <YellowCharacter className='w-full h-full' />;
        case 2:
            return <GrayCharacter className='w-full h-full' />;
        case 3:
            return <GreenCharacter className='w-full h-full' />;
        case 4:
            return <OrangeCharacter className='w-full h-full' />;
        case 5:
            return <PurpleCharacter className='w-full h-full' />;
        case 6:
            return <BlueCharacter className='w-full h-full' />;
        default:
            return <ShadowIcon className='w-full h-full' />;
    }
};