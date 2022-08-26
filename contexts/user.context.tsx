import { createContext, useMemo } from 'react';
import { IUserContext } from 'types';

export const UserContext = createContext({} as IUserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const percentage = 10;
	const contextStates = useMemo(
		() => ({
			percentage,
		}),
		[percentage]
	);
	return (
		<UserContext.Provider value={contextStates}>
			{children}
		</UserContext.Provider>
	);
};
