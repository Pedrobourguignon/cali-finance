import { useColorModeValue } from '@chakra-ui/react'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'

const usePicasso = () => {
	const theme = {
		text: {
			mono: useColorModeValue('gray.700', 'white'),
			blue: useColorModeValue('white', 'cyan.300'),
		},
		icon: {
			theme: useColorModeValue(BsFillMoonFill, BsFillSunFill),
		},
		bg: {
			primary: useColorModeValue('blackAlpha.50', 'gray.700'),
			secondary: useColorModeValue('gray.300', 'gray.800'),
			button: {
				primary: useColorModeValue('blue.500', 'blue.600'),
				secondary: useColorModeValue('purple.700', 'purple.600'),
				tertiary: useColorModeValue('green.600', 'blue.800'),
			},
		},
	}

	return theme
}

export { usePicasso }
