import { TokensContext } from 'contexts';
import { useContext } from 'react';

export const useTokens = () => useContext(TokensContext);
