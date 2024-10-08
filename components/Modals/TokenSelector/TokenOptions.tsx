import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { IToken } from 'types';

interface ITokenOption {
	token: IToken;
	onClick: () => void;
}

const favoriteCoins = ['USDT'];
export const TokenOptions: React.FC<ITokenOption> = ({ onClick, token }) => {
	const handleColor = useMemo(
		() => (favoriteCoins.includes(token.symbol) ? 'gray.100' : 'white'),
		[token.symbol]
	);

	return (
		<Flex>
			<Button
				w="100%"
				id={token.address}
				value={token.symbol}
				onClick={onClick}
				bg={handleColor}
				borderRadius="base"
			>
				<Flex align="center" w="100%" justify="space-between">
					<Flex align="center" gap="2">
						<Img src={token.logoURI} w="6" h="6" />
						<Text color="black"> {token.symbol}</Text>
					</Flex>
				</Flex>
			</Button>
		</Flex>
	);
};
