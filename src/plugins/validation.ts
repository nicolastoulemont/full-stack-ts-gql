import { plugin } from 'nexus'
import { printedGenTyping } from 'nexus/dist/utils'

const fieldDefTypes = printedGenTyping({
	optional: true,
	name: 'validation',
	description: `
      Validation for an individual field. Returning "undefined"
      or "Promise<undefined>" means the field can be accessed.
      Returning InvalidArgumentsError or "Promise<InvalidArgumentsError>" will prevent the resolver from executing.
    `,
	type: `(args: any) => NexusGenFieldTypes['InvalidArgumentsError'] | undefined`
})

export const fieldValidationPlugin = plugin({
	name: 'fieldValidationPlugin',
	description: `Field level validation plugin which
     return an InvalidArgumentsError if one or more args are faulty`,
	fieldDefTypes: fieldDefTypes,
	onCreateFieldResolver(config) {
		const validation = config.fieldConfig.extensions?.nexus?.config.validation
		// If the field doesn't have an validation field, don't worry about wrapping the resolver
		if (validation == null) {
			return
		}

		// If it does have this field, but it's not a function, it's wrong - let's provide a warning
		if (typeof validation !== 'function') {
			console.error(
				new Error(
					`The validation property provided to ${config.fieldConfig.name} with type ${
						config.fieldConfig.type
					} should be a function, saw ${typeof validation}`
				)
			)
			return
		}

		return async (root, args, ctx, info, next) => {
			const error = validation(args)
			if (error) return error
			return await next(root, args, ctx, info)
		}
	}
})
