import { ApolloServer } from 'apollo-server-micro'
import { schema } from 'src/schema'
export const config = {
	api: {
		bodyParser: false
	}
}

const server = new ApolloServer({ schema })

const handler = server.createHandler({
	path: '/api/graphql'
})

export default handler
