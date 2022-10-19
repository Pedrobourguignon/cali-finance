import { createContext, useMemo, useState } from 'react';
import { IOrganization } from 'types/contexts/organizations';

interface IOrganizationsContext {
	setOrganization: (organization: IOrganization) => void;
}

export const OrganizationsContext = createContext({} as IOrganizationsContext);

export const TeamsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [organization, setOrganization] = useState<IOrganization[]>([]);

	const contextStates = useMemo(
		() => ({
			setOrganization,
		}),
		[organization]
	);
	return (
		<OrganizationsContext.Provider value={contextStates}>
			{children}
		</OrganizationsContext.Provider>
	);
};
