import prisma from 'lib/prisma'
import { idArg, list, nonNull, queryField } from 'nexus'

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
		return user
	}
})

export const users = queryField('users', {
	type: list('UserResult'),
	async resolve() {
		const users = await prisma.user.findMany()
		return users
	}
})
