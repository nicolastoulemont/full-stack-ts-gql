import { idArg, nonNull, objectType, queryField } from 'nexus'

const data = [
	{ id: '1', username: 'Nicolas', email: 'nicolas@email.com', verified: true },
	{ id: '2', username: 'David', email: 'david@email.com', verified: false },
	{ id: '3', username: 'Matthieu', email: 'matthieu@email.com', verified: true }
]

export const Error = objectType({
	name: 'Error',
	definition(t) {
		t.string('key')
		t.string('message')
	}
})

export const User = objectType({
	name: 'User',
	definition(t) {
		t.id('id')
		t.string('username')
		t.string('email')
		t.boolean('verified')
	}
})

export const UserResponse = objectType({
	name: 'UserResponse',
	definition(t) {
		t.field('user', { type: 'User' })
		t.list.field('errors', { type: 'Error' })
	}
})

export const UsersResponse = objectType({
	name: 'UsersResponse',
	definition(t) {
		t.list.field('users', { type: 'User' })
		t.list.field('errors', { type: 'Error' })
	}
})

export const userById = queryField('userById', {
	type: 'UserResponse',
	args: {
		id: nonNull(idArg())
	},
	async resolve(_, args) {
		try {
			const user = data.find((user) => user.id === args.id)
			return { user }
		} catch (err) {
			return {
				errors: [
					{ key: 'not_found', message: `No user matching the id: ${args.id} was found` }
				]
			}
		}
	}
})

export const users = queryField('users', {
	type: 'UsersResponse',
	async resolve() {
		return { users: data }
	}
})
