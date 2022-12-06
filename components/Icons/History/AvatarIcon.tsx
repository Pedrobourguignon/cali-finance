import { Icon, IconProps } from '@chakra-ui/react';

const AvatarIcon = (props: IconProps) => (
	<Icon {...props}>
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_2023_26270)">
				<rect width="24" height="24" rx="12" fill="#E2E8F0" />
				<g clipPath="url(#clip1_2023_26270)">
					<path
						d="M12 13.875C15.0773 13.875 17.5714 11.4409 17.5714 8.4375C17.5714 5.43413 15.0773 3 12 3C8.92266 3 6.42857 5.43413 6.42857 8.4375C6.42857 11.4409 8.92266 13.875 12 13.875ZM15.9 15.2344H15.1731C14.2068 15.6677 13.1317 15.9141 12 15.9141C10.8683 15.9141 9.79754 15.6677 8.8269 15.2344H8.1C4.87031 15.2344 2.25 17.7917 2.25 20.9438V22.7109C2.25 23.8367 3.18583 24.75 4.33929 24.75H19.6607C20.8142 24.75 21.75 23.8367 21.75 22.7109V20.9438C21.75 17.7917 19.1297 15.2344 15.9 15.2344Z"
						fill="white"
					/>
				</g>
			</g>
			<defs>
				<clipPath id="clip0_2023_26270">
					<rect width="24" height="24" rx="12" fill="currentColor" />
				</clipPath>
				<clipPath id="clip1_2023_26270">
					<rect
						width="19.5"
						height="21.75"
						fill="currentColor"
						transform="translate(2.25 3)"
					/>
				</clipPath>
			</defs>
		</svg>
	</Icon>
);

export { AvatarIcon };
