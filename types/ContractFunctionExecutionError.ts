import { BaseError } from 'viem';

export type IContractFunctionExecutionError = BaseError & {
	cause: { reason: string };
};
