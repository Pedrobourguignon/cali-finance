import { Flex } from '@chakra-ui/react';

interface IOffsetShadow {
	children: React.ReactNode;
	borderColor: string;
}

export const OffsetShadow: React.FC<IOffsetShadow> = ({
	children,
	borderColor,
}) => (
	<Flex border="1px" borderColor={borderColor}>
		{children}
	</Flex>
);
