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
  readonly createdAt?: Maybe<Scalars['DateTime']>;
  readonly updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EpisodeCreateUpdateInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly alternativeTitles?: Maybe<AlternativeTitleRelationInput>;
  readonly series?: Maybe<SeriesRelationInput>;
  readonly episodeNumber?: Maybe<Scalars['Int']>;
  readonly files?: Maybe<FileRelationInput>;
  readonly remarks?: Maybe<Scalars['String']>;
  readonly createdAt?: Maybe<Scalars['DateTime']>;
  readonly updatedAt?: Maybe<Scalars['DateTime']>;
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
  readonly createdAt?: Maybe<Scalars['DateTime']>;
  readonly updatedAt?: Maybe<Scalars['DateTime']>;
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
  readonly updateMe: User;
  readonly createInitialUser: User;
  readonly createUser: User;
  readonly updateUser: User;
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


export type MutationUpdateMeArgs = {
  data: UserCreateUpdateInput;
};


export type MutationCreateInitialUserArgs = {
  data: UserCreateUpdateInput;
};


export type MutationCreateUserArgs = {
  data: UserCreateUpdateInput;
};


export type MutationUpdateUserArgs = {
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
  readonly releaseSeason?: Maybe<Season>;
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
  readonly createdAt?: Maybe<Scalars['DateTime']>;
  readonly updatedAt?: Maybe<Scalars['DateTime']>;
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
  readonly releaseSeason?: Maybe<Season>;
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
  readonly createdAt?: Maybe<Scalars['DateTime']>;
  readonly updatedAt?: Maybe<Scalars['DateTime']>;
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
  readonly createdAt?: Maybe<Scalars['DateTime']>;
  readonly updatedAt?: Maybe<Scalars['DateTime']>;
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

export type SeriesQueryVariables = Exact<{
  where: SeriesWhereUniqueInput;
}>;


export type SeriesQuery = (
  { readonly __typename?: 'Query' }
  & { readonly series?: Maybe<(
    { readonly __typename?: 'Series' }
    & Pick<Series, 'id' | 'title' | 'status' | 'type' | 'episodeCount' | 'seasonNumber' | 'releaseSeason' | 'releaseYear' | 'remarks' | 'createdAt' | 'updatedAt'>
    & { readonly alternativeTitles?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'AlternativeTitle' }
      & Pick<AlternativeTitle, 'id' | 'title'>
    )>>>, readonly references?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Reference' }
      & Pick<Reference, 'id' | 'link' | 'source'>
    )>>>, readonly episodes?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Episode' }
      & Pick<Episode, 'id' | 'title' | 'episodeNumber'>
    )>>>, readonly prequels?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'id' | 'title'>
    )>>>, readonly sequels?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'id' | 'title'>
    )>>>, readonly mainStories?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'id' | 'title'>
    )>>>, readonly sideStories?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'id' | 'title'>
    )>>>, readonly relatedSeries?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'id' | 'title'>
    )>>>, readonly relatedAlternatives?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'id' | 'title'>
    )>>> }
  )> }
);

export type AllSeriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSeriesQuery = (
  { readonly __typename?: 'Query' }
  & { readonly allSeries?: Maybe<ReadonlyArray<Maybe<(
    { readonly __typename?: 'Series' }
    & Pick<Series, 'id' | 'title' | 'seasonNumber' | 'episodeCount' | 'type' | 'status' | 'releaseSeason' | 'releaseYear'>
  )>>> }
);

export type CreateSeriesMutationVariables = Exact<{
  data: SeriesCreateUpdateInput;
}>;


export type CreateSeriesMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly createSeries: (
    { readonly __typename?: 'Series' }
    & Pick<Series, 'id'>
  ) }
);

export type UpdateSeriesMutationVariables = Exact<{
  where: SeriesWhereUniqueInput;
  data: SeriesCreateUpdateInput;
}>;


export type UpdateSeriesMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly updateSeries: (
    { readonly __typename?: 'Series' }
    & Pick<Series, 'id'>
  ) }
);

export type DeleteSeriesMutationVariables = Exact<{
  where: SeriesWhereUniqueInput;
}>;


