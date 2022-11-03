import { Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

export interface INetwork {
	name: string;
	icon: IconType | typeof Icon;
}
