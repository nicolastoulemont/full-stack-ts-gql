import prisma from 'lib/prisma'
import { mutationField, nonNull, stringArg, arg, intArg } from 'nexus'

export const createUser = mutationField('createUser', {
	type: 'UserResult',
	args: {
		name: nonNull(stringArg()),
		email: nonNull(stringArg())
	},
	authorization: ({ ctx }) =>
		!ctx.logged && { code: 'UNAUTHORIZED', message: 'UNAUTHENTICATED_PLEASE_LOGIN' },
	validation: (args) =>
		args.name === 'diane' && {
			code: 'BAD_REQUEST',
			message: 'UNABLE_TO_PROCESS_REQUEST_DUE_TO_CLIENT_ERROR',
			invalidArguments: [{ key: 'name', message: 'diane is not a valid username' }]
		},
	async resolve(_, { name, email }) {
		const user = await prisma.user.create({
			data: {
				name,
				email
			}
		})
		return user
	}
})

export const changeUserStatus = mutationField('changeUserStatus', {
	type: 'UserResult',
	args: {
		status: nonNull(arg({ type: 'UserStatus' })),
		id: nonNull(intArg())
	},
	async resolve(_, args) {
		const updatedUser = await prisma.user.update({
			where: { id: args.id },
			data: {
				status: args.status,
				deletedAt: args.status === 'DELETED' ? new Date() : null,
				banReason: args.status === 'BANNED' ? 'deserved it !' : null
			}
		})
		return updatedUser
	}
})
