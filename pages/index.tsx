import { useUsersQuery } from 'gql-gen'
import Head from 'next/head'

export default function Home() {
	const { data } = useUsersQuery()

	return (
		<>
			<Head>
				<title>Awesome custom hooks</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				{data?.users?.users?.map((user) => (
					<div key={user.id}>
						{user.username} - {user.email}{' '}
					</div>
				))}
			</main>
		</>
	)
}
