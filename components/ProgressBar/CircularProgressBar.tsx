import { usePicasso } from 'hooks';
import { useMemo } from 'react';

interface IPercentage {
	percentage: number;
}

export const CircularProgressBar: React.FC<IPercentage> = ({ percentage }) => {
	const theme = usePicasso();
	const percentCalc = useMemo(() => {
		let percentPath: string | number = percentage;
		percentPath = 240 - percentage * 2.4;
		return percentPath.toString();
	}, []);
	return (
		<svg display="block" viewBox="25 -5 150 100">
			<path
				strokeWidth="5"
				strokeLinecap="round"
				stroke={theme.bg.gray2}
				d="M55,90
				A55,55 0 1,1 140,90"
				fill="none"
			/>
			<path
				strokeWidth="5"
				strokeLinecap="round"
				stroke={theme.branding.blue}
				strokeDasharray="248"
				strokeDashoffset={percentCalc}
				d="M55,90
				A55,55 0 1,1 140,90"
				fill="none"
			/>
		</svg>
	);
};
