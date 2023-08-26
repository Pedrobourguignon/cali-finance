import React from 'react';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	Button,
	Icon,
	Flex,
	Text,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { MoreSquareIcon } from 'components/Icons';
import { HelpAndDocsButton, SocialMediasButtons } from 'components/pages';
import router, { useRouter } from 'next/router';

type ILanguage = 'pt-BR' | 'en-US';

interface IMoreOptions {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const MoreOptionsMobilePopover: React.FC<IMoreOptions> = ({
	isOpen,
	onOpen,
	onClose,
}) => {
	const languages: ILanguage[] = ['en-US', 'pt-BR'];
	const { locale, asPath } = useRouter();
	const theme = usePicasso();

	const changeLanguage = (lang: string) => {
		router.push(`${asPath}`, `${asPath}`, { locale: lang });
		localStorage.setItem('language', lang);
	};

	return (
		<Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} strategy="fixed">
			<PopoverTrigger>
				<Button bg="none" p="0">
					<Icon as={MoreSquareIcon} boxSize="6" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				bg={theme.bg.white}
				w="8.3rem"
				h="15.6rem"
				borderTopRadius="3xl"
			>
				<PopoverBody color="black">
					<Flex direction="column" h="15rem" justify="space-between">
						<Flex justify="space-between" pt="3">
							{languages.map((lang, index) => (
								<Text
									key={+index}
									cursor="pointer"
									boxSize="max-content"
									onClick={() => changeLanguage(lang)}
									fontSize="sm"
									fontWeight="semibold"
									color={locale === lang ? theme.branding.blue2 : 'gray.900'}
								>
									{locale === lang
										? `[${lang.toUpperCase()}]`
										: lang.toUpperCase()}
								</Text>
							))}
						</Flex>
						<HelpAndDocsButton gap="10" />
						<Flex>
							<SocialMediasButtons justify="space-between" />
						</Flex>
					</Flex>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};

export default MoreOptionsMobilePopover;
