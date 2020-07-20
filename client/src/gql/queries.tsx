import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AlternativeTitle = {
  readonly __typename?: 'AlternativeTitle';
  readonly id: Scalars['String'];
  readonly title: Scalars['String'];
};

export type AlternativeTitleCreateUpdateInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly episode?: Maybe<EpisodeRelationInput>;
  readonly series?: Maybe<SeriesRelationInput>;
};

export type AlternativeTitleRelationInput = {
  readonly create?: Maybe<ReadonlyArray<Maybe<AlternativeTitleCreateUpdateInput>>>;
  readonly delete?: Maybe<ReadonlyArray<Maybe<AlternativeTitleWhereUniqueInput>>>;
  readonly update?: Maybe<ReadonlyArray<Maybe<AlternativeTitleUpdateWhereUniqueInput>>>;
};

export type AlternativeTitleUpdateWhereUniqueInput = {
  readonly where?: Maybe<AlternativeTitleWhereUniqueInput>;
  readonly data?: Maybe<AlternativeTitleCreateUpdateInput>;
};

export type AlternativeTitleWhereUniqueInput = {
  readonly id: Scalars['String'];
};

export type AuthPayload = {
  readonly __typename?: 'AuthPayload';
  readonly token?: Maybe<Scalars['String']>;
  readonly user?: Maybe<User>;
};


export type Episode = {
  readonly __typename?: 'Episode';
  readonly id?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly alternativeTitles?: Maybe<ReadonlyArray<Maybe<AlternativeTitle>>>;
  readonly series?: Maybe<Series>;
  readonly episodeNumber?: Maybe<Scalars['Int']>;
  readonly files?: Maybe<ReadonlyArray<Maybe<File>>>;
  readonly remarks?: Maybe<Scalars['String']>;
};

export type EpisodeCreateUpdateInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly alternativeTitles?: Maybe<AlternativeTitleRelationInput>;
  readonly series?: Maybe<SeriesRelationInput>;
  readonly episodeNumber?: Maybe<Scalars['Int']>;
  readonly files?: Maybe<FileRelationInput>;
  readonly remarks?: Maybe<Scalars['String']>;
};

export type EpisodeManyRelationInput = {
  readonly create?: Maybe<ReadonlyArray<Maybe<EpisodeCreateUpdateInput>>>;
  readonly delete?: Maybe<ReadonlyArray<Maybe<EpisodeWhereUniqueInput>>>;
};

export type EpisodeRelationInput = {
  readonly create?: Maybe<EpisodeCreateUpdateInput>;
  readonly connect?: Maybe<EpisodeWhereUniqueInput>;
};

export type EpisodeWhereUniqueInput = {
  readonly id: Scalars['String'];
};

export type File = {
  readonly __typename?: 'File';
  readonly id?: Maybe<Scalars['String']>;
  readonly path?: Maybe<Scalars['String']>;
  readonly checksum?: Maybe<Scalars['String']>;
  readonly fileSize?: Maybe<Scalars['Int']>;
  readonly duration?: Maybe<Scalars['String']>;
  readonly resolution?: Maybe<Scalars['String']>;
  readonly source?: Maybe<Source>;
  readonly codec?: Maybe<Scalars['String']>;
  readonly remarks?: Maybe<Scalars['String']>;
  readonly createdAt?: Maybe<Scalars['DateTime']>;
  readonly updatedAt?: Maybe<Scalars['DateTime']>;
  readonly episode?: Maybe<Episode>;
};

export type FileCreateUpdateInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly path?: Maybe<Scalars['String']>;
  readonly checksum?: Maybe<Scalars['String']>;
  readonly fileSize?: Maybe<Scalars['Int']>;
  readonly duration?: Maybe<Scalars['String']>;
  readonly resolution?: Maybe<Scalars['String']>;
  readonly source?: Maybe<Source>;
  readonly codec?: Maybe<Scalars['String']>;
  readonly remarks?: Maybe<Scalars['String']>;
  readonly episode?: Maybe<EpisodeRelationInput>;
};

