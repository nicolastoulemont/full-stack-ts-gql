type TypeNameValueOf<T extends { __typename: string }> = T['__typename']

export function isType<
	Result extends { __typename: string },
	Typename extends TypeNameValueOf<Result>
>(result: Result, typename: Typename): result is Extract<Result, { __typename: Typename }> {
	return result?.__typename === typename
}

export function isTypeInTuple<
	ResultItem extends { __typename: string },
	Typename extends TypeNameValueOf<ResultItem>
>(typename: Typename): (o: ResultItem) => o is Extract<ResultItem, Record<'__typename', Typename>> {
	return function (
		resultItem: ResultItem
	): resultItem is Extract<ResultItem, Record<'__typename', Typename>> {
		return isType(resultItem, typename)
	}
}

export function isEither<
	Result extends { __typename: string },
	Typename extends TypeNameValueOf<Result>,
	PossibleTypes extends Array<Typename>
>(
	result: Result,
	typenames: PossibleTypes
): result is Extract<Result, { __typename: typeof typenames[number] }> {
	return typenames?.filter((type) => isType(result, type)).length > 0
}
