import gql from 'graphql-tag'

export const GET_USER_BY_ID = gql`
	query UserById($id: ID!) {
		userById(id: $id) {
			... on ActiveUser {
				id
				name
				status
				email
			}
		}
	}
`

export const GET_USERS = gql`
	query Users {
		users {
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
		}
	}
`