export type FileRelationInput = {
  readonly create?: Maybe<ReadonlyArray<Maybe<FileCreateUpdateInput>>>;
  readonly delete?: Maybe<ReadonlyArray<Maybe<FileWhereUniqueInput>>>;
};

export type FileWhereUniqueInput = {
  readonly id: Scalars['String'];
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly login: AuthPayload;
  readonly createUser: User;
  readonly updateUser: User;
  readonly adminUpdateUser: User;
  readonly deleteUser: User;
  readonly createSeries: Series;
  readonly updateSeries: Series;
  readonly deleteSeries: Series;
  readonly createEpisode: Episode;
  readonly updateEpisode: Episode;
  readonly deleteEpisode: Episode;
  readonly createFile: File;
  readonly updateFile: File;
  readonly deleteFile: File;
  readonly createUserProgress: UserProgress;
  readonly updateUserProgress: UserProgress;
  readonly deleteUserProgress: UserProgress;
};


export type MutationLoginArgs = {
  data: UserCreateUpdateInput;
};


export type MutationCreateUserArgs = {
  data: UserCreateUpdateInput;
};


export type MutationUpdateUserArgs = {
  data: UserCreateUpdateInput;
};


export type MutationAdminUpdateUserArgs = {
  where: UserWhereUniqueInput;
  data: UserCreateUpdateInput;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationCreateSeriesArgs = {
  data: SeriesCreateUpdateInput;
};


export type MutationUpdateSeriesArgs = {
  where: SeriesWhereUniqueInput;
  data: SeriesCreateUpdateInput;
};


export type MutationDeleteSeriesArgs = {
  where: SeriesWhereUniqueInput;
};


export type MutationCreateEpisodeArgs = {
  data: EpisodeCreateUpdateInput;
};


export type MutationUpdateEpisodeArgs = {
  where: EpisodeWhereUniqueInput;
  data: EpisodeCreateUpdateInput;
};


export type MutationDeleteEpisodeArgs = {
  where: EpisodeWhereUniqueInput;
};


export type MutationCreateFileArgs = {
  data: FileCreateUpdateInput;
};


export type MutationUpdateFileArgs = {
  where: FileWhereUniqueInput;
  data: FileCreateUpdateInput;
};


export type MutationDeleteFileArgs = {
  where: FileWhereUniqueInput;
};


export type MutationCreateUserProgressArgs = {
  data: UserProgressCreateUpdateInput;
};


export type MutationUpdateUserProgressArgs = {
  where: UserProgressWhereUniqueInput;
  data: UserProgressCreateUpdateInput;
};


export type MutationDeleteUserProgressArgs = {
  where: UserProgressWhereUniqueInput;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly loggedIn?: Maybe<User>;
  readonly user?: Maybe<User>;
  readonly users?: Maybe<ReadonlyArray<Maybe<User>>>;
  readonly userCount?: Maybe<Scalars['Int']>;
  readonly series?: Maybe<Series>;
  readonly allSeries?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly episode?: Maybe<Episode>;
  readonly episodes?: Maybe<ReadonlyArray<Maybe<Episode>>>;
  readonly episodesInSeries?: Maybe<ReadonlyArray<Maybe<Episode>>>;
  readonly file?: Maybe<File>;
  readonly files?: Maybe<ReadonlyArray<Maybe<File>>>;
  readonly userProgress?: Maybe<ReadonlyArray<Maybe<UserProgress>>>;
  readonly userProgresses?: Maybe<ReadonlyArray<Maybe<UserProgress>>>;
  readonly allUserProgresses?: Maybe<ReadonlyArray<Maybe<UserProgress>>>;
  readonly reference?: Maybe<Reference>;
  readonly references?: Maybe<ReadonlyArray<Maybe<Reference>>>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QuerySeriesArgs = {
  where: SeriesWhereUniqueInput;
};


export type QueryEpisodeArgs = {
  where: EpisodeWhereUniqueInput;
};


export type QueryEpisodesInSeriesArgs = {
  where: SeriesWhereUniqueInput;
};


export type QueryFileArgs = {
  where?: Maybe<FileWhereUniqueInput>;
};


export type QueryUserProgressArgs = {
  where: UserProgressWhereUniqueInput;
};


export type QueryReferenceArgs = {
  where?: Maybe<ReferenceCreateUpdateInput>;
};

export type Reference = {
  readonly __typename?: 'Reference';
  readonly id?: Maybe<Scalars['String']>;
  readonly link?: Maybe<Scalars['String']>;
  readonly source?: Maybe<Scalars['String']>;
};

export type ReferenceCreateUpdateInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly link?: Maybe<Scalars['String']>;
  readonly source?: Maybe<Scalars['String']>;
  readonly series?: Maybe<SeriesRelationInput>;
};

export type ReferenceRelationInput = {
  readonly create?: Maybe<ReadonlyArray<Maybe<ReferenceCreateUpdateInput>>>;
  readonly update?: Maybe<ReadonlyArray<Maybe<ReferenceUpdateWhereUniqueInput>>>;
  readonly delete?: Maybe<ReadonlyArray<Maybe<ReferenceWhereUniqueInput>>>;
};

export type ReferenceUpdateWhereUniqueInput = {
  readonly where?: Maybe<ReferenceWhereUniqueInput>;
  readonly data?: Maybe<ReferenceCreateUpdateInput>;
};

export type ReferenceWhereUniqueInput = {
  readonly id: Scalars['String'];
};

export enum Role {
  Readonly = 'READONLY',
  Write = 'WRITE',
  Admin = 'ADMIN'
}

export enum Season {
  Winter = 'WINTER',
  Fall = 'FALL',
  Summer = 'SUMMER',
  Spring = 'SPRING'
}

export type Series = {
  readonly __typename?: 'Series';
  readonly id?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly alternativeTitles?: Maybe<ReadonlyArray<Maybe<AlternativeTitle>>>;
  readonly seasonNumber?: Maybe<Scalars['Int']>;
  readonly episodes?: Maybe<ReadonlyArray<Maybe<Episode>>>;
  readonly episodeCount?: Maybe<Scalars['Int']>;
  readonly status?: Maybe<Status>;
  readonly type?: Maybe<Type>;
  readonly releaseSeason?: Maybe<Scalars['String']>;
  readonly releaseYear?: Maybe<Scalars['DateTime']>;
  readonly remarks?: Maybe<Scalars['String']>;
  readonly prequels?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly sequels?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly sideStories?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly mainStories?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly relatedSeries?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly relatedAlternatives?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly references?: Maybe<ReadonlyArray<Maybe<Reference>>>;
  readonly progress?: Maybe<UserProgress>;
  readonly allProgress?: Maybe<ReadonlyArray<Maybe<UserProgress>>>;
};

export type SeriesCreateUpdateInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly alternativeTitles?: Maybe<AlternativeTitleRelationInput>;
  readonly seasonNumber?: Maybe<Scalars['Int']>;
  readonly episodes?: Maybe<EpisodeManyRelationInput>;
  readonly episodeCount?: Maybe<Scalars['Int']>;
  readonly status?: Maybe<Status>;
  readonly type?: Maybe<Type>;
  readonly releaseSeason?: Maybe<Scalars['String']>;
  readonly releaseYear?: Maybe<Scalars['DateTime']>;
  readonly remarks?: Maybe<Scalars['String']>;
  readonly prequels?: Maybe<SeriesManyRelationInput>;
  readonly sequels?: Maybe<SeriesManyRelationInput>;
  readonly sideStories?: Maybe<SeriesManyRelationInput>;
  readonly mainStories?: Maybe<SeriesManyRelationInput>;
  readonly relatedSeries?: Maybe<SeriesManyRelationInput>;
  readonly relatedAlternatives?: Maybe<SeriesManyRelationInput>;
  readonly references?: Maybe<ReferenceRelationInput>;
  readonly progress?: Maybe<UserProgressRelationInput>;
};

