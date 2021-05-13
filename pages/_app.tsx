import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apollo'
import { ChakraProvider } from '@chakra-ui/react'

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
