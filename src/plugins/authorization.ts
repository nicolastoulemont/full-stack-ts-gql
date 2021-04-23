import { plugin } from 'nexus'
import { printedGenTyping } from 'nexus/dist/utils'

const fieldDefTypes = printedGenTyping({
	optional: true,
	name: 'authorization',
	description: `
      Authorization for an individual field. Returning "undefined"
      or "Promise<undefined>" means the field can be accessed.
      Returning "UserAuthenticationError" will prevent the resolver from executing.
    `,
	type: `(ctx: any) => NexusGenFieldTypes['UserAuthenticationError'] | undefined`
})

export const fieldAuthorizationPlugin = plugin({
	name: 'FieldAuthPlugin',
	description: `Field level Auth plugin which
     return the validation fn errors instead of throwing them`,
	fieldDefTypes: fieldDefTypes,
	onCreateFieldResolver(config) {
		const authorization = config.fieldConfig.extensions?.nexus?.config.authorization
		// If the field doesn't have an authorization field, don't worry about wrapping the resolver
		if (authorization == null) {
			return
		}

		// If it does have this field, but it's not a function, it's wrong -> print a warning
		if (typeof authorization !== 'function') {
			console.error(
				new Error(
					`The auth property provided to ${config.fieldConfig.name} with type ${
						config.fieldConfig.type
					} should be a function, saw ${typeof authorization}`
				)
			)
			return
		}

		return async (root, args, ctx, info, next) => {
			const error = authorization(ctx)
			if (error) return error
			return await next(root, args, ctx, info)
		}
	}
})