export type SeriesManyRelationInput = {
  readonly connect?: Maybe<ReadonlyArray<Maybe<SeriesWhereUniqueInput>>>;
  readonly disconnect?: Maybe<ReadonlyArray<Maybe<SeriesWhereUniqueInput>>>;
};

export type SeriesRelationInput = {
  readonly create?: Maybe<SeriesCreateUpdateInput>;
  readonly connect?: Maybe<SeriesWhereUniqueInput>;
  readonly disconnect?: Maybe<SeriesWhereUniqueInput>;
};

export type SeriesUserCompoundInput = {
  readonly seriesId: Scalars['String'];
  readonly userId: Scalars['String'];
};

export type SeriesWhereUniqueInput = {
  readonly id: Scalars['String'];
};

export enum Source {
  Bluray = 'BLURAY',
  Dvd = 'DVD',
  Cd = 'CD',
  Web = 'WEB',
  Tv = 'TV'
}

export enum Status {
  Downloaded = 'DOWNLOADED',
  Missing = 'MISSING',
  Unreleased = 'UNRELEASED'
}

export enum Type {
  Movie = 'MOVIE',
  Series = 'SERIES',
  Musicvideo = 'MUSICVIDEO',
  Ova = 'OVA',
  Special = 'SPECIAL'
}

