import { CreateTeamComponent, TeamsComponent } from 'components';
import { OrganizationsProvider } from 'contexts';
import { useState } from 'react';

export const TeamsContainer = () => {
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
		<OrganizationsProvider>
			<TeamsComponent
				display={displayTeams}
				changeToCreateTeamTab={changeToCreateTeamTab}
			>
				<CreateTeamComponent
					display={displayCreateTeams}
					changeToCreateTeamTab={changeToCreateTeamTab}
				/>
			</TeamsComponent>
		</OrganizationsProvider>
	);
};
