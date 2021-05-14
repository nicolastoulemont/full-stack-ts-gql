import { NexusGenFieldTypes } from '../../src/nexus'

export const NotFoundError: NexusGenFieldTypes['NotFoundError'] = {
	code: 'NOT_FOUND',
	message: 'RESOURCE_NOT_FOUND'
}

export const UserAuthenticationError: NexusGenFieldTypes['UserAuthenticationError'] = {
	code: 'UNAUTHORIZED',
	message: 'UNAUTHENTICATED_PLEASE_LOGIN'
}

export const PartialInvalidArgumentsError: Pick<
	NexusGenFieldTypes['InvalidArgumentsError'],
	'code' | 'message'
> = {
	code: 'BAD_REQUEST',
	message: 'UNABLE_TO_PROCESS_REQUEST_DUE_TO_CLIENT_ERROR'
}