export type DeleteSeriesMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly deleteSeries: (
    { readonly __typename?: 'Series' }
    & Pick<Series, 'id'>
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

export type CreateInitialUserMutationVariables = Exact<{
  data: UserCreateUpdateInput;
}>;


export type CreateInitialUserMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly createInitialUser: (
    { readonly __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type UpdateMeMutationVariables = Exact<{
  data: UserCreateUpdateInput;
}>;


export type UpdateMeMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly updateMe: (
    { readonly __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
  data: UserCreateUpdateInput;
}>;


export type UpdateUserMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly updateUser: (
    { readonly __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type DeleteUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type DeleteUserMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly deleteUser: (
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
export const SeriesDocument = gql`
    query Series($where: SeriesWhereUniqueInput!) {
  series(where: $where) {
    id
    title
    alternativeTitles {
      id
      title
    }
    references {
      id
      link
      source
    }
    status
    type
    episodes {
      id
      title
      episodeNumber
    }
    episodeCount
    seasonNumber
    releaseSeason
    releaseYear
    remarks
    prequels {
      id
      title
    }
    sequels {
      id
      title
    }
    mainStories {
      id
      title
    }
    sideStories {
      id
      title
    }
    relatedSeries {
      id
      title
    }
    relatedAlternatives {
      id
      title
    }
    createdAt
    updatedAt
  }
}
    `;
export type SeriesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SeriesQuery, SeriesQueryVariables>, 'query'> & ({ variables: SeriesQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const SeriesComponent = (props: SeriesComponentProps) => (
      <ApolloReactComponents.Query<SeriesQuery, SeriesQueryVariables> query={SeriesDocument} {...props} />
    );
    
export type SeriesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<SeriesQuery, SeriesQueryVariables>
    } & TChildProps;
export function withSeries<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SeriesQuery,
  SeriesQueryVariables,
  SeriesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, SeriesQuery, SeriesQueryVariables, SeriesProps<TChildProps, TDataName>>(SeriesDocument, {
      alias: 'series',
      ...operationOptions
    });
};

/**
 * __useSeriesQuery__
 *
 * To run a query within a React component, call `useSeriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeriesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSeriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SeriesQuery, SeriesQueryVariables>) {
        return ApolloReactHooks.useQuery<SeriesQuery, SeriesQueryVariables>(SeriesDocument, baseOptions);
      }
export function useSeriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SeriesQuery, SeriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SeriesQuery, SeriesQueryVariables>(SeriesDocument, baseOptions);
        }
export type SeriesQueryHookResult = ReturnType<typeof useSeriesQuery>;
export type SeriesLazyQueryHookResult = ReturnType<typeof useSeriesLazyQuery>;
export type SeriesQueryResult = ApolloReactCommon.QueryResult<SeriesQuery, SeriesQueryVariables>;
export const AllSeriesDocument = gql`
    query AllSeries {
  allSeries {
    id
    title
    seasonNumber
    episodeCount
    type
    status
    releaseSeason
    releaseYear
  }
}
    `;
export type AllSeriesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AllSeriesQuery, AllSeriesQueryVariables>, 'query'>;

    export const AllSeriesComponent = (props: AllSeriesComponentProps) => (
      <ApolloReactComponents.Query<AllSeriesQuery, AllSeriesQueryVariables> query={AllSeriesDocument} {...props} />
    );
    
export type AllSeriesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<AllSeriesQuery, AllSeriesQueryVariables>
    } & TChildProps;
export function withAllSeries<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AllSeriesQuery,
  AllSeriesQueryVariables,
  AllSeriesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, AllSeriesQuery, AllSeriesQueryVariables, AllSeriesProps<TChildProps, TDataName>>(AllSeriesDocument, {
      alias: 'allSeries',
      ...operationOptions
    });
};

/**
 * __useAllSeriesQuery__
 *
 * To run a query within a React component, call `useAllSeriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSeriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSeriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSeriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllSeriesQuery, AllSeriesQueryVariables>) {
        return ApolloReactHooks.useQuery<AllSeriesQuery, AllSeriesQueryVariables>(AllSeriesDocument, baseOptions);
      }
export function useAllSeriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllSeriesQuery, AllSeriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllSeriesQuery, AllSeriesQueryVariables>(AllSeriesDocument, baseOptions);
        }
export type AllSeriesQueryHookResult = ReturnType<typeof useAllSeriesQuery>;
export type AllSeriesLazyQueryHookResult = ReturnType<typeof useAllSeriesLazyQuery>;
export type AllSeriesQueryResult = ApolloReactCommon.QueryResult<AllSeriesQuery, AllSeriesQueryVariables>;
export const CreateSeriesDocument = gql`
    mutation CreateSeries($data: SeriesCreateUpdateInput!) {
  createSeries(data: $data) {
    id
  }
}
    `;
export type CreateSeriesMutationFn = ApolloReactCommon.MutationFunction<CreateSeriesMutation, CreateSeriesMutationVariables>;
export type CreateSeriesComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateSeriesMutation, CreateSeriesMutationVariables>, 'mutation'>;

    export const CreateSeriesComponent = (props: CreateSeriesComponentProps) => (
      <ApolloReactComponents.Mutation<CreateSeriesMutation, CreateSeriesMutationVariables> mutation={CreateSeriesDocument} {...props} />
    );
    
export type CreateSeriesProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateSeriesMutation, CreateSeriesMutationVariables>
    } & TChildProps;
export function withCreateSeries<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateSeriesMutation,
  CreateSeriesMutationVariables,
  CreateSeriesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateSeriesMutation, CreateSeriesMutationVariables, CreateSeriesProps<TChildProps, TDataName>>(CreateSeriesDocument, {
      alias: 'createSeries',
      ...operationOptions
    });
};

/**
 * __useCreateSeriesMutation__
 *
 * To run a mutation, you first call `useCreateSeriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSeriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSeriesMutation, { data, loading, error }] = useCreateSeriesMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSeriesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSeriesMutation, CreateSeriesMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateSeriesMutation, CreateSeriesMutationVariables>(CreateSeriesDocument, baseOptions);
      }
export type CreateSeriesMutationHookResult = ReturnType<typeof useCreateSeriesMutation>;
export type CreateSeriesMutationResult = ApolloReactCommon.MutationResult<CreateSeriesMutation>;
export type CreateSeriesMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSeriesMutation, CreateSeriesMutationVariables>;
export const UpdateSeriesDocument = gql`
    mutation UpdateSeries($where: SeriesWhereUniqueInput!, $data: SeriesCreateUpdateInput!) {
  updateSeries(where: $where, data: $data) {
    id
  }
}
    `;
export type UpdateSeriesMutationFn = ApolloReactCommon.MutationFunction<UpdateSeriesMutation, UpdateSeriesMutationVariables>;
export type UpdateSeriesComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateSeriesMutation, UpdateSeriesMutationVariables>, 'mutation'>;

    export const UpdateSeriesComponent = (props: UpdateSeriesComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateSeriesMutation, UpdateSeriesMutationVariables> mutation={UpdateSeriesDocument} {...props} />
    );
    
export type UpdateSeriesProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateSeriesMutation, UpdateSeriesMutationVariables>
    } & TChildProps;
export function withUpdateSeries<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateSeriesMutation,
  UpdateSeriesMutationVariables,
  UpdateSeriesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateSeriesMutation, UpdateSeriesMutationVariables, UpdateSeriesProps<TChildProps, TDataName>>(UpdateSeriesDocument, {
      alias: 'updateSeries',
      ...operationOptions
    });
};

/**
 * __useUpdateSeriesMutation__
 *
 * To run a mutation, you first call `useUpdateSeriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSeriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSeriesMutation, { data, loading, error }] = useUpdateSeriesMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSeriesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSeriesMutation, UpdateSeriesMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateSeriesMutation, UpdateSeriesMutationVariables>(UpdateSeriesDocument, baseOptions);
      }
export type UpdateSeriesMutationHookResult = ReturnType<typeof useUpdateSeriesMutation>;
export type UpdateSeriesMutationResult = ApolloReactCommon.MutationResult<UpdateSeriesMutation>;
export type UpdateSeriesMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateSeriesMutation, UpdateSeriesMutationVariables>;
export const DeleteSeriesDocument = gql`
    mutation DeleteSeries($where: SeriesWhereUniqueInput!) {
  deleteSeries(where: $where) {
    id
  }
}
    `;
export type DeleteSeriesMutationFn = ApolloReactCommon.MutationFunction<DeleteSeriesMutation, DeleteSeriesMutationVariables>;
export type DeleteSeriesComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteSeriesMutation, DeleteSeriesMutationVariables>, 'mutation'>;

    export const DeleteSeriesComponent = (props: DeleteSeriesComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteSeriesMutation, DeleteSeriesMutationVariables> mutation={DeleteSeriesDocument} {...props} />
    );
    
export type DeleteSeriesProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteSeriesMutation, DeleteSeriesMutationVariables>
    } & TChildProps;
export function withDeleteSeries<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteSeriesMutation,
  DeleteSeriesMutationVariables,
  DeleteSeriesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteSeriesMutation, DeleteSeriesMutationVariables, DeleteSeriesProps<TChildProps, TDataName>>(DeleteSeriesDocument, {
      alias: 'deleteSeries',
      ...operationOptions
    });
};

/**
 * __useDeleteSeriesMutation__
 *
 * To run a mutation, you first call `useDeleteSeriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSeriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSeriesMutation, { data, loading, error }] = useDeleteSeriesMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteSeriesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteSeriesMutation, DeleteSeriesMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteSeriesMutation, DeleteSeriesMutationVariables>(DeleteSeriesDocument, baseOptions);
      }
export type DeleteSeriesMutationHookResult = ReturnType<typeof useDeleteSeriesMutation>;
export type DeleteSeriesMutationResult = ApolloReactCommon.MutationResult<DeleteSeriesMutation>;
export type DeleteSeriesMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteSeriesMutation, DeleteSeriesMutationVariables>;
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
export const CreateInitialUserDocument = gql`
    mutation CreateInitialUser($data: UserCreateUpdateInput!) {
  createInitialUser(data: $data) {
    id
  }
}
    `;
export type CreateInitialUserMutationFn = ApolloReactCommon.MutationFunction<CreateInitialUserMutation, CreateInitialUserMutationVariables>;
export type CreateInitialUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateInitialUserMutation, CreateInitialUserMutationVariables>, 'mutation'>;

    export const CreateInitialUserComponent = (props: CreateInitialUserComponentProps) => (
      <ApolloReactComponents.Mutation<CreateInitialUserMutation, CreateInitialUserMutationVariables> mutation={CreateInitialUserDocument} {...props} />
    );
    
export type CreateInitialUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateInitialUserMutation, CreateInitialUserMutationVariables>
    } & TChildProps;
export function withCreateInitialUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateInitialUserMutation,
  CreateInitialUserMutationVariables,
  CreateInitialUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateInitialUserMutation, CreateInitialUserMutationVariables, CreateInitialUserProps<TChildProps, TDataName>>(CreateInitialUserDocument, {
      alias: 'createInitialUser',
      ...operationOptions
    });
};

/**
 * __useCreateInitialUserMutation__
 *
 * To run a mutation, you first call `useCreateInitialUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInitialUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInitialUserMutation, { data, loading, error }] = useCreateInitialUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateInitialUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateInitialUserMutation, CreateInitialUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateInitialUserMutation, CreateInitialUserMutationVariables>(CreateInitialUserDocument, baseOptions);
      }
export type CreateInitialUserMutationHookResult = ReturnType<typeof useCreateInitialUserMutation>;
export type CreateInitialUserMutationResult = ApolloReactCommon.MutationResult<CreateInitialUserMutation>;
export type CreateInitialUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateInitialUserMutation, CreateInitialUserMutationVariables>;
export const UpdateMeDocument = gql`
    mutation UpdateMe($data: UserCreateUpdateInput!) {
  updateMe(data: $data) {
    id
  }
}
    `;
export type UpdateMeMutationFn = ApolloReactCommon.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;
export type UpdateMeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateMeMutation, UpdateMeMutationVariables>, 'mutation'>;

    export const UpdateMeComponent = (props: UpdateMeComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateMeMutation, UpdateMeMutationVariables> mutation={UpdateMeDocument} {...props} />
    );
    
export type UpdateMeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>
    } & TChildProps;
export function withUpdateMe<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateMeMutation,
  UpdateMeMutationVariables,
  UpdateMeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateMeMutation, UpdateMeMutationVariables, UpdateMeProps<TChildProps, TDataName>>(UpdateMeDocument, {
      alias: 'updateMe',
      ...operationOptions
    });
};

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, baseOptions);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = ApolloReactCommon.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserCreateUpdateInput!) {
  updateUser(where: $where, data: $data) {
    id
  }
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;
export type UpdateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUserMutation, UpdateUserMutationVariables>, 'mutation'>;

    export const UpdateUserComponent = (props: UpdateUserComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUserMutation, UpdateUserMutationVariables> mutation={UpdateUserDocument} {...props} />
    );
    
export type UpdateUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>
    } & TChildProps;
export function withUpdateUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UpdateUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateUserMutation, UpdateUserMutationVariables, UpdateUserProps<TChildProps, TDataName>>(UpdateUserDocument, {
      alias: 'updateUser',
      ...operationOptions
    });
};

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($where: UserWhereUniqueInput!) {
  deleteUser(where: $where) {
    id
  }
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;
export type DeleteUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteUserMutation, DeleteUserMutationVariables>, 'mutation'>;

    export const DeleteUserComponent = (props: DeleteUserComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteUserMutation, DeleteUserMutationVariables> mutation={DeleteUserDocument} {...props} />
    );
    
export type DeleteUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>
    } & TChildProps;
export function withDeleteUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  DeleteUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteUserMutation, DeleteUserMutationVariables, DeleteUserProps<TChildProps, TDataName>>(DeleteUserDocument, {
      alias: 'deleteUser',
      ...operationOptions
    });
};

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;