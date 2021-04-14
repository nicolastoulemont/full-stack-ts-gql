import prisma from 'lib/prisma'
import { mutationField, nonNull, stringArg } from 'nexus'

export const createPost = mutationField('createPost', {
	type: 'Post',
	args: {
		title: nonNull(stringArg()),
		content: stringArg(),
		authorEmail: stringArg()
	},
	async resolve(_, { title, content, authorEmail }) {
		const post = await prisma.post.create({
			data: {
				title,
				content,
				published: false,
				author: {
					connect: { email: authorEmail }
				}
			}
		})
		return post
	}
})
