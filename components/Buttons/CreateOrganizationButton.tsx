import { Button } from '@chakra-ui/react';
import { OffsetShadow } from 'components/OffsetShadow';
import { usePicasso } from 'hooks';

export const CreateOrganizationButton = () => {
	const theme = usePicasso();
	return (
		<OffsetShadow width="36" height="10" buttonText="" borderColor="white">
			<Button
				px="3"
				py="1.5"
				position="absolute"
				bg="white"
				bottom="0.5rem"
				right="0.5rem"
				fontSize="sm"
				fontWeight="medium"
				_hover={{ background: 'white' }}
				_focus={{ background: 'white' }}
				color="black"
				borderRadius="base"
				_active={{
					background: 'white',
					transform: 'translateY(0.5rem) translateX(0.5rem)',
				}}
			>
				Create Organization
			</Button>
		</OffsetShadow>
	);
};
