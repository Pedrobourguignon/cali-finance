import { CreateTeamComponent, AllTeamsComponent } from 'components';
import { CompaniesProvider, TeamsProvider } from 'contexts';
import { useState } from 'react';

export const AllTeamsContainer = () => {
	const [displayTeams, setDisplayTeams] = useState('flex');
	const [displayCreateTeams, setDisplayCreateTeams] = useState('none');

	const changeToCreateTeamTab = () => {
		if (displayTeams === 'flex' && displayCreateTeams === 'none') {
			setDisplayTeams('none');
			setDisplayCreateTeams('flex');
		} else {
			setDisplayTeams('flex');
			setDisplayCreateTeams('none');
		}
	};

	return (
		<CompaniesProvider>
			<TeamsProvider>
				<AllTeamsComponent
					display={displayTeams}
					changeToCreateTeamTab={changeToCreateTeamTab}
				>
					<CreateTeamComponent
						display={displayCreateTeams}
						changeToCreateTeamTab={changeToCreateTeamTab}
					/>
				</AllTeamsComponent>
			</TeamsProvider>
		</CompaniesProvider>
	);
};
