type TypeNameValueOf<T extends { __typename: string }> = T['__typename']

export function isType<
	Result extends { __typename: string },
	Typename extends TypeNameValueOf<Result>
>(result: Result, typename: Typename): result is Extract<Result, { __typename: Typename }> {
	return typeof result === 'undefined' ? false : result.__typename === typename
}

export const isTypeInTuple = <
	ResultItem extends { __typename: string },
	Typename extends TypeNameValueOf<ResultItem>
>(
	typename: Typename
): ((
	resultItem: ResultItem
) => resultItem is Extract<ResultItem, Record<'__typename', Typename>>) => (
	resultItem: ResultItem
): resultItem is Extract<ResultItem, Record<'__typename', Typename>> =>
	resultItem['__typename'] === typename
