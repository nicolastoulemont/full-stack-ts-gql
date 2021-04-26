import { Error } from 'gql-gen'
import { NexusGenFieldTypes } from 'src/nexus'

type ApiErrorArray = Array<Pick<Error, 'message' | 'key'>>
export function toErrorRecord(errorsArray: ApiErrorArray) {
	return errorsArray.reduce((acc, { key, message }) => {
		acc[key] = message
		return acc
	}, {})
}

export type ValidationFn = (key: string, value: string | number) => string | null

export interface lookupObj {
	[key: string]: ValidationFn
}

export function checkArgs(
	args: any,
	keys: Array<string>
): NexusGenFieldTypes['InvalidArgumentsError'] | undefined {
	// Gather the required keys and validation need and transform it into a [key]: validationFn lookup
	// "req" is set as the default validationFn for better DX.
	const lookup = keys.reduce((acc: lookupObj, key: string) => {
		const [targetKey, targetFn = 'req'] = key.split(':')
		acc[targetKey] = checkFns[targetFn]
		return acc
	}, {})

	let errors: Array<{ key: string; message: string }> = []

	// Apply the chosen validation method
	function validate(key: string, value: any) {
		if (typeof value === 'string' || 'number') {
			if (lookup[key]) {
				const message = lookup[key](key, value)
				if (message) {
					errors.push({ key: key, message })
				}
			}
		}
	}

	// Recursively parse the args until the fields can be checked if needed
	function parseObj(args: any) {
		for (const key in args) {
			if (Array.isArray(args[key])) {
				if (args[key].length > 0) {
					args[key].forEach(
						(item: any) => typeof item !== 'boolean' && validate(key, item)
					)
				} else {
					validate(key, args[key])
				}
			} else if (typeof args[key] === 'object') {
				parseObj(args[key])
			} else {
				validate(key, args[key])
			}
		}
	}

	parseObj(args)
	if (errors.length > 0) {
		return {
			code: 'BAD_REQUEST',
			message: 'UNABLE_TO_PROCESS_REQUEST_DUE_TO_CLIENT_ERROR',
			invalidArguments: errors
		}
	} else {
		return undefined
	}
}

export const checkFns: { [key: string]: ValidationFn } = {
	mail: validateEmail,
	req: validateReq
}

export const isEmpty = (value: any): boolean =>
	value === undefined ||
	value === null ||
	(typeof value === 'object' && Object.keys(value).length === 0) ||
	(typeof value === 'string' && value.trim().length === 0)

// Functions to validate user Inputs
export function validateEmail(key: string, value: string | number): string | null {
	if (typeof value !== 'string') {
		return `${value} is not a string`
	}

	if (value === '') return 'Email is required'
	/* eslint-disable no-useless-escape */
	const email_regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/)
	/* eslint-enable */
	if (!email_regex.test(value)) {
		return `${value} is not a valid email address`
	} else {
		return null
	}
}

export function validateReq(key: string, value: number | string): string | null {
	if (isEmpty(value)) {
		return `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
	} else {
		return null
	}
}
