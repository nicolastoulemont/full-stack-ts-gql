import gql from 'graphql-tag'

export const CREATE_USER = gql`
	mutation CreateUser($id: String!, $username: String!, $email: String!, $verified: Boolean!) {
		createUser(id: $id, username: $username, email: $email, verified: $verified) {
			id
			username
			email
			verified
		}
	}
`
