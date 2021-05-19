import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'urql'
import { client, ssrCache } from 'lib/urql'
function MyApp({ Component, pageProps }) {
	if (pageProps.urqlState) {
		ssrCache.restoreData(pageProps.urqlState)
	}

	return (
		<Provider value={client}>
			<ChakraProvider resetCSS={true}>
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	)
}

export default MyApp
