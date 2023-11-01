export const convertJoinDateToBigInt = (joinDate: string) => {
	if (Date.parse(joinDate)) {
		const date = new Date(joinDate);
		const dateInMilliseconds = date.getTime();
		const dateInBigInt = BigInt(dateInMilliseconds);
		return dateInBigInt;
	}
	return null;
};
