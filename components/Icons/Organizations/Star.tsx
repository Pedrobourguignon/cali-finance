import { Icon, IconProps } from '@chakra-ui/react';

const StarIcon = (props: IconProps) => (
	<Icon {...props}>
		<svg
			width="22"
			height="22"
			viewBox="0 0 14 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7.00008 1.60425C7.68277 4.25076 9.74941 6.31739 12.3959 7.00008C9.74941 7.68277 7.68277 9.74941 7.00008 12.3959C6.31739 9.74941 4.25076 7.68277 1.60425 7.00008C4.25076 6.31739 6.31739 4.25076 7.00008 1.60425Z"
				stroke="black"
				strokeWidth="0.875"
				strokeLinecap="round"
			/>
			<path
				d="M10.9383 1.60425C10.9383 2.27362 11.7079 3.06162 12.3957 3.06162C11.6814 3.06162 10.9383 3.84146 10.9383 4.519C10.9383 3.83705 10.1489 3.06162 9.48096 3.06162C10.1754 3.06162 10.9383 2.27362 10.9383 1.60425Z"
				fill="black"
			/>
		</svg>
	</Icon>
);

export { StarIcon };
