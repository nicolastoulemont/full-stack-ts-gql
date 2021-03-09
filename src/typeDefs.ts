import {
	booleanArg,
	idArg,
	mutationField,
	nonNull,
	objectType,
	queryField,
	stringArg,
	list,
	unionType
} from 'nexus'

const data = [
	{ id: '1', username: 'Nicolas', email: 'nicolas@email.com', verified: true },
	{ id: '2', username: 'David', email: 'david@email.com', verified: false },
	{ id: '3', username: 'Matthieu', email: 'matthieu@email.com', verified: true }
]

export const Error = objectType({
	name: 'Error',
	isTypeOf(data) {
		return Boolean((data as any).code)
	},
	definition(t) {
		t.string('code')
		t.string('key')
		t.string('message')
	}
})

export const User = objectType({
	name: 'User',
	isTypeOf(data) {
		return Boolean((data as any).username)
	},
	definition(t) {
		t.id('id')
		t.string('username')
		t.string('email')
		t.boolean('verified')
	}
})

export const UserResult = unionType({
	name: 'UserResult',
	description: 'User or Error',
	definition(t) {
		t.members('User', 'Error')
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
	async resolve(_, args) {
		if (args.username === 'diane') {
			return { code: 'ERROR', key: 'username', message: 'dummy error message' }
		} else {
			data.push(args)
			return args
		}
	}
})
