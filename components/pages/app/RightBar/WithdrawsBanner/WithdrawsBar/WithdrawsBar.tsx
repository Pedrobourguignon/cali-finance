import { Button, Flex, Text } from '@chakra-ui/react';
import { CircularProgressBar } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

const withdrawnPercentage = 50;
export const WithdrawsBar = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('organization-overall');
	const [selectedOption, setSelectedOption] = useState<string | undefined>(
		translate('thisWeek')
	);
	const buttonOptions = [translate('thisWeek'), translate('thisMonth')];

	const handleSelectedOption = (btnName: string) => {
		const filter = buttonOptions.find(item => item === btnName);
		setSelectedOption(filter);
	};

	return (
		<Flex direction="column" position="relative">
			<Flex
				minW="16.5rem"
				px="4"
				py="2.5"
				bg="white"
				borderRadius="base"
				h="100%"
				direction="column"
				gap="3"
			>
				<Text color="black" fontWeight="medium" fontSize="md">
					{translate('withdrawals')}
				</Text>
				<CircularProgressBar percentage={withdrawnPercentage} />
				<Flex zIndex="docked" justify="center">
					{buttonOptions.map((item, index) => (
						<Button
							value={item}
							key={+index}
							color={theme.text.primary}
							bgColor={item === selectedOption ? 'gray.100' : 'none'}
							borderRadius="full"
							w="20"
							fontSize="xs"
							fontWeight="bold"
							h="6"
							_hover={{}}
							_active={{}}
							_focus={{}}
							onClick={() => handleSelectedOption(item)}
						>
							{item}
						</Button>
					))}
				</Flex>
			</Flex>
			<Flex
				h="100%"
				w="100%"
				justify="center"
				color="black"
				direction="column"
				textAlign="center"
				position="absolute"
			>
				<Text fontSize="xs">{translate('withdrawn')}</Text>
				<Text fontWeight="medium">{withdrawnPercentage}%</Text>
			</Flex>
		</Flex>
	);
};
