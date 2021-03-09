import {
	booleanArg,
	idArg,
	mutationField,
	nonNull,
	objectType,
	queryField,
	stringArg,
	list
} from 'nexus'

const data = [
	{ id: '1', username: 'Nicolas', email: 'nicolas@email.com', verified: true },
	{ id: '2', username: 'David', email: 'david@email.com', verified: false },
	{ id: '3', username: 'Matthieu', email: 'matthieu@email.com', verified: true }
]

// export const Error = objectType({
// 	name: 'Error',
// 	definition(t) {
// 		t.string('key')
// 		t.string('message')
// 	}
// })

export const User = objectType({
	name: 'User',
	definition(t) {
		t.id('id')
		t.string('username')
		t.string('email')
		t.boolean('verified')
	}
})

// export const UserResponse = objectType({
// 	name: 'UserResponse',
// 	definition(t) {
// 		t.field('user', { type: 'User' })
// 		t.list.field('errors', { type: 'Error' })
// 	}
// })

// export const UsersResponse = objectType({
// 	name: 'UsersResponse',
// 	definition(t) {
// 		t.list.field('users', { type: 'User' })
// 		t.list.field('errors', { type: 'Error' })
// 	}
// })

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
	type: list('User'),
	args: {
		id: nonNull(stringArg()),
		username: nonNull(stringArg()),
		email: nonNull(stringArg()),
		verified: nonNull(booleanArg({ default: false }))
	},
	async resolve(_, args) {
		console.log(args)
		data.push(args)
		console.log(data)
		return data
	}
})
