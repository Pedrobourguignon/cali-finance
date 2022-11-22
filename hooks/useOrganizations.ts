import { OrganizationsContext } from 'contexts';
import { useContext } from 'react';

export const useOrganizations = () => useContext(OrganizationsContext);
