import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apolloClient'

function MyApp({ Component, pageProps }) {
	const client = useApollo()

	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}

export default MyApp
