import gql from 'graphql-tag'
export const CREATE_USER = gql`
	mutation CreateUser($name: String!, $email: String!) {
		createUser(name: $name, email: $email) {
			... on ActiveUser {
				id
				name
				status
				email
				posts {
					id
					title
				}
			}
			... on UserAuthenticationError {
				code
				message
			}
			... on InvalidArgumentsError {
				code
				message
				invalidArguments {
					key
					message
				}
			}
		}
	}
`
export const CHANGE_USER_STATUS = gql`
	mutation ChangeUserStatus($status: UserStatus!, $id: Int!) {
		changeUserStatus(status: $status, id: $id) {
			... on ActiveUser {
				id
				name
				status
				email
				posts {
					id
					title
				}
			}
			... on DeletedUser {
				id
				name
				status
				deletedAt
			}
			... on BannedUser {
				id
				name
				status
				banReason
			}
			... on UserAuthenticationError {
				code
				message
			}
			... on InvalidArgumentsError {
				code
				message
			}
			... on NotFoundError {
				code
				message
			}
		}
	}
`
