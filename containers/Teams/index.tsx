import { Flex } from '@chakra-ui/react'
import TeamFinanceOverall from 'components/Teams/TeamFinanceOverall'
import TeamTable from 'components/Teams/TeamTable'
import { AppLayout } from 'layouts'

const TeamsContainer = () => {
	return (
		<Flex>
			<AppLayout>
				<Flex>
					<TeamTable />
				</Flex>
				<Flex>
					<TeamFinanceOverall />
				</Flex>
			</AppLayout>
		</Flex>
	)
}

export default TeamsContainer
