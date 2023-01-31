import { CompaniesContext } from 'contexts';
import { useContext } from 'react';

export const useCompanies = () => useContext(CompaniesContext);
