import { useUsersQuery } from 'gql-gen'
import Head from 'next/head'

export default function Home() {
	const { data } = useUsersQuery()

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>{JSON.stringify(data?.users?.users)}</main>
		</>
	)
}
