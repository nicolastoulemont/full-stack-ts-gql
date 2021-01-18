import gql from 'graphql-tag'

export const GET_USER_BY_ID = gql`
	query UserById($id: ID!) {
		userById(id: $id) {
			errors {
				key
				message
			}
			user {
				id
				username
				email
			}
		}
	}
`

export const GET_USERS = gql`
	query Users {
		users {
			errors {
				key
				message
			}
			users {
				id
				username
				email
			}
		}
	}
`
