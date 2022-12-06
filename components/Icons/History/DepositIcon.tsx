import { Icon, IconProps } from '@chakra-ui/react';

const DepositIcon = (props: IconProps) => (
	<Icon {...props}>
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7.99974 10.6234L7.99974 2.10486"
				stroke="currentColor"
				strokeLinecap="square"
			/>
			<path
				d="M5.81665 8.93005L7.99996 11.1231L10.184 8.93005"
				stroke="currentColor"
				strokeLinecap="square"
			/>
			<path
				d="M11.0833 6.276H14.1666V13.8952H1.83325V6.276H4.91659"
				stroke="currentColor"
				strokeLinecap="square"
			/>
		</svg>
	</Icon>
);

export { DepositIcon };
