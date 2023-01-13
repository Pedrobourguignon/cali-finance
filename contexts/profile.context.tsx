import React, {
	useEffect,
	createContext,
	useState,
	useMemo,
	Dispatch,
	SetStateAction,
} from 'react';
import { string } from 'yup';

interface IProfileData {
	name: string;
	photo: string;
	email: string;
}
interface IProfileContext {
	name: string;
	picture: string;
	lastName: string;
	isLoading: boolean;
	setProfilePicture: Dispatch<SetStateAction<string>>;
	profilePicture: string;
	profileData: IProfileData;
	setProfileData: React.Dispatch<React.SetStateAction<IProfileData>>;
}

export const ProfileContext = createContext({} as IProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [picture, setPicture] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [profilePicture, setProfilePicture] = useState('');
	const [profileData, setProfileData] = useState<IProfileData>({
		name: 'Anteteguemon',
		photo: 'https://img.wattpad.com/cover/30289076-288-k813900.jpg',
		email: 'ante@ante.com',
	} as IProfileData);

	useEffect(() => {
		const randomNumber = Math.floor(Math.random() * 4);
		const randomName = [
			'Bradley Cooper',
			'Jack Chan',
			'Jet Li',
			'Morgan Freeman',
		][randomNumber];
		setName(randomName.split(' ')[0]);
		setLastName(randomName.split(' ')[1]);

		const randomPicture = [
			'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRIJYVo526c4XTP0V4CyE2XbTLsdYcxSilLYaSDYC4XDtXArbTNxmX63MnX3gP6d2cI',
			'https://img.wattpad.com/cover/30289076-288-k813900.jpg',
			'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Jet_Li_2009_%28cropped%29.jpg/1200px-Jet_Li_2009_%28cropped%29.jpg',
			'https://cinema10.com.br/upload/personalidades/personalidades_2078_Morgan%20Freeman.jpg',
		][randomNumber];
		setPicture(randomPicture);
		setIsLoading(false);
	}, []);

	const contextStates = useMemo(
		() => ({
			name,
			picture,
			lastName,
			isLoading,
			profilePicture,
			setProfilePicture,
			profileData,
			setProfileData,
		}),
		[
			name,
			lastName,
			picture,
			isLoading,
			profilePicture,
			setProfilePicture,
			profileData,
			setProfileData,
		]
	);

	return (
		<ProfileContext.Provider value={contextStates}>
			{children}
		</ProfileContext.Provider>
	);
};
