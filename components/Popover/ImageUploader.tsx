import {
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
} from '@chakra-ui/react';

interface IPopOver {
	isOpen: boolean;
	onClose: () => void;
}
export const ImageUploaderPopover: React.FC<IPopOver> = ({
	isOpen,
	onClose,
}) => (
	<Popover isOpen={isOpen} onClose={onClose}>
		<PopoverContent>
			<PopoverArrow />
			<PopoverCloseButton />
			<PopoverHeader>The file is too large</PopoverHeader>
			<PopoverBody>Please upload another file</PopoverBody>
		</PopoverContent>
	</Popover>
);
