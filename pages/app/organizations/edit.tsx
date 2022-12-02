import { EditOrganization } from 'containers';

export const Edit = () => (
	<EditOrganization
		name="Kylie Cosmetics "
		type={{ label: 'DAO', value: 'DAO' }}
		email="hello@kyliecosmetics.com"
		network={{ label: 'Ethereum', value: 'Ethereum', icon: '/images/eth.png' }}
		description="Hello"
	/>
);
export default Edit;
