import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Error = {
  __typename?: 'Error';
  key?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  errors?: Maybe<Array<Maybe<Error>>>;
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  users?: Maybe<Array<Maybe<User>>>;
  errors?: Maybe<Array<Maybe<Error>>>;
};

export type Query = {
  __typename?: 'Query';
  userById?: Maybe<UserResponse>;
  users?: Maybe<UsersResponse>;
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};

export type UserByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { userById?: Maybe<(
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'key' | 'message'>
    )>>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )> }
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<(
    { __typename?: 'UsersResponse' }
    & { errors?: Maybe<Array<Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'key' | 'message'>
    )>>>, users?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )>>> }
  )> }
);


export const UserByIdDocument = gql`
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
        return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, baseOptions);
      }
export function useUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, baseOptions);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<UserByIdQuery, UserByIdQueryVariables>;
export const UsersDocument = gql`
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
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;