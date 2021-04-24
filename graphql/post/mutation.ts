import gql from 'graphql-tag'

export const CREATE_POST = gql`
	mutation CreatePost($title: String!, $content: String, $authorEmail: String!) {
		createPost(title: $title, content: $content, authorEmail: $authorEmail) {
			... on Post {
				id
				title
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
