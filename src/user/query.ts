import prisma from 'lib/prisma'
import { idArg, list, nonNull, queryField } from 'nexus'
import { NotFoundError } from 'utils/errors'

export const userById = queryField('userById', {
	type: 'UserResult',
	args: {
		id: nonNull(idArg())
	},
	async resolve(_, { id }) {
		const user = await prisma.user.findUnique({
			where: {
				id: Number(id)
			}
		})
		return user ? user : NotFoundError
	}
})

export const users = queryField('users', {
	type: list('UserResult'),
	validation: (args) => undefined,
	async resolve() {
		const users = await prisma.user.findMany()
		return users
	}
})
