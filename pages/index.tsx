import { useCreateUserMutation, useUsersQuery } from 'gql-gen'
import Head from 'next/head'
import { useState } from 'react'

const initialState = {
	id: '',
	username: '',
	email: '',
	verified: false
}

export default function Home() {
	const [state, setState] = useState(initialState)
	const { data } = useUsersQuery()
	const [saveUser] = useCreateUserMutation({
		variables: {
			id: state.id,
			username: state.username,
			email: state.email,
			verified: state.verified
		}
	})

	async function handleClick() {
		const { data } = await saveUser({
			update: (cache, { data: { createUser } }) => {
				cache.modify({
					fields: {
						users: (users) => ('id' in createUser ? [...users, createUser] : [...users])
					}
				})
			}
		})
		if ('id' in data.createUser) {
			setState(initialState)
		}
	}

	return (
		<>
			<Head>
				<title>Awesome custom hooks</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					justifyContent: 'space-evenly',
					width: '100%'
				}}
			>
				<ul>
					{data?.users?.map((user) => (
						<li key={user.id}>
							{user.username} - {user.email} -{' '}
							{user.verified ? 'Verified' : 'Not verified'}
						</li>
					))}
				</ul>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<input
						type='text'
						name='id'
						placeholder='id'
						value={state.id}
						onChange={(e) => setState({ ...state, id: e.target.value })}
						style={{ margin: '10px auto' }}
					/>
					<input
						type='text'
						name='username'
						placeholder='username'
						value={state.username}
						onChange={(e) => setState({ ...state, username: e.target.value })}
						style={{ margin: '10px auto' }}
					/>
					<input
						type='text'
						name='email'
						placeholder='email'
						value={state.email}
						onChange={(e) => setState({ ...state, email: e.target.value })}
						style={{ margin: '10px auto' }}
					/>
					<input
						type='checkbox'
						name='verified'
						checked={state.verified}
						onChange={(e) => setState({ ...state, verified: e.target.checked })}
						style={{ margin: '10px auto' }}
					/>
					<button onClick={handleClick}>Click me</button>
				</div>
			</main>
		</>
	)
}
