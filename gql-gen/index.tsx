import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export type ActiveUser = Node & User & {
  __typename: 'ActiveUser';
  email?: Maybe<Scalars['String']>;
  /** GUID for a resource */
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Post>>>;
  status?: Maybe<UserStatus>;
};

export type BannedUser = Node & User & {
  __typename: 'BannedUser';
  banReason?: Maybe<Scalars['String']>;
  /** GUID for a resource */
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<UserStatus>;
};


export type DeletedUser = Node & User & {
  __typename: 'DeletedUser';
  deletedAt?: Maybe<Scalars['DateTime']>;
  /** GUID for a resource */
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

export type Node = {
  /** GUID for a resource */
  id?: Maybe<Scalars['Int']>;
};

export type NotFoundError = Error & {
  __typename: 'NotFoundError';
  code?: Maybe<ErrorCode>;
  message?: Maybe<ErrorMessage>;
};

export type Post = Node & {
  __typename: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** GUID for a resource */
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

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
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

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
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

export function useChangeUserStatusMutation() {
  return Urql.useMutation<ChangeUserStatusMutation, ChangeUserStatusMutationVariables>(ChangeUserStatusDocument);
};
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

export function useUserByIdQuery(options: Omit<Urql.UseQueryArgs<UserByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserByIdQuery>({ query: UserByIdDocument, ...options });
};
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

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};