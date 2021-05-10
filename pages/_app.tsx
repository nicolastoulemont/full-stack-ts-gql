import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apolloClient'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
	const client = useApollo()

	return (
		<ApolloProvider client={client}>
			<ChakraProvider resetCSS={true}>
				<Component {...pageProps} />
			</ChakraProvider>
		</ApolloProvider>
	)
}

export default MyApp
