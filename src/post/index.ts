import prisma from 'lib/prisma'
import { objectType } from 'nexus'
export * from './mutation'

export const Post = objectType({
	name: 'Post',
	isTypeOf: (data) => Boolean((data as any).name),
	definition(t) {
		t.int('id')
		t.date('createdAt')
		t.date('updatedAt')
		t.string('title')
		t.nullable.string('content')
		t.boolean('published')
		t.nullable.field('author', {
			type: 'User',
			resolve: (parent) =>
				prisma.post.findUnique({ where: { id: Number(parent.id) } }).author()
		})
	}
})
