import { Icon, IconProps } from '@chakra-ui/react';

const DashboardIcon = (props: IconProps) => (
	<Icon {...props}>
		<svg
			fill="currentColor"
			width="25"
			height="24"
			viewBox="0 0 25 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				fill="currentColor"
				x="2.85742"
				y="3.39331"
				width="7"
				height="7"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
			<rect
				fill="currentColor"
				x="14.8818"
				y="2.60669"
				width="7"
				height="7"
				transform="rotate(15 14.8818 2.60669)"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
			<rect
				fill="currentColor"
				x="2.85742"
				y="14.3933"
				width="7"
				height="7"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
			<rect
				fill="currentColor"
				x="13.8574"
				y="14.3933"
				width="7"
				height="7"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
		</svg>
	</Icon>
);

export { DashboardIcon };
