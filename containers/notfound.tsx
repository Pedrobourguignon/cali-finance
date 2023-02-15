import { NotFoundPage } from 'components';
import { usePicasso } from 'hooks';
import { AppLayout } from 'layouts';

export const NotFoundContainer = () => {
	const theme = usePicasso();

	return (
		<AppLayout hasBg={false} bgColor={theme.bg.white2}>
			<NotFoundPage />
		</AppLayout>
	);
};
