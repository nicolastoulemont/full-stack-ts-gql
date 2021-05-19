import { createClient, ssrExchange, dedupExchange, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'
import { Mutation, Subscription } from './cache'
import schema from 'introspection/schema.json'

const isServerSide = typeof window === 'undefined'
const ssrCache = ssrExchange({ isClient: !isServerSide })
const client = createClient({
	url: '/api/graphql',
	exchanges: [
		dedupExchange,
		// @ts-expect-error
		cacheExchange({ updates: { Mutation, Subscription }, schema }),
		ssrCache,
		fetchExchange
	],
	fetchOptions: () => {
		return { headers: {} }
	}
})

export { client, ssrCache }
