import {
	Button,
	Flex,
	Input,
	InputGroup,
	useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { imageUploader } from 'utils/Validations/Schemas/imageUploader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ImageUploaderPopover } from 'components/Popover/ImageUploader';

export const ImageUploader = () => {
	const fileInput = useRef<HTMLInputElement | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { register, handleSubmit } = useForm({
		resolver: yupResolver(imageUploader),
	});

	const loadFile = () => {
		const newFile = new FileReader();
		const file = fileInput.current?.files?.[0];
		const size = file?.size;
		const fileData = file?.name.split('.');
		const ext = fileData?.[fileData.length - 1];
		const fileName = fileData?.[0];
		if (!size || size > 5000000) {
			onOpen();
			return;
		}
		newFile.readAsDataURL(file);
		newFile.onload = event => {
			const base64File = {
				file: event.target?.result,
				extensao: ext,
			};
		};
	};
	return (
		<Flex>
			<form>
				<InputGroup>
					<Input
						type="file"
						ref={fileInput}
						onChange={loadFile}
						hidden
						accept=".png, .jpg, .jpeg"
					/>
					<Button
						onClick={() => fileInput.current?.click()}
						borderRadius="base"
						bg="black"
						fontSize="xs"
						fontWeight="medium"
						px="3"
						h="6"
					>
						Edit logo image
					</Button>
				</InputGroup>
			</form>
			<ImageUploaderPopover isOpen={isOpen} onClose={onClose} />
		</Flex>
	);
};
