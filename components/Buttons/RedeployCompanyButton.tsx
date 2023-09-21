import { Button } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

interface IRedeployCompanyButton {
	onClick: () => void;
	showButton: boolean;
	isLoadingButton: boolean;
}

export const RedeployCompanyButton: React.FC<IRedeployCompanyButton> = ({
	onClick,
	showButton,
	isLoadingButton,
}) => {
	const { t: translate } = useTranslation('alerts');
	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{showButton && (
				<Button
					onClick={onClick}
					h="max-content"
					py="0.5"
					bg="red.500"
					borderRadius="full"
					color="white"
					fontSize="2xs"
					_hover={{ opacity: 0.8 }}
					display={showButton ? 'flex' : 'none'}
					_active={{}}
					_focus={{}}
					isLoading={isLoadingButton}
				>
					{translate('redeployCompany')}
				</Button>
			)}
		</>
	);
};

export default RedeployCompanyButton;
