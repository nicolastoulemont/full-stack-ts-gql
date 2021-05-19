import { UpdateResolver } from '@urql/exchange-graphcache'

export const subscriptionExample: UpdateResolver = (result, args, cache, info) => {
	console.log('result', result)
	console.log('args', args)
	console.log('cache', cache)
	console.log('info', info)
}
