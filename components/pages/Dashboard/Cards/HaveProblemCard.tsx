import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';

export const HaveProblemCard = () => {
	const { t: translate } = useTranslation('have-a-problem');
	return (
		<Link href="/app/dashboard">
			<Flex
				w="72"
				h="24"
				mt="6"
				ml="4"
				borderRadius="base"
				bgImage="url(/images/haveproblem.png)"
				backgroundSize="cover"
				backgroundRepeat="no-repeat"
				cursor="pointer"
			>
				<Flex direction="column" my="auto" mx="7">
					<Text fontStyle="Medium" fontSize="xl" lineHeight="7" color="white">
						{translate('haveAProblem')}
					</Text>
					<Text fontStyle="Medium" fontSize="md" lineHeight="6" color="white">
						{translate('getInTouch')}
					</Text>
				</Flex>
			</Flex>
		</Link>
	);
};

export default HaveProblemCard;
