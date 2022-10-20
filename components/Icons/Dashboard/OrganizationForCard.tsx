import { Icon, IconProps } from '@chakra-ui/react';

const OrganizationForCard = (props: IconProps) => (
	<Icon {...props}>
		<svg
			width="25"
			height="24"
			viewBox="0 0 25 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12.25 17.2265V14.6895"
				stroke="black"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M21.4949 5.87988V12.3799C19.0349 13.8199 15.7849 14.6899 12.2449 14.6899C8.70488 14.6899 5.46488 13.8199 3.00488 12.3799V5.87988H21.4949Z"
				stroke="black"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
			<path
				d="M15.75 5.61115L14.7501 3.2998H9.7501L8.75 5.61115"
				stroke="black"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
			<path
				d="M3.0293 15.1932L3.2183 20.7002H21.2813L21.4703 15.1932"
				stroke="black"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
		</svg>
	</Icon>
);

export { OrganizationForCard };
