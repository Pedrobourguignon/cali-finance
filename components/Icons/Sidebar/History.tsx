import { Icon, IconProps } from '@chakra-ui/react';

const HistoryIcon = (props: IconProps) => (
	<Icon {...props}>
		<svg
			width="25"
			height="24"
			viewBox="0 0 25 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7.88281 15.0865H16.6178"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M21.5 20.3265H3V3.67346H9.96326L12.2249 6.45239H21.5V20.3265Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
		</svg>
	</Icon>
);

export { HistoryIcon };
