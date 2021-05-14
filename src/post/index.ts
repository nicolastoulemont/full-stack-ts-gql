import prisma from 'lib/prisma'
import { objectType, unionType } from 'nexus'
export * from './mutation'

export const Post = objectType({
	name: 'Post',
	isTypeOf: (data) => Boolean((data as any).title),
	definition(t) {
		t.implements('Node')
		t.date('createdAt')
		t.date('updatedAt')
		t.string('title')
		t.nullable.string('content')
		t.boolean('published')
		t.nullable.field('author', {
			type: 'User',
			resolve: async (p) => await prisma.post.findUnique({ where: { id: p.id } }).author()
		})
	}
})

export const PostResult = unionType({
	name: 'PostResult',
	description: 'Return a post and post related errors',
	definition(t) {
		t.members('Post', 'UserAuthenticationError', 'InvalidArgumentsError')
	}
})
