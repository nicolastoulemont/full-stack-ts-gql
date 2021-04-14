import {
	booleanArg,
	idArg,
	mutationField,
	nonNull,
	objectType,
	queryField,
	stringArg,
	list,
	unionType,
	enumType
} from 'nexus'

const data = [
	{ id: '1', username: 'Nicolas', email: 'nicolas@email.com', verified: true },
	{ id: '2', username: 'David', email: 'david@email.com', verified: false },
	{ id: '3', username: 'Matthieu', email: 'matthieu@email.com', verified: true }
]

export const ErrorCode = enumType({
	name: 'ErrorCode',
	description: 'The differents error codes the api will return if needed',
	members: ['UNAUTHORIZED', 'BAD_REQUEST']
})

export const ErrorMessage = enumType({
	name: 'ErrorMessage',
	description: 'The differents error message the api will return if needed',
	members: ['UNAUTHENTICATED_PLEASE_LOGIN', 'UNABLE_TO_PROCESS_REQUEST_DUE_TO_CLIENT_ERROR']
})

export const UserAuthenticationError = objectType({
	name: 'UserAuthenticationError',
	isTypeOf: (data) => (data as any).code === 'UNAUTHORIZED',
	definition(t) {
		t.field('code', {
			// @ts-ignore
			type: 'ErrorCode',
			resolve: () => 'UNAUTHORIZED'
		})
		t.field('message', {
			// @ts-ignore
			type: 'ErrorMessage',
			resolve: () => 'UNAUTHENTICATED_PLEASE_LOGIN'
		})
	}
})

export const InvalidArgumentsError = objectType({
	name: 'InvalidArgumentsError',
	isTypeOf: (data) => (data as any).code === 'BAD_REQUEST',
	definition(t) {
		t.field('code', {
			type: 'ErrorCode',
			resolve: () => 'BAD_REQUEST'
		})
		t.field('message', {
			type: 'ErrorMessage',
			resolve: () => 'UNABLE_TO_PROCESS_REQUEST_DUE_TO_CLIENT_ERROR'
		})
		t.list.field('invalidArguments', { type: 'Error' })
	}
})

export const Error = objectType({
	name: 'Error',
	isTypeOf: (data) => Boolean((data as any).message),
	definition(t) {
		t.string('key')
		t.string('message')
	}
})

export const User = objectType({
	name: 'User',
	isTypeOf: (data) => Boolean((data as any).username),
	definition(t) {
		t.id('id')
		t.string('username')
		t.string('email')
		t.boolean('verified')
	}
})

export const UserResult = unionType({
	name: 'UserResult',
	description: 'Return a user or user related errors',
	definition(t) {
		t.members('User', 'UserAuthenticationError', 'InvalidArgumentsError')
	}
})

export const userById = queryField('userById', {
	type: 'User',
	args: {
		id: nonNull(idArg())
	},
	async resolve(_, args) {
		const user = data.find((user) => user.id === args.id)
		return user
	}
})

export const users = queryField('users', {
	type: list('User'),
	async resolve() {
		return data
	}
})

export const createUser = mutationField('createUser', {
	type: 'UserResult',
	args: {
		id: nonNull(stringArg()),
		username: nonNull(stringArg()),
		email: nonNull(stringArg()),
		verified: nonNull(booleanArg({ default: false }))
	},
	authorization: ({ ctx }) =>
		!ctx.logged ? { code: 'UNAUTHORIZED', message: 'UNAUTHENTICATED_PLEASE_LOGIN' } : undefined,
	validation: (args) =>
		args.username === 'diane'
			? {
					code: 'BAD_REQUEST',
					message: 'UNABLE_TO_PROCESS_REQUEST_DUE_TO_CLIENT_ERROR',
					invalidArguments: [
						{ key: 'username', message: 'diane is not a valid username' }
					]
			  }
			: undefined,
	async resolve(_, args) {
		data.push(args)
		return args
	}
})
