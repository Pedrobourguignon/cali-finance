import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import truncateEthAddress from 'truncate-eth-address'
import { usePicasso } from 'hooks/usePicasso'
import { AiOutlineSearch } from 'react-icons/ai'
import { FiFilter } from 'react-icons/fi'
import { IoChevronDownOutline } from 'react-icons/io5'
import { BsThreeDotsVertical } from 'react-icons/bs'

const TeamFinanceOverall = () => {
	const theme = usePicasso()
	return (
		<Flex
			h="60vh"
			ml="24"
			mt="16"
			mr="12"
			position="fixed"
			bg={theme.bg.container}
			borderRadius="12"
			flexDirection="column"
		>
			<Flex mt="5" ml="6">
				<Flex mr="80">
					<Text>Celebrities Team</Text>
				</Flex>
				<Flex>
					<Button bg="none">
						<Icon as={BsThreeDotsVertical} />
					</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default TeamFinanceOverall
