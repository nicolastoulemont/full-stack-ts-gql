import gql from 'graphql-tag'

export const GET_USER_BY_ID = gql`
	query UserById($id: ID!) {
		userById(id: $id) {
			id
			username
			email
			verified
		}
	}
`

export const GET_USERS = gql`
	query Users {
		users {
			id
			username
			email
			verified
		}
	}
`
