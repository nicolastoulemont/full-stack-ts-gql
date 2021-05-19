import { UpdateResolver } from '@urql/exchange-graphcache'
import { GET_USERS } from 'graphql/user/queries'
import { isEither, isType } from 'gql-typeguards'
import {
	UsersQuery,
	ActiveUser,
	ChangeUserStatusMutation,
	ChangeUserStatusMutationVariables,
	CreateUserMutation,
	CreateUserMutationVariables,
	CreatePostMutation,
	CreatePostMutationVariables,
	DeletedUser,
	BannedUser
} from 'gql-gen'

export const changeUserStatus: UpdateResolver<
	ChangeUserStatusMutation,
	ChangeUserStatusMutationVariables
> = (result, args, cache, info) => {
	cache.updateQuery<UsersQuery>({ query: GET_USERS }, (data) => {
		const filteredUsers = data.users.filter(
			(user) =>
				isEither(user, ['ActiveUser', 'BannedUser', 'DeletedUser']) &&
				isEither(result.changeUserStatus, ['ActiveUser', 'BannedUser', 'DeletedUser']) &&
				user.id !== result.changeUserStatus.id
		)
		return { ...data, users: [...filteredUsers, result.changeUserStatus] }
	})
}

export const createUser: UpdateResolver<CreateUserMutation, CreateUserMutationVariables> = (
	result,
	args,
	cache,
	info
) => {
	cache.updateQuery<UsersQuery>({ query: GET_USERS }, (data) => {
		if (isType(result.createUser, 'ActiveUser')) {
			return { ...data, users: [...data.users, result.createUser] }
		} else {
			return data
		}
	})
}

export const createPost: UpdateResolver<CreatePostMutation, CreatePostMutationVariables> = (
	result,
	args,
	cache,
	info
) => {
	cache.updateQuery<UsersQuery>({ query: GET_USERS }, (data) => {
		if (isType(result.createPost, 'Post')) {
			const updatedUsers = data.users.map((user) => {
				// Post author
				if (isType(user, 'ActiveUser') && user.email === args.authorEmail) {
					return { ...user, posts: [user.posts, result.createPost] }
				} else {
					return user
				}
			}) as Array<ActiveUser | DeletedUser | BannedUser>

			return { ...data, users: [...updatedUsers] }
		} else {
			return data
		}
	})
}
