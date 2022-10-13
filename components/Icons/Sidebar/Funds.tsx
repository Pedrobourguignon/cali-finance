import { Icon, IconProps } from '@chakra-ui/react';

const FundsIcon = (props: IconProps) => (
	<Icon {...props}>
		<svg
			width="25"
			height="25"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="3"
				y="5.10889"
				width="18.5"
				height="14.06"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
			<path
				d="M3 9.92182H21.5"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
			<path
				d="M15.1016 15.481H18.5768"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
			<path
				d="M10.876 15.481H11.6238"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
		</svg>
	</Icon>
);

export { FundsIcon };
