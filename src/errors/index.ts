import { enumType, interfaceType, objectType } from 'nexus'

export const ErrorCode = enumType({
	name: 'ErrorCode',
	description: 'The differents error codes the api will return',
	members: ['UNAUTHORIZED', 'BAD_REQUEST']
})

export const ErrorMessage = enumType({
	name: 'ErrorMessage',
	description: 'The differents error message the api will return',
	members: ['UNAUTHENTICATED_PLEASE_LOGIN', 'UNABLE_TO_PROCESS_REQUEST_DUE_TO_CLIENT_ERROR']
})

export const Error = interfaceType({
	name: 'Error',
	definition(t) {
		t.field('code', { type: 'ErrorCode' })
		t.field('message', { type: 'ErrorMessage' })
	}
})

export const UserAuthenticationError = objectType({
	name: 'UserAuthenticationError',
	isTypeOf: (data) => (data as any).code === 'UNAUTHORIZED',
	definition(t) {
		t.implements('Error')
		t.field('code', {
			type: 'ErrorCode',
			resolve: () => 'UNAUTHORIZED'
		})
		t.field('message', {
			type: 'ErrorMessage',
			resolve: () => 'UNAUTHENTICATED_PLEASE_LOGIN'
		})
	}
})

export const InvalidArgumentsError = objectType({
	name: 'InvalidArgumentsError',
	isTypeOf: (data) => (data as any).code === 'BAD_REQUEST',
	definition(t) {
		t.implements('Error')
		t.field('code', {
			type: 'ErrorCode',
			resolve: () => 'BAD_REQUEST'
		})
		t.field('message', {
			type: 'ErrorMessage',
			resolve: () => 'UNABLE_TO_PROCESS_REQUEST_DUE_TO_CLIENT_ERROR'
		})
		t.list.field('invalidArguments', { type: 'InvalidArgument' })
	}
})

export const InvalidArgument = objectType({
	name: 'InvalidArgument',
	definition(t) {
		t.string('key')
		t.string('message')
	}
})
