import { Flex } from '@chakra-ui/react'
import TeamTable from 'components/Teams/TeamTable'
import { AppLayout } from 'layouts'

const TeamsContainer = () => {
	return (
		<Flex>
			<AppLayout>
				<TeamTable />
			</AppLayout>
		</Flex>
	)
}

export default TeamsContainer
