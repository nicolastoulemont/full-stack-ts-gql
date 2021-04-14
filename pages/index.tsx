import Head from 'next/head'
import { useState } from 'react'
import { isType, isTypeInTuple } from 'utils'
import { CheckIcon, CloseIcon, NotAllowedIcon } from '@chakra-ui/icons'
import { GET_USERS } from 'graphql/user/queries'
import {
	useCreateUserMutation,
	useUsersQuery,
	useChangeUserStatusMutation,
	UserStatus,
	UsersQuery
} from 'gql-gen'
import {
	UnorderedList,
	ListItem,
	ListIcon,
	Input,
	Flex,
	Button,
	Box,
	Heading,
	Text,
	IconButton
} from '@chakra-ui/react'

const initialState = {
	name: '',
	email: ''
}

export default function Home() {
	const [{ name, email }, setState] = useState(initialState)
	const [error, setError] = useState({})
	const { data } = useUsersQuery()
	const [saveUser] = useCreateUserMutation({
		variables: {
			name,
			email
		}
	})

	async function handleClick() {
		const { data } = await saveUser({
			update: (cache, { data: { createUser } }) => {
				const existingUsers = cache.readQuery<UsersQuery>({ query: GET_USERS })
				if (
					isType(createUser, 'ActiveUser') ||
					isType(createUser, 'BannedUser') ||
					isType(createUser, 'DeletedUser')
				) {
					cache.writeQuery({
						query: GET_USERS,
						data: {
							users: [...existingUsers.users, createUser]
						}
					})
				}
			}
		})
		if (isType(data?.createUser, 'ActiveUser')) {
			setState(initialState)
			setError({})
		} else {
			setError(data?.createUser)
		}
	}

	const deletedUsers = data?.users?.filter(isTypeInTuple('DeletedUser')) || []
	const bannedUsers = data?.users?.filter(isTypeInTuple('BannedUser')) || []
	const activeUsers = data?.users?.filter(isTypeInTuple('ActiveUser')) || []

	return (
		<>
			<Head>
				<title>200 Error handling with Union Types and Plugins</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Flex
				as='main'
				width='100%'
				height='100vh'
				align='center'
				flexDir='column'
				justify='center'
			>
				<Flex width='500px' mx='auto' mb={6} flexDir='column'>
					<Input
						type='text'
						name='name'
						placeholder='name'
						value={name}
						onChange={(e) => setState((state) => ({ ...state, name: e.target.value }))}
					/>
					<Input
						type='email'
						name='email'
						placeholder='email'
						value={email}
						onChange={(e) => setState((state) => ({ ...state, email: e.target.value }))}
						style={{ margin: '10px auto' }}
					/>

					<Button onClick={handleClick}>Click me</Button>
				</Flex>
				<Flex width='100%' maxW={350 * 3}>
					<UnorderedList width='33%' maxW='350px'>
						<Heading size='md' textAlign='center'>
							Active
						</Heading>
						{activeUsers?.map((user) => (
							<UserListItem user={user} key={user.id} />
						))}
					</UnorderedList>
					<UnorderedList width='33%' maxW='350px'>
						<Heading size='md' textAlign='center'>
							Deleted
						</Heading>
						{deletedUsers?.map((user) => (
							<UserListItem user={user} key={user.id} />
						))}
					</UnorderedList>
					<UnorderedList width='33%' maxW='350px'>
						<Heading size='md' textAlign='center'>
							Banned
						</Heading>
						{bannedUsers?.map((user) => (
							<UserListItem user={user} key={user.id} />
						))}
					</UnorderedList>
				</Flex>
				{Object.keys(error).length > 0 ? <pre>{JSON.stringify(error, null, 2)}</pre> : null}
			</Flex>
		</>
	)
}

function UserListItem({ user }) {
	const [changeUserStatus] = useChangeUserStatusMutation({
		update: (cache, { data: { changeUserStatus } }) => {
			const existingUsers = cache.readQuery<UsersQuery>({ query: GET_USERS })
			const filteredUsers = existingUsers.users.filter(
				(user) =>
					(isType(user, 'ActiveUser') ||
						isType(user, 'BannedUser') ||
						isType(user, 'DeletedUser')) &&
					(isType(changeUserStatus, 'ActiveUser') ||
						isType(changeUserStatus, 'BannedUser') ||
						isType(changeUserStatus, 'DeletedUser')) &&
					user.id !== changeUserStatus.id
			)

			cache.writeQuery({
				query: GET_USERS,
				data: {
					users: [...filteredUsers, changeUserStatus]
				}
			})
		}
	})

	const icon =
		user.status === 'ACTIVE'
			? { name: CheckIcon, color: 'green.500' }
			: user.status === 'DELETED'
			? { name: CloseIcon, color: 'orange.500' }
			: user.status === 'BANNED'
			? { name: NotAllowedIcon, color: 'red.500' }
			: null

	return (
		<ListItem
			listStyleType='none'
			my={2}
			p={3}
			display='flex'
			alignItems='flex-start'
			justifyContent='flex-start'
			borderRadius='10px'
			bgColor='gray.50'
			_hover={{ bgColor: 'gray.100' }}
			width='100%'
		>
			{icon && <ListIcon as={icon.name} color={icon.color} mt={1} mr={3} />}
			<Box flex='1'>
				<Heading size='md'>{user.name}</Heading>
				{user.email ? <Text size='sm'>{user.email}</Text> : null}
			</Box>
			<Flex>
				{user.status === 'ACTIVE' ? (
					<>
						<IconButton
							aria-label='Delete user'
							icon={<CloseIcon />}
							size='sm'
							colorScheme='orange'
							onClick={() =>
								changeUserStatus({
									variables: { id: user.id, status: 'DELETED' as UserStatus }
								})
							}
						/>
						<IconButton
							aria-label='Ban user'
							icon={<NotAllowedIcon />}
							size='sm'
							ml={1}
							colorScheme='red'
							onClick={() =>
								changeUserStatus({
									variables: { id: user.id, status: 'BANNED' as UserStatus }
								})
							}
						/>
					</>
				) : null}
				{user.status === 'DELETED' ? (
					<>
						<IconButton
							aria-label='UnDelete user'
							icon={<CheckIcon />}
							colorScheme='green'
							size='sm'
							onClick={() =>
								changeUserStatus({
									variables: { id: user.id, status: 'ACTIVE' as UserStatus }
								})
							}
						/>
						<IconButton
							aria-label='Ban user'
							icon={<NotAllowedIcon />}
							size='sm'
							ml={1}
							colorScheme='red'
							onClick={() =>
								changeUserStatus({
									variables: { id: user.id, status: 'BANNED' as UserStatus }
								})
							}
						/>
					</>
				) : null}
				{user.status === 'BANNED' ? (
					<>
						<IconButton
							aria-label='Delete user'
							icon={<CloseIcon />}
							size='sm'
							colorScheme='orange'
							onClick={() =>
								changeUserStatus({
									variables: { id: user.id, status: 'DELETED' as UserStatus }
								})
							}
						/>
						<IconButton
							aria-label='Unban user'
							icon={<CheckIcon />}
							size='sm'
							ml={1}
							colorScheme='green'
							onClick={() =>
								changeUserStatus({
									variables: { id: user.id, status: 'ACTIVE' as UserStatus }
								})
							}
						/>
					</>
				) : null}
			</Flex>
		</ListItem>
	)
}
