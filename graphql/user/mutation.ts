import gql from 'graphql-tag'

export const CREATE_USER = gql`
	mutation CreateUser($id: String!, $username: String!, $email: String!, $verified: Boolean!) {
		createUser(id: $id, username: $username, email: $email, verified: $verified) {
			... on User {
				id
				username
				email
				verified
			}
			... on Error {
				code
				key
				message
			}
		}
	}
`
