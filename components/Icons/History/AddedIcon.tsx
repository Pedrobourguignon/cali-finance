import { Icon, IconProps } from '@chakra-ui/react';

const AddedIcon = (props: IconProps) => (
	<Icon {...props}>
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12.6954 5.7793V8.45263"
				stroke="currentColor"
				strokeLinecap="square"
				strokeLinejoin="round"
			/>
			<path
				d="M14.0587 7.11593H11.332"
				stroke="#121212"
				strokeLinecap="square"
				strokeLinejoin="round"
			/>
			<path
				d="M9.06059 4.77986C9.06059 6.13128 7.96485 7.22635 6.61411 7.22635V8.22635C8.51694 8.22635 10.0606 6.68376 10.0606 4.77986H9.06059ZM6.61411 7.22635C5.2624 7.22635 4.16675 6.13119 4.16675 4.77986H3.16675C3.16675 6.68385 4.7105 8.22635 6.61411 8.22635V7.22635ZM4.16675 4.77986C4.16675 3.42854 5.2624 2.33337 6.61411 2.33337V1.33337C4.7105 1.33337 3.16675 2.87587 3.16675 4.77986H4.16675ZM6.61411 2.33337C7.96485 2.33337 9.06059 3.42844 9.06059 4.77986H10.0606C10.0606 2.87596 8.51694 1.33337 6.61411 1.33337V2.33337Z"
				fill="currentColor"
			/>
			<path
				d="M6.63666 9.8793C8.80757 9.87374 10.6534 10.8705 11.3319 13.0162C9.96434 13.8499 8.35458 14.171 6.63666 14.1668C4.91874 14.171 3.30898 13.8499 1.94141 13.0162C2.62067 10.8682 4.46342 9.87373 6.63666 9.8793Z"
				stroke="currentColor"
				strokeLinecap="square"
			/>
		</svg>
	</Icon>
);

export { AddedIcon };
