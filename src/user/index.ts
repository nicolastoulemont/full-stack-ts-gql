import { enumType, interfaceType, objectType, unionType } from 'nexus'
export * from './query'
export * from './mutation'
import prisma from 'lib/prisma'

export const User = interfaceType({
	name: 'User',
	definition(t) {
		t.int('id')
		t.nullable.string('name')
		t.field('status', { type: 'UserStatus' })
	}
})

export const ActiveUser = objectType({
	name: 'ActiveUser',
	isTypeOf: (data) => Boolean((data as any).status === 'ACTIVE'),
	definition(t) {
		t.implements('User')
		t.string('email')
		t.list.field('posts', {
			type: 'Post',
			resolve: async (u) => await prisma.user.findUnique({ where: { id: u.id } }).posts()
		})
	}
})

export const UserResult = unionType({
	name: 'UserResult',
	description: 'Return a user or user related errors',
	definition(t) {
		t.members(
			'ActiveUser',
			'DeletedUser',
			'BannedUser',
			'UserAuthenticationError',
			'InvalidArgumentsError',
			'NotFoundError'
		)
	}
})

export const UserStatus = enumType({
	name: 'UserStatus',
	members: ['ACTIVE', 'DELETED', 'BANNED'],
	description: 'User account status'
})

export const deletedUser = objectType({
	name: 'DeletedUser',
	isTypeOf: (data) => Boolean((data as any).status === 'DELETED'),
	definition(t) {
		t.implements('User')
		t.field('status', { type: 'UserStatus' })
		t.date('deletedAt')
	}
})

export const bannedUser = objectType({
	name: 'BannedUser',
	isTypeOf: (data) => Boolean((data as any).status === 'BANNED'),
	definition(t) {
		t.implements('User')
		t.field('status', { type: 'UserStatus' })
		t.nullable.string('banReason')
	}
})
