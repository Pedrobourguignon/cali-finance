import { usePicasso } from 'hooks';

interface IPercentage {
	percentage: number;
}

export const CircularProgressBar: React.FC<IPercentage> = ({ percentage }) => {
	const theme = usePicasso();

	const percentCalc = (240 - percentage * 2.15).toString?.();

	return (
		<svg display="block" viewBox="10 -5 170 103">
			<path
				strokeWidth="5"
				strokeLinecap="round"
				stroke={theme.bg.gray2}
				d="M52,90
				A52,52 0 1,1 140,90"
				fill="none"
			/>
			<path
				strokeWidth="5"
				strokeLinecap="round"
				stroke={theme.branding.blue}
				strokeDasharray="248"
				strokeDashoffset={percentCalc}
				d="M52,90
				A52,52 0 1,1 140,90"
				fill="none"
			/>
		</svg>
	);
};
