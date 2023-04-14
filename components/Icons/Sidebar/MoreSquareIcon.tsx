import { Icon, IconProps } from '@chakra-ui/react';

const MoreSquareIcon = (props: IconProps) => (
	<Icon {...props}>
		<svg
			width="24"
			height="25"
			viewBox="0 0 24 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15.9398 12.6526H15.9488"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="square"
				strokeLinejoin="round"
			/>
			<path
				d="M11.9301 12.6526H11.9391"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="square"
				strokeLinejoin="round"
			/>
			<path
				d="M7.92128 12.6526H7.93028"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="square"
				strokeLinejoin="round"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M21.25 21.8899L21.25 3.38989L2.75 3.38989L2.75 21.8899L21.25 21.8899Z"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	</Icon>
);

export { MoreSquareIcon };
