import { ToastId, useToast, UseToastOptions } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';

const useToasty = () => {
	const [state, setState] = useState({} as UseToastOptions);
	const toast = useToast();
	const toastIdRef = useRef<ToastId>();

	const updateState = (newState: UseToastOptions) => {
		if (toastIdRef.current) {
			toast.update(toastIdRef.current, newState);
		} else {
			toast({
				duration: 5000,
				position: 'top',
				isClosable: true,
				...newState,
			});
		}
	};

	useEffect(() => {
		if (state && Object.keys(state).length !== 0) {
			toastIdRef.current = toast({
				duration: 5000,
				position: 'top',
				isClosable: true,
				...state,
			});
		}
	}, [state, toast]);

	return { toastState: state, toast: setState, updateState };
};

export { useToasty };
