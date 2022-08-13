import { ProfileContext } from 'contexts';
import { useContext } from 'react';

export const useProfile = () => useContext(ProfileContext);