export type User = {
  readonly __typename?: 'User';
  readonly id?: Maybe<Scalars['String']>;
  readonly username?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly password?: Maybe<Scalars['String']>;
  readonly passwordAttempts?: Maybe<Scalars['Int']>;
  readonly role?: Maybe<Role>;
  readonly progress?: Maybe<ReadonlyArray<Maybe<UserProgress>>>;
};

export type UserCreateUpdateInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly username?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly password?: Maybe<Scalars['String']>;
  readonly passwordAttempts?: Maybe<Scalars['Int']>;
  readonly role?: Maybe<Role>;
};

export type UserProgress = {
  readonly __typename?: 'UserProgress';
  readonly id?: Maybe<Scalars['String']>;
  readonly series?: Maybe<Series>;
  readonly user?: Maybe<User>;
  readonly status?: Maybe<WatchStatus>;
  readonly completed?: Maybe<Scalars['Int']>;
  readonly overall?: Maybe<Scalars['Int']>;
  readonly execution?: Maybe<Scalars['Int']>;
  readonly story?: Maybe<Scalars['Int']>;
  readonly sound?: Maybe<Scalars['Int']>;
  readonly art?: Maybe<Scalars['Int']>;
  readonly character?: Maybe<Scalars['Int']>;
  readonly appeal?: Maybe<Scalars['Int']>;
  readonly remarks?: Maybe<Scalars['String']>;
  readonly createdAt?: Maybe<Scalars['DateTime']>;
  readonly updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserProgressCreateUpdateInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly series?: Maybe<SeriesRelationInput>;
  readonly user?: Maybe<UserRelationInput>;
  readonly status?: Maybe<WatchStatus>;
  readonly completed?: Maybe<Scalars['Int']>;
  readonly overall?: Maybe<Scalars['Int']>;
  readonly execution?: Maybe<Scalars['Int']>;
  readonly story?: Maybe<Scalars['Int']>;
  readonly sound?: Maybe<Scalars['Int']>;
  readonly art?: Maybe<Scalars['Int']>;
  readonly character?: Maybe<Scalars['Int']>;
  readonly appeal?: Maybe<Scalars['Int']>;
  readonly remarks?: Maybe<Scalars['String']>;
};

