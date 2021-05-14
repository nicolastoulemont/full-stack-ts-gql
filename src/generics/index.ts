import { interfaceType } from 'nexus'

export const Node = interfaceType({
	name: 'Node',
	definition(t) {
		t.int('id', { description: 'GUID for a resource' })
	}
})
