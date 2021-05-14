import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type ActiveUser = User & {
  __typename: 'ActiveUser';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Post>>>;
  status?: Maybe<UserStatus>;
};

export type BannedUser = User & {
  __typename: 'BannedUser';
  banReason?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<UserStatus>;
};


export type DeletedUser = User & {
  __typename: 'DeletedUser';
  deletedAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<UserStatus>;
};

export type Error = {
  code?: Maybe<ErrorCode>;
  message?: Maybe<ErrorMessage>;
};

/** The differents error codes the api will return */
export enum ErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED'
}

/** The differents error message the api will return */
export enum ErrorMessage {
  ResourceNotFound = 'RESOURCE_NOT_FOUND',
  UnableToProcessRequestDueToClientError = 'UNABLE_TO_PROCESS_REQUEST_DUE_TO_CLIENT_ERROR',
  UnauthenticatedPleaseLogin = 'UNAUTHENTICATED_PLEASE_LOGIN'
}

export type InvalidArgument = {
  __typename: 'InvalidArgument';
  key?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type InvalidArgumentsError = Error & {
  __typename: 'InvalidArgumentsError';
  code?: Maybe<ErrorCode>;
  invalidArguments?: Maybe<Array<Maybe<InvalidArgument>>>;
  message?: Maybe<ErrorMessage>;
};

export type Mutation = {
  __typename: 'Mutation';
  changeUserStatus?: Maybe<UserResult>;
  createPost?: Maybe<PostResult>;
  createUser?: Maybe<UserResult>;
};


export type MutationChangeUserStatusArgs = {
  id: Scalars['Int'];
  status: UserStatus;
};


export type MutationCreatePostArgs = {
  authorEmail: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type NotFoundError = Error & {
  __typename: 'NotFoundError';
  code?: Maybe<ErrorCode>;
  message?: Maybe<ErrorMessage>;
};

export type Post = {
  __typename: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Return a post and post related errors */
export type PostResult = InvalidArgumentsError | Post | UserAuthenticationError;

export type Query = {
  __typename: 'Query';
  userById?: Maybe<UserResult>;
  users?: Maybe<Array<Maybe<UserResult>>>;
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};

export type User = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<UserStatus>;
};

export type UserAuthenticationError = Error & {
  __typename: 'UserAuthenticationError';
  code?: Maybe<ErrorCode>;
  message?: Maybe<ErrorMessage>;
};

/** Return a user or user related errors */
export type UserResult = ActiveUser | BannedUser | DeletedUser | InvalidArgumentsError | NotFoundError | UserAuthenticationError;

/** User account status */
export enum UserStatus {
  Active = 'ACTIVE',
  Banned = 'BANNED',
  Deleted = 'DELETED'
}

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  authorEmail: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename: 'Mutation' }
  & { createPost?: Maybe<(
    { __typename: 'InvalidArgumentsError' }
    & Pick<InvalidArgumentsError, 'code' | 'message'>
    & { invalidArguments?: Maybe<Array<Maybe<(
      { __typename: 'InvalidArgument' }
      & Pick<InvalidArgument, 'key' | 'message'>
    )>>> }
  ) | (
    { __typename: 'Post' }
    & Pick<Post, 'id' | 'title'>
  ) | { __typename: 'UserAuthenticationError' }> }
);

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename: 'ActiveUser' }
    & Pick<ActiveUser, 'id' | 'name' | 'status' | 'email'>
    & { posts?: Maybe<Array<Maybe<(
      { __typename: 'Post' }
      & Pick<Post, 'id' | 'title'>
    )>>> }
  ) | { __typename: 'BannedUser' } | { __typename: 'DeletedUser' } | (
    { __typename: 'InvalidArgumentsError' }
    & Pick<InvalidArgumentsError, 'code' | 'message'>
    & { invalidArguments?: Maybe<Array<Maybe<(
      { __typename: 'InvalidArgument' }
      & Pick<InvalidArgument, 'key' | 'message'>
    )>>> }
  ) | { __typename: 'NotFoundError' } | (
    { __typename: 'UserAuthenticationError' }
    & Pick<UserAuthenticationError, 'code' | 'message'>
  )> }
);