export type UserProgressRelationInput = {
  readonly create?: Maybe<ReadonlyArray<Maybe<UserProgressCreateUpdateInput>>>;
  readonly delete?: Maybe<ReadonlyArray<Maybe<UserProgressWhereUniqueInput>>>;
  readonly update?: Maybe<ReadonlyArray<Maybe<UserProgressUpdateWhereUniqueInput>>>;
};

export type UserProgressUpdateWhereUniqueInput = {
  readonly where?: Maybe<UserProgressWhereUniqueInput>;
  readonly data?: Maybe<UserProgressCreateUpdateInput>;
};

export type UserProgressWhereUniqueInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly seriesId_userId?: Maybe<SeriesUserCompoundInput>;
};

export type UserRelationInput = {
  readonly connect?: Maybe<UserWhereUniqueInput>;
  readonly disconnect?: Maybe<UserWhereUniqueInput>;
};

export type UserWhereUniqueInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly username?: Maybe<Scalars['String']>;
};

export enum WatchStatus {
  Completed = 'COMPLETED',
  Watching = 'WATCHING',
  Onhold = 'ONHOLD',
  Pending = 'PENDING',
  Dropped = 'DROPPED'
}

export type LoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInQuery = (
  { readonly __typename?: 'Query' }
  & { readonly loggedIn?: Maybe<(
    { readonly __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'role'>
  )> }
);

export type LoginMutationVariables = Exact<{
  data: UserCreateUpdateInput;
}>;


export type LoginMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly login: (
    { readonly __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { readonly user?: Maybe<(
      { readonly __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  ) }
);

export type UserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type UserQuery = (
  { readonly __typename?: 'Query' }
  & { readonly user?: Maybe<(
    { readonly __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'name'>
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { readonly __typename?: 'Query' }
  & { readonly users?: Maybe<ReadonlyArray<Maybe<(
    { readonly __typename?: 'User' }
    & Pick<User, 'id'>
  )>>> }
);

export type UserCountQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCountQuery = (
  { readonly __typename?: 'Query' }
  & Pick<Query, 'userCount'>
);

export type CreateUserMutationVariables = Exact<{
  data: UserCreateUpdateInput;
}>;


export type CreateUserMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly createUser: (
    { readonly __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);


export const LoggedInDocument = gql`
    query LoggedIn {
  loggedIn {
    id
    username
    role
  }
}
    `;
export type LoggedInComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<LoggedInQuery, LoggedInQueryVariables>, 'query'>;

    export const LoggedInComponent = (props: LoggedInComponentProps) => (
      <ApolloReactComponents.Query<LoggedInQuery, LoggedInQueryVariables> query={LoggedInDocument} {...props} />
    );
    
export type LoggedInProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<LoggedInQuery, LoggedInQueryVariables>
    } & TChildProps;
export function withLoggedIn<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoggedInQuery,
  LoggedInQueryVariables,
  LoggedInProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, LoggedInQuery, LoggedInQueryVariables, LoggedInProps<TChildProps, TDataName>>(LoggedInDocument, {
      alias: 'loggedIn',
      ...operationOptions
    });
};

/**
 * __useLoggedInQuery__
 *
 * To run a query within a React component, call `useLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedInQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LoggedInQuery, LoggedInQueryVariables>) {
        return ApolloReactHooks.useQuery<LoggedInQuery, LoggedInQueryVariables>(LoggedInDocument, baseOptions);
      }
export function useLoggedInLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LoggedInQuery, LoggedInQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LoggedInQuery, LoggedInQueryVariables>(LoggedInDocument, baseOptions);
        }
export type LoggedInQueryHookResult = ReturnType<typeof useLoggedInQuery>;
export type LoggedInLazyQueryHookResult = ReturnType<typeof useLoggedInLazyQuery>;
export type LoggedInQueryResult = ApolloReactCommon.QueryResult<LoggedInQuery, LoggedInQueryVariables>;
export const LoginDocument = gql`
    mutation Login($data: UserCreateUpdateInput!) {
  login(data: $data) {
    token
    user {
      id
      username
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>
    } & TChildProps;
export function withLogin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps, TDataName>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const UserDocument = gql`
    query User($where: UserWhereUniqueInput!) {
  user(where: $where) {
    id
    username
    name
  }
}
    `;
export type UserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<UserQuery, UserQueryVariables>, 'query'> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const UserComponent = (props: UserComponentProps) => (
      <ApolloReactComponents.Query<UserQuery, UserQueryVariables> query={UserDocument} {...props} />
    );
    
export type UserProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<UserQuery, UserQueryVariables>
    } & TChildProps;
export function withUser<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UserQuery,
  UserQueryVariables,
  UserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, UserQuery, UserQueryVariables, UserProps<TChildProps, TDataName>>(UserDocument, {
      alias: 'user',
      ...operationOptions
    });
};

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
  }
}
    `;
export type UsersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<UsersQuery, UsersQueryVariables>, 'query'>;

    export const UsersComponent = (props: UsersComponentProps) => (
      <ApolloReactComponents.Query<UsersQuery, UsersQueryVariables> query={UsersDocument} {...props} />
    );
    
export type UsersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<UsersQuery, UsersQueryVariables>
    } & TChildProps;
export function withUsers<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UsersQuery,
  UsersQueryVariables,
  UsersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, UsersQuery, UsersQueryVariables, UsersProps<TChildProps, TDataName>>(UsersDocument, {
      alias: 'users',
      ...operationOptions
    });
};

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
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserCountDocument = gql`
    query UserCount {
  userCount
}
    `;
export type UserCountComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<UserCountQuery, UserCountQueryVariables>, 'query'>;

    export const UserCountComponent = (props: UserCountComponentProps) => (
      <ApolloReactComponents.Query<UserCountQuery, UserCountQueryVariables> query={UserCountDocument} {...props} />
    );
    
export type UserCountProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<UserCountQuery, UserCountQueryVariables>
    } & TChildProps;
export function withUserCount<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UserCountQuery,
  UserCountQueryVariables,
  UserCountProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, UserCountQuery, UserCountQueryVariables, UserCountProps<TChildProps, TDataName>>(UserCountDocument, {
      alias: 'userCount',
      ...operationOptions
    });
};

/**
 * __useUserCountQuery__
 *
 * To run a query within a React component, call `useUserCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserCountQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserCountQuery, UserCountQueryVariables>) {
        return ApolloReactHooks.useQuery<UserCountQuery, UserCountQueryVariables>(UserCountDocument, baseOptions);
      }
export function useUserCountLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserCountQuery, UserCountQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserCountQuery, UserCountQueryVariables>(UserCountDocument, baseOptions);
        }
export type UserCountQueryHookResult = ReturnType<typeof useUserCountQuery>;
export type UserCountLazyQueryHookResult = ReturnType<typeof useUserCountLazyQuery>;
export type UserCountQueryResult = ApolloReactCommon.QueryResult<UserCountQuery, UserCountQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: UserCreateUpdateInput!) {
  createUser(data: $data) {
    id
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export type CreateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateUserMutation, CreateUserMutationVariables>, 'mutation'>;

    export const CreateUserComponent = (props: CreateUserComponentProps) => (
      <ApolloReactComponents.Mutation<CreateUserMutation, CreateUserMutationVariables> mutation={CreateUserDocument} {...props} />
    );
    
export type CreateUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>
    } & TChildProps;
export function withCreateUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateUserMutation,
  CreateUserMutationVariables,
  CreateUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateUserMutation, CreateUserMutationVariables, CreateUserProps<TChildProps, TDataName>>(CreateUserDocument, {
      alias: 'createUser',
      ...operationOptions
    });
};

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
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;