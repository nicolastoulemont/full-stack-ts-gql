import { ApolloServer } from 'apollo-server-micro'
import { schema } from 'src/schema'
export const config = {
	api: {
		bodyParser: false
	}
}

const server = new ApolloServer({
	schema,
	context: ({ req, res }) => ({ req, res, ctx: { logged: true } })
})

const handler = server.createHandler({
	path: '/api/graphql'
})

export default handler
