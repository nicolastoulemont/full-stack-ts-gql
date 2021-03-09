import { makeSchema } from 'nexus'
import * as types from './typeDefs'
import path from 'path'

export const schema = makeSchema({
	types,
	outputs: {
		schema: path.join(process.cwd(), 'src', 'schema.graphql'),
		typegen: path.join(process.cwd(), 'src', 'nexus.ts')
	}
})
