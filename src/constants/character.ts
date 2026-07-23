import GreenCharacter from '../assets/icons/character/green-character.svg?react';
import YellowCharacter from '../assets/icons/character/yellow-character.svg?react';
import GrayCharacter from '../assets/icons/character/gray-character.svg?react';
import OrangeCharacter from '../assets/icons/character/orange-character.svg?react';
import PurpleCharacter from '../assets/icons/character/purple-character.svg?react';
import BlueCharacter from '../assets/icons/character/blue-character.svg?react';

export const CHARACTER_IMAGE_MAP = {
  GREEN: GreenCharacter,
  YELLOW: YellowCharacter,
  GRAY: GrayCharacter,
  ORANGE: OrangeCharacter,
  PURPLE: PurpleCharacter,
  BLUE: BlueCharacter,
} as const;

export type CharacterCode =
  keyof typeof CHARACTER_IMAGE_MAP;

export const isCharacterCode = (
  value: string | null,
): value is CharacterCode => {
  return value !== null && value in CHARACTER_IMAGE_MAP;
};