export type ChangeUserStatusMutationVariables = Exact<{
  status: UserStatus;
  id: Scalars['Int'];
}>;


export type ChangeUserStatusMutation = (
  { __typename: 'Mutation' }
  & { changeUserStatus?: Maybe<(
    { __typename: 'ActiveUser' }
    & Pick<ActiveUser, 'id' | 'name' | 'status' | 'email'>
    & { posts?: Maybe<Array<Maybe<(
      { __typename: 'Post' }
      & Pick<Post, 'id' | 'title'>
    )>>> }
  ) | (
    { __typename: 'BannedUser' }
    & Pick<BannedUser, 'id' | 'name' | 'status' | 'banReason'>
  ) | (
    { __typename: 'DeletedUser' }
    & Pick<DeletedUser, 'id' | 'name' | 'status' | 'deletedAt'>
  ) | (
    { __typename: 'InvalidArgumentsError' }
    & Pick<InvalidArgumentsError, 'code' | 'message'>
  ) | (
    { __typename: 'NotFoundError' }
    & Pick<NotFoundError, 'code' | 'message'>
  ) | (
    { __typename: 'UserAuthenticationError' }
    & Pick<UserAuthenticationError, 'code' | 'message'>
  )> }
);

export type UserByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserByIdQuery = (
  { __typename: 'Query' }
  & { userById?: Maybe<(
    { __typename: 'ActiveUser' }
    & Pick<ActiveUser, 'id' | 'name' | 'status' | 'email'>
  ) | { __typename: 'BannedUser' } | { __typename: 'DeletedUser' } | { __typename: 'InvalidArgumentsError' } | { __typename: 'NotFoundError' } | { __typename: 'UserAuthenticationError' }> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename: 'Query' }
  & { users?: Maybe<Array<Maybe<(
    { __typename: 'ActiveUser' }
    & Pick<ActiveUser, 'id' | 'name' | 'status' | 'email'>
    & { posts?: Maybe<Array<Maybe<(
      { __typename: 'Post' }
      & Pick<Post, 'id' | 'title'>
    )>>> }
  ) | (
    { __typename: 'BannedUser' }
    & Pick<BannedUser, 'id' | 'name' | 'status' | 'banReason'>
  ) | (
    { __typename: 'DeletedUser' }
    & Pick<DeletedUser, 'id' | 'name' | 'status' | 'deletedAt'>
  ) | { __typename: 'InvalidArgumentsError' } | { __typename: 'NotFoundError' } | { __typename: 'UserAuthenticationError' }>>> }
);


export const CreatePostDocument = gql`
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
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      authorEmail: // value for 'authorEmail'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreateUserDocument = gql`
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
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const ChangeUserStatusDocument = gql`
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
    `;
export type ChangeUserStatusMutationFn = Apollo.MutationFunction<ChangeUserStatusMutation, ChangeUserStatusMutationVariables>;

/**
 * __useChangeUserStatusMutation__
 *
 * To run a mutation, you first call `useChangeUserStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserStatusMutation, { data, loading, error }] = useChangeUserStatusMutation({
 *   variables: {
 *      status: // value for 'status'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChangeUserStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeUserStatusMutation, ChangeUserStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeUserStatusMutation, ChangeUserStatusMutationVariables>(ChangeUserStatusDocument, options);
      }
export type ChangeUserStatusMutationHookResult = ReturnType<typeof useChangeUserStatusMutation>;
export type ChangeUserStatusMutationResult = Apollo.MutationResult<ChangeUserStatusMutation>;
export type ChangeUserStatusMutationOptions = Apollo.BaseMutationOptions<ChangeUserStatusMutation, ChangeUserStatusMutationVariables>;
export const UserByIdDocument = gql`
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
    `;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdQuery(baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
      }
export function useUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<UserByIdQuery, UserByIdQueryVariables>;
export const UsersDocument = gql`
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
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;