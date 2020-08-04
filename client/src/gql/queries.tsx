import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
import * as ApolloReactHoc from '@apollo/client/react/hoc';
import * as ApolloReactHooks from '@apollo/client';
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
  /** DateTime custom scalar type */
  DateTime: string;
  /** Long (64-bit) custom scalar type */
  Long: number;
};



export enum Status {
  Downloaded = 'DOWNLOADED',
  Missing = 'MISSING',
  Unreleased = 'UNRELEASED'
}

export enum WatchStatus {
  Completed = 'COMPLETED',
  Watching = 'WATCHING',
  Onhold = 'ONHOLD',
  Pending = 'PENDING',
  Dropped = 'DROPPED'
}

export enum Season {
  Winter = 'WINTER',
  Fall = 'FALL',
  Summer = 'SUMMER',
  Spring = 'SPRING'
}

export enum Source {
  Bluray = 'BLURAY',
  Dvd = 'DVD',
  Cd = 'CD',
  Web = 'WEB',
  Tv = 'TV'
}

export enum Type {
  Movie = 'MOVIE',
  Series = 'SERIES',
  Musicvideo = 'MUSICVIDEO',
  Ova = 'OVA',
  Special = 'SPECIAL'
}

export enum Role {
  Readonly = 'READONLY',
  Write = 'WRITE',
  Admin = 'ADMIN'
}

export type UserWhereUniqueInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly username?: Maybe<Scalars['String']>;
};

export type UserCreateUpdateInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly username?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly password?: Maybe<Scalars['String']>;
  readonly passwordAttempts?: Maybe<Scalars['Int']>;
  readonly role?: Maybe<Role>;
};

export type UserRelationInput = {
  readonly connect?: Maybe<UserWhereUniqueInput>;
  readonly disconnect?: Maybe<UserWhereUniqueInput>;
};

export type EpisodeWhereUniqueInput = {
  readonly id: Scalars['String'];
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

export type SeriesWhereUniqueInput = {
  readonly id: Scalars['String'];
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

export type AlternativeTitleWhereUniqueInput = {
  readonly id: Scalars['String'];
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

export type FileWhereUniqueInput = {
  readonly id: Scalars['String'];
};

export type FileCreateUpdateInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly path?: Maybe<Scalars['String']>;
  readonly checksum?: Maybe<Scalars['String']>;
  readonly fileSize?: Maybe<Scalars['Long']>;
  readonly duration?: Maybe<Scalars['Int']>;
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

export type UserProgressWhereUniqueInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly seriesId_userId?: Maybe<SeriesUserCompoundInput>;
};

export type SeriesUserCompoundInput = {
  readonly seriesId: Scalars['String'];
  readonly userId: Scalars['String'];
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

export type ReferenceWhereUniqueInput = {
  readonly id: Scalars['String'];
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

export type Query = {
  readonly __typename?: 'Query';
  readonly loggedIn?: Maybe<User>;
  readonly user?: Maybe<User>;
  readonly users?: Maybe<ReadonlyArray<Maybe<User>>>;
  readonly isInitialized?: Maybe<Scalars['Boolean']>;
  readonly series?: Maybe<Series>;
  readonly allSeries?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly totalSeriesCount?: Maybe<Scalars['Int']>;
  readonly episode?: Maybe<Episode>;
  readonly episodes?: Maybe<ReadonlyArray<Maybe<Episode>>>;
  readonly episodesInSeries?: Maybe<ReadonlyArray<Maybe<Episode>>>;
  readonly file?: Maybe<File>;
  readonly filesForEpisode?: Maybe<ReadonlyArray<Maybe<File>>>;
  readonly files?: Maybe<ReadonlyArray<Maybe<File>>>;
  readonly myProgress?: Maybe<ReadonlyArray<Maybe<UserProgress>>>;
  readonly mySeriesProgress?: Maybe<UserProgress>;
  readonly userProgress?: Maybe<ReadonlyArray<Maybe<UserProgress>>>;
  readonly allUserProgress?: Maybe<ReadonlyArray<Maybe<UserProgress>>>;
  readonly reference?: Maybe<Reference>;
  readonly references?: Maybe<ReadonlyArray<Maybe<Reference>>>;
  readonly quickSearch?: Maybe<SearchPayload>;
  readonly myTopTenSeries?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly myCurrentlyWatching?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly suggestedCodecs?: Maybe<ReadonlyArray<Maybe<Codec>>>;
  readonly suggestedSources?: Maybe<ReadonlyArray<Maybe<ReferenceSource>>>;
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


export type QueryFilesForEpisodeArgs = {
  where: EpisodeWhereUniqueInput;
};


export type QueryMySeriesProgressArgs = {
  where: SeriesWhereUniqueInput;
};


export type QueryUserProgressArgs = {
  where: UserProgressWhereUniqueInput;
};


export type QueryReferenceArgs = {
  where?: Maybe<ReferenceCreateUpdateInput>;
};


export type QueryQuickSearchArgs = {
  where: Scalars['String'];
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
  readonly batchCreateEpisode: ReadonlyArray<Maybe<Episode>>;
  readonly updateEpisode: Episode;
  readonly deleteEpisode: Episode;
  readonly createFile: File;
  readonly updateFile: File;
  readonly deleteFile: File;
  readonly createUserProgress: UserProgress;
  readonly updateUserProgress: UserProgress;
  readonly updateMyProgress: UserProgress;
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


export type MutationBatchCreateEpisodeArgs = {
  data: ReadonlyArray<EpisodeCreateUpdateInput>;
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


export type MutationUpdateMyProgressArgs = {
  where: SeriesWhereUniqueInput;
  data: UserProgressCreateUpdateInput;
};


export type MutationDeleteUserProgressArgs = {
  where: UserProgressWhereUniqueInput;
};

export type AuthPayload = {
  readonly __typename?: 'AuthPayload';
  readonly token?: Maybe<Scalars['String']>;
  readonly user?: Maybe<User>;
};

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
  readonly currentStatus?: Maybe<WatchStatus>;
  readonly allProgress?: Maybe<ReadonlyArray<Maybe<UserProgress>>>;
  readonly createdAt?: Maybe<Scalars['DateTime']>;
  readonly updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AlternativeTitle = {
  readonly __typename?: 'AlternativeTitle';
  readonly id: Scalars['String'];
  readonly title: Scalars['String'];
};

export type File = {
  readonly __typename?: 'File';
  readonly id?: Maybe<Scalars['String']>;
  readonly path?: Maybe<Scalars['String']>;
  readonly checksum?: Maybe<Scalars['String']>;
  readonly fileSize?: Maybe<Scalars['Long']>;
  readonly duration?: Maybe<Scalars['Int']>;
  readonly resolution?: Maybe<Scalars['String']>;
  readonly source?: Maybe<Source>;
  readonly codec?: Maybe<Scalars['String']>;
  readonly remarks?: Maybe<Scalars['String']>;
  readonly createdAt?: Maybe<Scalars['DateTime']>;
  readonly updatedAt?: Maybe<Scalars['DateTime']>;
  readonly episode?: Maybe<Episode>;
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

export type Reference = {
  readonly __typename?: 'Reference';
  readonly id?: Maybe<Scalars['String']>;
  readonly link?: Maybe<Scalars['String']>;
  readonly source?: Maybe<Scalars['String']>;
};

export type SearchPayload = {
  readonly __typename?: 'SearchPayload';
  readonly series: ReadonlyArray<Maybe<Series>>;
  readonly episodes: ReadonlyArray<Maybe<Episode>>;
};

export type Codec = {
  readonly __typename?: 'Codec';
  readonly codec?: Maybe<Scalars['String']>;
};

export type ReferenceSource = {
  readonly __typename?: 'ReferenceSource';
  readonly source?: Maybe<Scalars['String']>;
};

export type LoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInQuery = (
  { readonly __typename?: 'Query' }
  & { readonly loggedIn?: Maybe<(
    { readonly __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'name' | 'role'>
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

export type MyTopTenSeriesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTopTenSeriesQuery = (
  { readonly __typename?: 'Query' }
  & { readonly myTopTenSeries?: Maybe<ReadonlyArray<Maybe<(
    { readonly __typename?: 'Series' }
    & Pick<Series, 'id' | 'title'>
    & { readonly progress?: Maybe<(
      { readonly __typename?: 'UserProgress' }
      & Pick<UserProgress, 'id' | 'overall'>
    )> }
  )>>> }
);

export type MyCurrentlyWatchingQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCurrentlyWatchingQuery = (
  { readonly __typename?: 'Query' }
  & { readonly myCurrentlyWatching?: Maybe<ReadonlyArray<Maybe<(
    { readonly __typename?: 'Series' }
    & Pick<Series, 'id' | 'title' | 'episodeCount'>
    & { readonly progress?: Maybe<(
      { readonly __typename?: 'UserProgress' }
      & Pick<UserProgress, 'id' | 'completed'>
    )> }
  )>>> }
);

export type EpisodeQueryVariables = Exact<{
  where: EpisodeWhereUniqueInput;
}>;


export type EpisodeQuery = (
  { readonly __typename?: 'Query' }
  & { readonly episode?: Maybe<(
    { readonly __typename?: 'Episode' }
    & Pick<Episode, 'id' | 'title' | 'episodeNumber' | 'remarks' | 'createdAt' | 'updatedAt'>
    & { readonly alternativeTitles?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'AlternativeTitle' }
      & Pick<AlternativeTitle, 'id' | 'title'>
    )>>>, readonly series?: Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'id' | 'title'>
    )> }
  )> }
);

export type EpisodesInSeriesQueryVariables = Exact<{
  where: SeriesWhereUniqueInput;
}>;


export type EpisodesInSeriesQuery = (
  { readonly __typename?: 'Query' }
  & { readonly episodesInSeries?: Maybe<ReadonlyArray<Maybe<(
    { readonly __typename?: 'Episode' }
    & Pick<Episode, 'id' | 'title' | 'episodeNumber' | 'remarks'>
  )>>> }
);

export type CreateEpisodeMutationVariables = Exact<{
  data: EpisodeCreateUpdateInput;
}>;


export type CreateEpisodeMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly createEpisode: (
    { readonly __typename?: 'Episode' }
    & Pick<Episode, 'id'>
  ) }
);

export type BatchCreateEpisodeMutationVariables = Exact<{
  data: ReadonlyArray<EpisodeCreateUpdateInput>;
}>;


export type BatchCreateEpisodeMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly batchCreateEpisode: ReadonlyArray<Maybe<(
    { readonly __typename?: 'Episode' }
    & Pick<Episode, 'id'>
  )>> }
);

export type UpdateEpisodeMutationVariables = Exact<{
  data: EpisodeCreateUpdateInput;
  where: EpisodeWhereUniqueInput;
}>;


export type UpdateEpisodeMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly updateEpisode: (
    { readonly __typename?: 'Episode' }
    & Pick<Episode, 'id'>
  ) }
);

export type DeleteEpisodeMutationVariables = Exact<{
  where: EpisodeWhereUniqueInput;
}>;


export type DeleteEpisodeMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly deleteEpisode: (
    { readonly __typename?: 'Episode' }
    & Pick<Episode, 'id'>
  ) }
);

export type FilesForEpisodeQueryVariables = Exact<{
  where: EpisodeWhereUniqueInput;
}>;


export type FilesForEpisodeQuery = (
  { readonly __typename?: 'Query' }
  & { readonly filesForEpisode?: Maybe<ReadonlyArray<Maybe<(
    { readonly __typename?: 'File' }
    & Pick<File, 'id' | 'path' | 'duration' | 'fileSize' | 'source' | 'resolution' | 'codec' | 'checksum' | 'remarks' | 'createdAt' | 'updatedAt'>
  )>>> }
);

export type FileQueryVariables = Exact<{
  where: FileWhereUniqueInput;
}>;


export type FileQuery = (
  { readonly __typename?: 'Query' }
  & { readonly file?: Maybe<(
    { readonly __typename?: 'File' }
    & Pick<File, 'id' | 'path' | 'duration' | 'fileSize' | 'source' | 'resolution' | 'codec' | 'checksum' | 'remarks' | 'createdAt' | 'updatedAt'>
  )> }
);

export type FilesQueryVariables = Exact<{ [key: string]: never; }>;


export type FilesQuery = (
  { readonly __typename?: 'Query' }
  & { readonly files?: Maybe<ReadonlyArray<Maybe<(
    { readonly __typename?: 'File' }
    & Pick<File, 'id' | 'path' | 'duration' | 'fileSize' | 'source' | 'resolution' | 'codec' | 'checksum' | 'remarks' | 'createdAt' | 'updatedAt'>
  )>>> }
);

export type SuggestedCodecsQueryVariables = Exact<{ [key: string]: never; }>;


export type SuggestedCodecsQuery = (
  { readonly __typename?: 'Query' }
  & { readonly suggestedCodecs?: Maybe<ReadonlyArray<Maybe<(
    { readonly __typename?: 'Codec' }
    & Pick<Codec, 'codec'>
  )>>> }
);

export type CreateFileMutationVariables = Exact<{
  data: FileCreateUpdateInput;
}>;


export type CreateFileMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly createFile: (
    { readonly __typename?: 'File' }
    & Pick<File, 'id'>
  ) }
);

export type UpdateFileMutationVariables = Exact<{
  where: FileWhereUniqueInput;
  data: FileCreateUpdateInput;
}>;


export type UpdateFileMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly updateFile: (
    { readonly __typename?: 'File' }
    & Pick<File, 'id'>
  ) }
);

export type DeleteFileMutationVariables = Exact<{
  where: FileWhereUniqueInput;
}>;


export type DeleteFileMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly deleteFile: (
    { readonly __typename?: 'File' }
    & Pick<File, 'id'>
  ) }
);

export type SuggestedSourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type SuggestedSourcesQuery = (
  { readonly __typename?: 'Query' }
  & { readonly suggestedSources?: Maybe<ReadonlyArray<Maybe<(
    { readonly __typename?: 'ReferenceSource' }
    & Pick<ReferenceSource, 'source'>
  )>>> }
);

export type QuickSearchQueryVariables = Exact<{
  where: Scalars['String'];
}>;


export type QuickSearchQuery = (
  { readonly __typename?: 'Query' }
  & { readonly quickSearch?: Maybe<(
    { readonly __typename?: 'SearchPayload' }
    & { readonly series: ReadonlyArray<Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'id' | 'title'>
    )>>, readonly episodes: ReadonlyArray<Maybe<(
      { readonly __typename?: 'Episode' }
      & Pick<Episode, 'id' | 'title'>
    )>> }
  )> }
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
    )>>> }
    & RelatedSeriesInfoFragment
  )> }
);

export type RelatedSeriesInfoFragment = (
  { readonly __typename?: 'Series' }
  & { readonly prequels?: Maybe<ReadonlyArray<Maybe<(
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
);

export type AllSeriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSeriesQuery = (
  { readonly __typename?: 'Query' }
  & { readonly allSeries?: Maybe<ReadonlyArray<Maybe<(
    { readonly __typename?: 'Series' }
    & Pick<Series, 'id' | 'title' | 'seasonNumber' | 'episodeCount' | 'type' | 'status' | 'releaseSeason' | 'releaseYear' | 'currentStatus'>
  )>>> }
);

export type TotalSeriesCountQueryVariables = Exact<{ [key: string]: never; }>;


export type TotalSeriesCountQuery = (
  { readonly __typename?: 'Query' }
  & Pick<Query, 'totalSeriesCount'>
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
    & Pick<User, 'id' | 'username' | 'name' | 'role' | 'passwordAttempts'>
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { readonly __typename?: 'Query' }
  & { readonly users?: Maybe<ReadonlyArray<Maybe<(
    { readonly __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'name' | 'role' | 'passwordAttempts'>
  )>>> }
);

export type IsInitializedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsInitializedQuery = (
  { readonly __typename?: 'Query' }
  & Pick<Query, 'isInitialized'>
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

export type MySeriesProgressQueryVariables = Exact<{
  where: SeriesWhereUniqueInput;
}>;


export type MySeriesProgressQuery = (
  { readonly __typename?: 'Query' }
  & { readonly mySeriesProgress?: Maybe<(
    { readonly __typename?: 'UserProgress' }
    & Pick<UserProgress, 'id' | 'status' | 'completed' | 'overall' | 'execution' | 'story' | 'sound' | 'art' | 'character' | 'appeal' | 'remarks' | 'createdAt' | 'updatedAt'>
    & { readonly series?: Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'id' | 'episodeCount'>
    )> }
  )> }
);

export type MyProgressQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProgressQuery = (
  { readonly __typename?: 'Query' }
  & { readonly myProgress?: Maybe<ReadonlyArray<Maybe<(
    { readonly __typename?: 'UserProgress' }
    & Pick<UserProgress, 'id' | 'status' | 'completed' | 'overall' | 'execution' | 'story' | 'sound' | 'art' | 'character' | 'appeal' | 'remarks' | 'createdAt' | 'updatedAt'>
    & { readonly series?: Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'id' | 'title' | 'type' | 'episodeCount'>
    )> }
  )>>> }
);

export type CreateUserProgressMutationVariables = Exact<{
  data: UserProgressCreateUpdateInput;
}>;


export type CreateUserProgressMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly createUserProgress: (
    { readonly __typename?: 'UserProgress' }
    & Pick<UserProgress, 'id'>
  ) }
);

export type UpdateUserProgressMutationVariables = Exact<{
  where: UserProgressWhereUniqueInput;
  data: UserProgressCreateUpdateInput;
}>;


export type UpdateUserProgressMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly updateUserProgress: (
    { readonly __typename?: 'UserProgress' }
    & Pick<UserProgress, 'id'>
  ) }
);

export type UpdateMyProgressMutationVariables = Exact<{
  where: SeriesWhereUniqueInput;
  data: UserProgressCreateUpdateInput;
}>;


export type UpdateMyProgressMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly updateMyProgress: (
    { readonly __typename?: 'UserProgress' }
    & Pick<UserProgress, 'id'>
  ) }
);

export type DeleteUserProgressMutationVariables = Exact<{
  where: UserProgressWhereUniqueInput;
}>;


export type DeleteUserProgressMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly deleteUserProgress: (
    { readonly __typename?: 'UserProgress' }
    & Pick<UserProgress, 'id'>
  ) }
);

export const RelatedSeriesInfoFragmentDoc = gql`
    fragment RelatedSeriesInfo on Series {
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
}
    `;
export const LoggedInDocument = gql`
    query LoggedIn {
  loggedIn {
    id
    username
    name
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
export const MyTopTenSeriesDocument = gql`
    query MyTopTenSeries {
  myTopTenSeries {
    id
    title
    progress {
      id
      overall
    }
  }
}
    `;
export type MyTopTenSeriesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MyTopTenSeriesQuery, MyTopTenSeriesQueryVariables>, 'query'>;

    export const MyTopTenSeriesComponent = (props: MyTopTenSeriesComponentProps) => (
      <ApolloReactComponents.Query<MyTopTenSeriesQuery, MyTopTenSeriesQueryVariables> query={MyTopTenSeriesDocument} {...props} />
    );
    
export type MyTopTenSeriesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<MyTopTenSeriesQuery, MyTopTenSeriesQueryVariables>
    } & TChildProps;
export function withMyTopTenSeries<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MyTopTenSeriesQuery,
  MyTopTenSeriesQueryVariables,
  MyTopTenSeriesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, MyTopTenSeriesQuery, MyTopTenSeriesQueryVariables, MyTopTenSeriesProps<TChildProps, TDataName>>(MyTopTenSeriesDocument, {
      alias: 'myTopTenSeries',
      ...operationOptions
    });
};

/**
 * __useMyTopTenSeriesQuery__
 *
 * To run a query within a React component, call `useMyTopTenSeriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTopTenSeriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTopTenSeriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyTopTenSeriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyTopTenSeriesQuery, MyTopTenSeriesQueryVariables>) {
        return ApolloReactHooks.useQuery<MyTopTenSeriesQuery, MyTopTenSeriesQueryVariables>(MyTopTenSeriesDocument, baseOptions);
      }
export function useMyTopTenSeriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyTopTenSeriesQuery, MyTopTenSeriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyTopTenSeriesQuery, MyTopTenSeriesQueryVariables>(MyTopTenSeriesDocument, baseOptions);
        }
export type MyTopTenSeriesQueryHookResult = ReturnType<typeof useMyTopTenSeriesQuery>;
export type MyTopTenSeriesLazyQueryHookResult = ReturnType<typeof useMyTopTenSeriesLazyQuery>;
export type MyTopTenSeriesQueryResult = ApolloReactCommon.QueryResult<MyTopTenSeriesQuery, MyTopTenSeriesQueryVariables>;
export const MyCurrentlyWatchingDocument = gql`
    query MyCurrentlyWatching {
  myCurrentlyWatching {
    id
    title
    episodeCount
    progress {
      id
      completed
    }
  }
}
    `;
export type MyCurrentlyWatchingComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MyCurrentlyWatchingQuery, MyCurrentlyWatchingQueryVariables>, 'query'>;

    export const MyCurrentlyWatchingComponent = (props: MyCurrentlyWatchingComponentProps) => (
      <ApolloReactComponents.Query<MyCurrentlyWatchingQuery, MyCurrentlyWatchingQueryVariables> query={MyCurrentlyWatchingDocument} {...props} />
    );
    
export type MyCurrentlyWatchingProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<MyCurrentlyWatchingQuery, MyCurrentlyWatchingQueryVariables>
    } & TChildProps;
export function withMyCurrentlyWatching<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MyCurrentlyWatchingQuery,
  MyCurrentlyWatchingQueryVariables,
  MyCurrentlyWatchingProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, MyCurrentlyWatchingQuery, MyCurrentlyWatchingQueryVariables, MyCurrentlyWatchingProps<TChildProps, TDataName>>(MyCurrentlyWatchingDocument, {
      alias: 'myCurrentlyWatching',
      ...operationOptions
    });
};

/**
 * __useMyCurrentlyWatchingQuery__
 *
 * To run a query within a React component, call `useMyCurrentlyWatchingQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCurrentlyWatchingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCurrentlyWatchingQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCurrentlyWatchingQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyCurrentlyWatchingQuery, MyCurrentlyWatchingQueryVariables>) {
        return ApolloReactHooks.useQuery<MyCurrentlyWatchingQuery, MyCurrentlyWatchingQueryVariables>(MyCurrentlyWatchingDocument, baseOptions);
      }
export function useMyCurrentlyWatchingLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyCurrentlyWatchingQuery, MyCurrentlyWatchingQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyCurrentlyWatchingQuery, MyCurrentlyWatchingQueryVariables>(MyCurrentlyWatchingDocument, baseOptions);
        }
export type MyCurrentlyWatchingQueryHookResult = ReturnType<typeof useMyCurrentlyWatchingQuery>;
export type MyCurrentlyWatchingLazyQueryHookResult = ReturnType<typeof useMyCurrentlyWatchingLazyQuery>;
export type MyCurrentlyWatchingQueryResult = ApolloReactCommon.QueryResult<MyCurrentlyWatchingQuery, MyCurrentlyWatchingQueryVariables>;
export const EpisodeDocument = gql`
    query Episode($where: EpisodeWhereUniqueInput!) {
  episode(where: $where) {
    id
    title
    alternativeTitles {
      id
      title
    }
    series {
      id
      title
    }
    episodeNumber
    remarks
    createdAt
    updatedAt
  }
}
    `;
export type EpisodeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<EpisodeQuery, EpisodeQueryVariables>, 'query'> & ({ variables: EpisodeQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const EpisodeComponent = (props: EpisodeComponentProps) => (
      <ApolloReactComponents.Query<EpisodeQuery, EpisodeQueryVariables> query={EpisodeDocument} {...props} />
    );
    
export type EpisodeProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<EpisodeQuery, EpisodeQueryVariables>
    } & TChildProps;
export function withEpisode<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EpisodeQuery,
  EpisodeQueryVariables,
  EpisodeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, EpisodeQuery, EpisodeQueryVariables, EpisodeProps<TChildProps, TDataName>>(EpisodeDocument, {
      alias: 'episode',
      ...operationOptions
    });
};

/**
 * __useEpisodeQuery__
 *
 * To run a query within a React component, call `useEpisodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useEpisodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEpisodeQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useEpisodeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EpisodeQuery, EpisodeQueryVariables>) {
        return ApolloReactHooks.useQuery<EpisodeQuery, EpisodeQueryVariables>(EpisodeDocument, baseOptions);
      }
export function useEpisodeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EpisodeQuery, EpisodeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EpisodeQuery, EpisodeQueryVariables>(EpisodeDocument, baseOptions);
        }
export type EpisodeQueryHookResult = ReturnType<typeof useEpisodeQuery>;
export type EpisodeLazyQueryHookResult = ReturnType<typeof useEpisodeLazyQuery>;
export type EpisodeQueryResult = ApolloReactCommon.QueryResult<EpisodeQuery, EpisodeQueryVariables>;
export const EpisodesInSeriesDocument = gql`
    query EpisodesInSeries($where: SeriesWhereUniqueInput!) {
  episodesInSeries(where: $where) {
    id
    title
    episodeNumber
    remarks
  }
}
    `;
export type EpisodesInSeriesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<EpisodesInSeriesQuery, EpisodesInSeriesQueryVariables>, 'query'> & ({ variables: EpisodesInSeriesQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const EpisodesInSeriesComponent = (props: EpisodesInSeriesComponentProps) => (
      <ApolloReactComponents.Query<EpisodesInSeriesQuery, EpisodesInSeriesQueryVariables> query={EpisodesInSeriesDocument} {...props} />
    );
    
export type EpisodesInSeriesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<EpisodesInSeriesQuery, EpisodesInSeriesQueryVariables>
    } & TChildProps;
export function withEpisodesInSeries<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EpisodesInSeriesQuery,
  EpisodesInSeriesQueryVariables,
  EpisodesInSeriesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, EpisodesInSeriesQuery, EpisodesInSeriesQueryVariables, EpisodesInSeriesProps<TChildProps, TDataName>>(EpisodesInSeriesDocument, {
      alias: 'episodesInSeries',
      ...operationOptions
    });
};

/**
 * __useEpisodesInSeriesQuery__
 *
 * To run a query within a React component, call `useEpisodesInSeriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEpisodesInSeriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEpisodesInSeriesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useEpisodesInSeriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EpisodesInSeriesQuery, EpisodesInSeriesQueryVariables>) {
        return ApolloReactHooks.useQuery<EpisodesInSeriesQuery, EpisodesInSeriesQueryVariables>(EpisodesInSeriesDocument, baseOptions);
      }
export function useEpisodesInSeriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EpisodesInSeriesQuery, EpisodesInSeriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EpisodesInSeriesQuery, EpisodesInSeriesQueryVariables>(EpisodesInSeriesDocument, baseOptions);
        }
export type EpisodesInSeriesQueryHookResult = ReturnType<typeof useEpisodesInSeriesQuery>;
export type EpisodesInSeriesLazyQueryHookResult = ReturnType<typeof useEpisodesInSeriesLazyQuery>;
export type EpisodesInSeriesQueryResult = ApolloReactCommon.QueryResult<EpisodesInSeriesQuery, EpisodesInSeriesQueryVariables>;
export const CreateEpisodeDocument = gql`
    mutation CreateEpisode($data: EpisodeCreateUpdateInput!) {
  createEpisode(data: $data) {
    id
  }
}
    `;
export type CreateEpisodeMutationFn = ApolloReactCommon.MutationFunction<CreateEpisodeMutation, CreateEpisodeMutationVariables>;
export type CreateEpisodeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateEpisodeMutation, CreateEpisodeMutationVariables>, 'mutation'>;

    export const CreateEpisodeComponent = (props: CreateEpisodeComponentProps) => (
      <ApolloReactComponents.Mutation<CreateEpisodeMutation, CreateEpisodeMutationVariables> mutation={CreateEpisodeDocument} {...props} />
    );
    
export type CreateEpisodeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateEpisodeMutation, CreateEpisodeMutationVariables>
    } & TChildProps;
export function withCreateEpisode<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateEpisodeMutation,
  CreateEpisodeMutationVariables,
  CreateEpisodeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateEpisodeMutation, CreateEpisodeMutationVariables, CreateEpisodeProps<TChildProps, TDataName>>(CreateEpisodeDocument, {
      alias: 'createEpisode',
      ...operationOptions
    });
};

/**
 * __useCreateEpisodeMutation__
 *
 * To run a mutation, you first call `useCreateEpisodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEpisodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEpisodeMutation, { data, loading, error }] = useCreateEpisodeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEpisodeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEpisodeMutation, CreateEpisodeMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateEpisodeMutation, CreateEpisodeMutationVariables>(CreateEpisodeDocument, baseOptions);
      }
export type CreateEpisodeMutationHookResult = ReturnType<typeof useCreateEpisodeMutation>;
export type CreateEpisodeMutationResult = ApolloReactCommon.MutationResult<CreateEpisodeMutation>;
export type CreateEpisodeMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateEpisodeMutation, CreateEpisodeMutationVariables>;
export const BatchCreateEpisodeDocument = gql`
    mutation BatchCreateEpisode($data: [EpisodeCreateUpdateInput!]!) {
  batchCreateEpisode(data: $data) {
    id
  }
}
    `;
export type BatchCreateEpisodeMutationFn = ApolloReactCommon.MutationFunction<BatchCreateEpisodeMutation, BatchCreateEpisodeMutationVariables>;
export type BatchCreateEpisodeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<BatchCreateEpisodeMutation, BatchCreateEpisodeMutationVariables>, 'mutation'>;

    export const BatchCreateEpisodeComponent = (props: BatchCreateEpisodeComponentProps) => (
      <ApolloReactComponents.Mutation<BatchCreateEpisodeMutation, BatchCreateEpisodeMutationVariables> mutation={BatchCreateEpisodeDocument} {...props} />
    );
    
export type BatchCreateEpisodeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<BatchCreateEpisodeMutation, BatchCreateEpisodeMutationVariables>
    } & TChildProps;
export function withBatchCreateEpisode<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  BatchCreateEpisodeMutation,
  BatchCreateEpisodeMutationVariables,
  BatchCreateEpisodeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, BatchCreateEpisodeMutation, BatchCreateEpisodeMutationVariables, BatchCreateEpisodeProps<TChildProps, TDataName>>(BatchCreateEpisodeDocument, {
      alias: 'batchCreateEpisode',
      ...operationOptions
    });
};

/**
 * __useBatchCreateEpisodeMutation__
 *
 * To run a mutation, you first call `useBatchCreateEpisodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBatchCreateEpisodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [batchCreateEpisodeMutation, { data, loading, error }] = useBatchCreateEpisodeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useBatchCreateEpisodeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<BatchCreateEpisodeMutation, BatchCreateEpisodeMutationVariables>) {
        return ApolloReactHooks.useMutation<BatchCreateEpisodeMutation, BatchCreateEpisodeMutationVariables>(BatchCreateEpisodeDocument, baseOptions);
      }
export type BatchCreateEpisodeMutationHookResult = ReturnType<typeof useBatchCreateEpisodeMutation>;
export type BatchCreateEpisodeMutationResult = ApolloReactCommon.MutationResult<BatchCreateEpisodeMutation>;
export type BatchCreateEpisodeMutationOptions = ApolloReactCommon.BaseMutationOptions<BatchCreateEpisodeMutation, BatchCreateEpisodeMutationVariables>;
export const UpdateEpisodeDocument = gql`
    mutation UpdateEpisode($data: EpisodeCreateUpdateInput!, $where: EpisodeWhereUniqueInput!) {
  updateEpisode(data: $data, where: $where) {
    id
  }
}
    `;
export type UpdateEpisodeMutationFn = ApolloReactCommon.MutationFunction<UpdateEpisodeMutation, UpdateEpisodeMutationVariables>;
export type UpdateEpisodeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateEpisodeMutation, UpdateEpisodeMutationVariables>, 'mutation'>;

    export const UpdateEpisodeComponent = (props: UpdateEpisodeComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateEpisodeMutation, UpdateEpisodeMutationVariables> mutation={UpdateEpisodeDocument} {...props} />
    );
    
export type UpdateEpisodeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateEpisodeMutation, UpdateEpisodeMutationVariables>
    } & TChildProps;
export function withUpdateEpisode<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateEpisodeMutation,
  UpdateEpisodeMutationVariables,
  UpdateEpisodeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateEpisodeMutation, UpdateEpisodeMutationVariables, UpdateEpisodeProps<TChildProps, TDataName>>(UpdateEpisodeDocument, {
      alias: 'updateEpisode',
      ...operationOptions
    });
};

/**
 * __useUpdateEpisodeMutation__
 *
 * To run a mutation, you first call `useUpdateEpisodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEpisodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEpisodeMutation, { data, loading, error }] = useUpdateEpisodeMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateEpisodeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateEpisodeMutation, UpdateEpisodeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateEpisodeMutation, UpdateEpisodeMutationVariables>(UpdateEpisodeDocument, baseOptions);
      }
export type UpdateEpisodeMutationHookResult = ReturnType<typeof useUpdateEpisodeMutation>;
export type UpdateEpisodeMutationResult = ApolloReactCommon.MutationResult<UpdateEpisodeMutation>;
export type UpdateEpisodeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateEpisodeMutation, UpdateEpisodeMutationVariables>;
export const DeleteEpisodeDocument = gql`
    mutation DeleteEpisode($where: EpisodeWhereUniqueInput!) {
  deleteEpisode(where: $where) {
    id
  }
}
    `;
export type DeleteEpisodeMutationFn = ApolloReactCommon.MutationFunction<DeleteEpisodeMutation, DeleteEpisodeMutationVariables>;
export type DeleteEpisodeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteEpisodeMutation, DeleteEpisodeMutationVariables>, 'mutation'>;

    export const DeleteEpisodeComponent = (props: DeleteEpisodeComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteEpisodeMutation, DeleteEpisodeMutationVariables> mutation={DeleteEpisodeDocument} {...props} />
    );
    
export type DeleteEpisodeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteEpisodeMutation, DeleteEpisodeMutationVariables>
    } & TChildProps;
export function withDeleteEpisode<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteEpisodeMutation,
  DeleteEpisodeMutationVariables,
  DeleteEpisodeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteEpisodeMutation, DeleteEpisodeMutationVariables, DeleteEpisodeProps<TChildProps, TDataName>>(DeleteEpisodeDocument, {
      alias: 'deleteEpisode',
      ...operationOptions
    });
};

/**
 * __useDeleteEpisodeMutation__
 *
 * To run a mutation, you first call `useDeleteEpisodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEpisodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEpisodeMutation, { data, loading, error }] = useDeleteEpisodeMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteEpisodeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteEpisodeMutation, DeleteEpisodeMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteEpisodeMutation, DeleteEpisodeMutationVariables>(DeleteEpisodeDocument, baseOptions);
      }
export type DeleteEpisodeMutationHookResult = ReturnType<typeof useDeleteEpisodeMutation>;
export type DeleteEpisodeMutationResult = ApolloReactCommon.MutationResult<DeleteEpisodeMutation>;
export type DeleteEpisodeMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteEpisodeMutation, DeleteEpisodeMutationVariables>;
export const FilesForEpisodeDocument = gql`
    query FilesForEpisode($where: EpisodeWhereUniqueInput!) {
  filesForEpisode(where: $where) {
    id
    path
    duration
    fileSize
    source
    resolution
    codec
    checksum
    remarks
    createdAt
    updatedAt
  }
}
    `;
export type FilesForEpisodeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FilesForEpisodeQuery, FilesForEpisodeQueryVariables>, 'query'> & ({ variables: FilesForEpisodeQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const FilesForEpisodeComponent = (props: FilesForEpisodeComponentProps) => (
      <ApolloReactComponents.Query<FilesForEpisodeQuery, FilesForEpisodeQueryVariables> query={FilesForEpisodeDocument} {...props} />
    );
    
export type FilesForEpisodeProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FilesForEpisodeQuery, FilesForEpisodeQueryVariables>
    } & TChildProps;
export function withFilesForEpisode<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FilesForEpisodeQuery,
  FilesForEpisodeQueryVariables,
  FilesForEpisodeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FilesForEpisodeQuery, FilesForEpisodeQueryVariables, FilesForEpisodeProps<TChildProps, TDataName>>(FilesForEpisodeDocument, {
      alias: 'filesForEpisode',
      ...operationOptions
    });
};

/**
 * __useFilesForEpisodeQuery__
 *
 * To run a query within a React component, call `useFilesForEpisodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilesForEpisodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilesForEpisodeQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFilesForEpisodeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FilesForEpisodeQuery, FilesForEpisodeQueryVariables>) {
        return ApolloReactHooks.useQuery<FilesForEpisodeQuery, FilesForEpisodeQueryVariables>(FilesForEpisodeDocument, baseOptions);
      }
export function useFilesForEpisodeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FilesForEpisodeQuery, FilesForEpisodeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FilesForEpisodeQuery, FilesForEpisodeQueryVariables>(FilesForEpisodeDocument, baseOptions);
        }
export type FilesForEpisodeQueryHookResult = ReturnType<typeof useFilesForEpisodeQuery>;
export type FilesForEpisodeLazyQueryHookResult = ReturnType<typeof useFilesForEpisodeLazyQuery>;
export type FilesForEpisodeQueryResult = ApolloReactCommon.QueryResult<FilesForEpisodeQuery, FilesForEpisodeQueryVariables>;
export const FileDocument = gql`
    query File($where: FileWhereUniqueInput!) {
  file(where: $where) {
    id
    path
    duration
    fileSize
    source
    resolution
    codec
    checksum
    remarks
    createdAt
    updatedAt
  }
}
    `;
export type FileComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FileQuery, FileQueryVariables>, 'query'> & ({ variables: FileQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const FileComponent = (props: FileComponentProps) => (
      <ApolloReactComponents.Query<FileQuery, FileQueryVariables> query={FileDocument} {...props} />
    );
    
export type FileProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FileQuery, FileQueryVariables>
    } & TChildProps;
export function withFile<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FileQuery,
  FileQueryVariables,
  FileProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FileQuery, FileQueryVariables, FileProps<TChildProps, TDataName>>(FileDocument, {
      alias: 'file',
      ...operationOptions
    });
};

/**
 * __useFileQuery__
 *
 * To run a query within a React component, call `useFileQuery` and pass it any options that fit your needs.
 * When your component renders, `useFileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFileQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FileQuery, FileQueryVariables>) {
        return ApolloReactHooks.useQuery<FileQuery, FileQueryVariables>(FileDocument, baseOptions);
      }
export function useFileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FileQuery, FileQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FileQuery, FileQueryVariables>(FileDocument, baseOptions);
        }
export type FileQueryHookResult = ReturnType<typeof useFileQuery>;
export type FileLazyQueryHookResult = ReturnType<typeof useFileLazyQuery>;
export type FileQueryResult = ApolloReactCommon.QueryResult<FileQuery, FileQueryVariables>;
export const FilesDocument = gql`
    query Files {
  files {
    id
    path
    duration
    fileSize
    source
    resolution
    codec
    checksum
    remarks
    createdAt
    updatedAt
  }
}
    `;
export type FilesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FilesQuery, FilesQueryVariables>, 'query'>;

    export const FilesComponent = (props: FilesComponentProps) => (
      <ApolloReactComponents.Query<FilesQuery, FilesQueryVariables> query={FilesDocument} {...props} />
    );
    
export type FilesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<FilesQuery, FilesQueryVariables>
    } & TChildProps;
export function withFiles<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FilesQuery,
  FilesQueryVariables,
  FilesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, FilesQuery, FilesQueryVariables, FilesProps<TChildProps, TDataName>>(FilesDocument, {
      alias: 'files',
      ...operationOptions
    });
};

/**
 * __useFilesQuery__
 *
 * To run a query within a React component, call `useFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFilesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FilesQuery, FilesQueryVariables>) {
        return ApolloReactHooks.useQuery<FilesQuery, FilesQueryVariables>(FilesDocument, baseOptions);
      }
export function useFilesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FilesQuery, FilesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FilesQuery, FilesQueryVariables>(FilesDocument, baseOptions);
        }
export type FilesQueryHookResult = ReturnType<typeof useFilesQuery>;
export type FilesLazyQueryHookResult = ReturnType<typeof useFilesLazyQuery>;
export type FilesQueryResult = ApolloReactCommon.QueryResult<FilesQuery, FilesQueryVariables>;
export const SuggestedCodecsDocument = gql`
    query SuggestedCodecs {
  suggestedCodecs {
    codec
  }
}
    `;
export type SuggestedCodecsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SuggestedCodecsQuery, SuggestedCodecsQueryVariables>, 'query'>;

    export const SuggestedCodecsComponent = (props: SuggestedCodecsComponentProps) => (
      <ApolloReactComponents.Query<SuggestedCodecsQuery, SuggestedCodecsQueryVariables> query={SuggestedCodecsDocument} {...props} />
    );
    
export type SuggestedCodecsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<SuggestedCodecsQuery, SuggestedCodecsQueryVariables>
    } & TChildProps;
export function withSuggestedCodecs<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SuggestedCodecsQuery,
  SuggestedCodecsQueryVariables,
  SuggestedCodecsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, SuggestedCodecsQuery, SuggestedCodecsQueryVariables, SuggestedCodecsProps<TChildProps, TDataName>>(SuggestedCodecsDocument, {
      alias: 'suggestedCodecs',
      ...operationOptions
    });
};

/**
 * __useSuggestedCodecsQuery__
 *
 * To run a query within a React component, call `useSuggestedCodecsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSuggestedCodecsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuggestedCodecsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSuggestedCodecsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SuggestedCodecsQuery, SuggestedCodecsQueryVariables>) {
        return ApolloReactHooks.useQuery<SuggestedCodecsQuery, SuggestedCodecsQueryVariables>(SuggestedCodecsDocument, baseOptions);
      }
export function useSuggestedCodecsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SuggestedCodecsQuery, SuggestedCodecsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SuggestedCodecsQuery, SuggestedCodecsQueryVariables>(SuggestedCodecsDocument, baseOptions);
        }
export type SuggestedCodecsQueryHookResult = ReturnType<typeof useSuggestedCodecsQuery>;
export type SuggestedCodecsLazyQueryHookResult = ReturnType<typeof useSuggestedCodecsLazyQuery>;
export type SuggestedCodecsQueryResult = ApolloReactCommon.QueryResult<SuggestedCodecsQuery, SuggestedCodecsQueryVariables>;
export const CreateFileDocument = gql`
    mutation CreateFile($data: FileCreateUpdateInput!) {
  createFile(data: $data) {
    id
  }
}
    `;
export type CreateFileMutationFn = ApolloReactCommon.MutationFunction<CreateFileMutation, CreateFileMutationVariables>;
export type CreateFileComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateFileMutation, CreateFileMutationVariables>, 'mutation'>;

    export const CreateFileComponent = (props: CreateFileComponentProps) => (
      <ApolloReactComponents.Mutation<CreateFileMutation, CreateFileMutationVariables> mutation={CreateFileDocument} {...props} />
    );
    
export type CreateFileProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateFileMutation, CreateFileMutationVariables>
    } & TChildProps;
export function withCreateFile<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateFileMutation,
  CreateFileMutationVariables,
  CreateFileProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateFileMutation, CreateFileMutationVariables, CreateFileProps<TChildProps, TDataName>>(CreateFileDocument, {
      alias: 'createFile',
      ...operationOptions
    });
};

/**
 * __useCreateFileMutation__
 *
 * To run a mutation, you first call `useCreateFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFileMutation, { data, loading, error }] = useCreateFileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateFileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateFileMutation, CreateFileMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateFileMutation, CreateFileMutationVariables>(CreateFileDocument, baseOptions);
      }
export type CreateFileMutationHookResult = ReturnType<typeof useCreateFileMutation>;
export type CreateFileMutationResult = ApolloReactCommon.MutationResult<CreateFileMutation>;
export type CreateFileMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateFileMutation, CreateFileMutationVariables>;
export const UpdateFileDocument = gql`
    mutation UpdateFile($where: FileWhereUniqueInput!, $data: FileCreateUpdateInput!) {
  updateFile(where: $where, data: $data) {
    id
  }
}
    `;
export type UpdateFileMutationFn = ApolloReactCommon.MutationFunction<UpdateFileMutation, UpdateFileMutationVariables>;
export type UpdateFileComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateFileMutation, UpdateFileMutationVariables>, 'mutation'>;

    export const UpdateFileComponent = (props: UpdateFileComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateFileMutation, UpdateFileMutationVariables> mutation={UpdateFileDocument} {...props} />
    );
    
export type UpdateFileProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateFileMutation, UpdateFileMutationVariables>
    } & TChildProps;
export function withUpdateFile<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateFileMutation,
  UpdateFileMutationVariables,
  UpdateFileProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateFileMutation, UpdateFileMutationVariables, UpdateFileProps<TChildProps, TDataName>>(UpdateFileDocument, {
      alias: 'updateFile',
      ...operationOptions
    });
};

/**
 * __useUpdateFileMutation__
 *
 * To run a mutation, you first call `useUpdateFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFileMutation, { data, loading, error }] = useUpdateFileMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateFileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateFileMutation, UpdateFileMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateFileMutation, UpdateFileMutationVariables>(UpdateFileDocument, baseOptions);
      }
export type UpdateFileMutationHookResult = ReturnType<typeof useUpdateFileMutation>;
export type UpdateFileMutationResult = ApolloReactCommon.MutationResult<UpdateFileMutation>;
export type UpdateFileMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateFileMutation, UpdateFileMutationVariables>;
export const DeleteFileDocument = gql`
    mutation DeleteFile($where: FileWhereUniqueInput!) {
  deleteFile(where: $where) {
    id
  }
}
    `;
export type DeleteFileMutationFn = ApolloReactCommon.MutationFunction<DeleteFileMutation, DeleteFileMutationVariables>;
export type DeleteFileComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteFileMutation, DeleteFileMutationVariables>, 'mutation'>;

    export const DeleteFileComponent = (props: DeleteFileComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteFileMutation, DeleteFileMutationVariables> mutation={DeleteFileDocument} {...props} />
    );
    
export type DeleteFileProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteFileMutation, DeleteFileMutationVariables>
    } & TChildProps;
export function withDeleteFile<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteFileMutation,
  DeleteFileMutationVariables,
  DeleteFileProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteFileMutation, DeleteFileMutationVariables, DeleteFileProps<TChildProps, TDataName>>(DeleteFileDocument, {
      alias: 'deleteFile',
      ...operationOptions
    });
};

/**
 * __useDeleteFileMutation__
 *
 * To run a mutation, you first call `useDeleteFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFileMutation, { data, loading, error }] = useDeleteFileMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteFileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteFileMutation, DeleteFileMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteFileMutation, DeleteFileMutationVariables>(DeleteFileDocument, baseOptions);
      }
export type DeleteFileMutationHookResult = ReturnType<typeof useDeleteFileMutation>;
export type DeleteFileMutationResult = ApolloReactCommon.MutationResult<DeleteFileMutation>;
export type DeleteFileMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteFileMutation, DeleteFileMutationVariables>;
export const SuggestedSourcesDocument = gql`
    query SuggestedSources {
  suggestedSources {
    source
  }
}
    `;
export type SuggestedSourcesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SuggestedSourcesQuery, SuggestedSourcesQueryVariables>, 'query'>;

    export const SuggestedSourcesComponent = (props: SuggestedSourcesComponentProps) => (
      <ApolloReactComponents.Query<SuggestedSourcesQuery, SuggestedSourcesQueryVariables> query={SuggestedSourcesDocument} {...props} />
    );
    
export type SuggestedSourcesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<SuggestedSourcesQuery, SuggestedSourcesQueryVariables>
    } & TChildProps;
export function withSuggestedSources<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SuggestedSourcesQuery,
  SuggestedSourcesQueryVariables,
  SuggestedSourcesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, SuggestedSourcesQuery, SuggestedSourcesQueryVariables, SuggestedSourcesProps<TChildProps, TDataName>>(SuggestedSourcesDocument, {
      alias: 'suggestedSources',
      ...operationOptions
    });
};

/**
 * __useSuggestedSourcesQuery__
 *
 * To run a query within a React component, call `useSuggestedSourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSuggestedSourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuggestedSourcesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSuggestedSourcesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SuggestedSourcesQuery, SuggestedSourcesQueryVariables>) {
        return ApolloReactHooks.useQuery<SuggestedSourcesQuery, SuggestedSourcesQueryVariables>(SuggestedSourcesDocument, baseOptions);
      }
export function useSuggestedSourcesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SuggestedSourcesQuery, SuggestedSourcesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SuggestedSourcesQuery, SuggestedSourcesQueryVariables>(SuggestedSourcesDocument, baseOptions);
        }
export type SuggestedSourcesQueryHookResult = ReturnType<typeof useSuggestedSourcesQuery>;
export type SuggestedSourcesLazyQueryHookResult = ReturnType<typeof useSuggestedSourcesLazyQuery>;
export type SuggestedSourcesQueryResult = ApolloReactCommon.QueryResult<SuggestedSourcesQuery, SuggestedSourcesQueryVariables>;
export const QuickSearchDocument = gql`
    query QuickSearch($where: String!) {
  quickSearch(where: $where) {
    series {
      id
      title
    }
    episodes {
      id
      title
    }
  }
}
    `;
export type QuickSearchComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<QuickSearchQuery, QuickSearchQueryVariables>, 'query'> & ({ variables: QuickSearchQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const QuickSearchComponent = (props: QuickSearchComponentProps) => (
      <ApolloReactComponents.Query<QuickSearchQuery, QuickSearchQueryVariables> query={QuickSearchDocument} {...props} />
    );
    
export type QuickSearchProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<QuickSearchQuery, QuickSearchQueryVariables>
    } & TChildProps;
export function withQuickSearch<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  QuickSearchQuery,
  QuickSearchQueryVariables,
  QuickSearchProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, QuickSearchQuery, QuickSearchQueryVariables, QuickSearchProps<TChildProps, TDataName>>(QuickSearchDocument, {
      alias: 'quickSearch',
      ...operationOptions
    });
};

/**
 * __useQuickSearchQuery__
 *
 * To run a query within a React component, call `useQuickSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuickSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuickSearchQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useQuickSearchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<QuickSearchQuery, QuickSearchQueryVariables>) {
        return ApolloReactHooks.useQuery<QuickSearchQuery, QuickSearchQueryVariables>(QuickSearchDocument, baseOptions);
      }
export function useQuickSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<QuickSearchQuery, QuickSearchQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<QuickSearchQuery, QuickSearchQueryVariables>(QuickSearchDocument, baseOptions);
        }
export type QuickSearchQueryHookResult = ReturnType<typeof useQuickSearchQuery>;
export type QuickSearchLazyQueryHookResult = ReturnType<typeof useQuickSearchLazyQuery>;
export type QuickSearchQueryResult = ApolloReactCommon.QueryResult<QuickSearchQuery, QuickSearchQueryVariables>;
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
    ...RelatedSeriesInfo
    createdAt
    updatedAt
  }
}
    ${RelatedSeriesInfoFragmentDoc}`;
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
    currentStatus
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
export const TotalSeriesCountDocument = gql`
    query TotalSeriesCount {
  totalSeriesCount
}
    `;
export type TotalSeriesCountComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<TotalSeriesCountQuery, TotalSeriesCountQueryVariables>, 'query'>;

    export const TotalSeriesCountComponent = (props: TotalSeriesCountComponentProps) => (
      <ApolloReactComponents.Query<TotalSeriesCountQuery, TotalSeriesCountQueryVariables> query={TotalSeriesCountDocument} {...props} />
    );
    
export type TotalSeriesCountProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<TotalSeriesCountQuery, TotalSeriesCountQueryVariables>
    } & TChildProps;
export function withTotalSeriesCount<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  TotalSeriesCountQuery,
  TotalSeriesCountQueryVariables,
  TotalSeriesCountProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, TotalSeriesCountQuery, TotalSeriesCountQueryVariables, TotalSeriesCountProps<TChildProps, TDataName>>(TotalSeriesCountDocument, {
      alias: 'totalSeriesCount',
      ...operationOptions
    });
};

/**
 * __useTotalSeriesCountQuery__
 *
 * To run a query within a React component, call `useTotalSeriesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalSeriesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalSeriesCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useTotalSeriesCountQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TotalSeriesCountQuery, TotalSeriesCountQueryVariables>) {
        return ApolloReactHooks.useQuery<TotalSeriesCountQuery, TotalSeriesCountQueryVariables>(TotalSeriesCountDocument, baseOptions);
      }
export function useTotalSeriesCountLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TotalSeriesCountQuery, TotalSeriesCountQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TotalSeriesCountQuery, TotalSeriesCountQueryVariables>(TotalSeriesCountDocument, baseOptions);
        }
export type TotalSeriesCountQueryHookResult = ReturnType<typeof useTotalSeriesCountQuery>;
export type TotalSeriesCountLazyQueryHookResult = ReturnType<typeof useTotalSeriesCountLazyQuery>;
export type TotalSeriesCountQueryResult = ApolloReactCommon.QueryResult<TotalSeriesCountQuery, TotalSeriesCountQueryVariables>;
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
    role
    passwordAttempts
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
    username
    name
    role
    passwordAttempts
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
export const IsInitializedDocument = gql`
    query IsInitialized {
  isInitialized
}
    `;
export type IsInitializedComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<IsInitializedQuery, IsInitializedQueryVariables>, 'query'>;

    export const IsInitializedComponent = (props: IsInitializedComponentProps) => (
      <ApolloReactComponents.Query<IsInitializedQuery, IsInitializedQueryVariables> query={IsInitializedDocument} {...props} />
    );
    
export type IsInitializedProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<IsInitializedQuery, IsInitializedQueryVariables>
    } & TChildProps;
export function withIsInitialized<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  IsInitializedQuery,
  IsInitializedQueryVariables,
  IsInitializedProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, IsInitializedQuery, IsInitializedQueryVariables, IsInitializedProps<TChildProps, TDataName>>(IsInitializedDocument, {
      alias: 'isInitialized',
      ...operationOptions
    });
};

/**
 * __useIsInitializedQuery__
 *
 * To run a query within a React component, call `useIsInitializedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsInitializedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsInitializedQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsInitializedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IsInitializedQuery, IsInitializedQueryVariables>) {
        return ApolloReactHooks.useQuery<IsInitializedQuery, IsInitializedQueryVariables>(IsInitializedDocument, baseOptions);
      }
export function useIsInitializedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsInitializedQuery, IsInitializedQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IsInitializedQuery, IsInitializedQueryVariables>(IsInitializedDocument, baseOptions);
        }
export type IsInitializedQueryHookResult = ReturnType<typeof useIsInitializedQuery>;
export type IsInitializedLazyQueryHookResult = ReturnType<typeof useIsInitializedLazyQuery>;
export type IsInitializedQueryResult = ApolloReactCommon.QueryResult<IsInitializedQuery, IsInitializedQueryVariables>;
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
export const MySeriesProgressDocument = gql`
    query mySeriesProgress($where: SeriesWhereUniqueInput!) {
  mySeriesProgress(where: $where) {
    id
    status
    completed
    overall
    execution
    story
    sound
    art
    character
    appeal
    remarks
    series {
      id
      episodeCount
    }
    createdAt
    updatedAt
  }
}
    `;
export type MySeriesProgressComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MySeriesProgressQuery, MySeriesProgressQueryVariables>, 'query'> & ({ variables: MySeriesProgressQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const MySeriesProgressComponent = (props: MySeriesProgressComponentProps) => (
      <ApolloReactComponents.Query<MySeriesProgressQuery, MySeriesProgressQueryVariables> query={MySeriesProgressDocument} {...props} />
    );
    
export type MySeriesProgressProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<MySeriesProgressQuery, MySeriesProgressQueryVariables>
    } & TChildProps;
export function withMySeriesProgress<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MySeriesProgressQuery,
  MySeriesProgressQueryVariables,
  MySeriesProgressProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, MySeriesProgressQuery, MySeriesProgressQueryVariables, MySeriesProgressProps<TChildProps, TDataName>>(MySeriesProgressDocument, {
      alias: 'mySeriesProgress',
      ...operationOptions
    });
};

/**
 * __useMySeriesProgressQuery__
 *
 * To run a query within a React component, call `useMySeriesProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useMySeriesProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMySeriesProgressQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useMySeriesProgressQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MySeriesProgressQuery, MySeriesProgressQueryVariables>) {
        return ApolloReactHooks.useQuery<MySeriesProgressQuery, MySeriesProgressQueryVariables>(MySeriesProgressDocument, baseOptions);
      }
export function useMySeriesProgressLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MySeriesProgressQuery, MySeriesProgressQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MySeriesProgressQuery, MySeriesProgressQueryVariables>(MySeriesProgressDocument, baseOptions);
        }
export type MySeriesProgressQueryHookResult = ReturnType<typeof useMySeriesProgressQuery>;
export type MySeriesProgressLazyQueryHookResult = ReturnType<typeof useMySeriesProgressLazyQuery>;
export type MySeriesProgressQueryResult = ApolloReactCommon.QueryResult<MySeriesProgressQuery, MySeriesProgressQueryVariables>;
export const MyProgressDocument = gql`
    query myProgress {
  myProgress {
    id
    series {
      id
      title
      type
      episodeCount
    }
    status
    completed
    overall
    execution
    story
    sound
    art
    character
    appeal
    remarks
    createdAt
    updatedAt
  }
}
    `;
export type MyProgressComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MyProgressQuery, MyProgressQueryVariables>, 'query'>;

    export const MyProgressComponent = (props: MyProgressComponentProps) => (
      <ApolloReactComponents.Query<MyProgressQuery, MyProgressQueryVariables> query={MyProgressDocument} {...props} />
    );
    
export type MyProgressProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<MyProgressQuery, MyProgressQueryVariables>
    } & TChildProps;
export function withMyProgress<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MyProgressQuery,
  MyProgressQueryVariables,
  MyProgressProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, MyProgressQuery, MyProgressQueryVariables, MyProgressProps<TChildProps, TDataName>>(MyProgressDocument, {
      alias: 'myProgress',
      ...operationOptions
    });
};

/**
 * __useMyProgressQuery__
 *
 * To run a query within a React component, call `useMyProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProgressQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProgressQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyProgressQuery, MyProgressQueryVariables>) {
        return ApolloReactHooks.useQuery<MyProgressQuery, MyProgressQueryVariables>(MyProgressDocument, baseOptions);
      }
export function useMyProgressLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyProgressQuery, MyProgressQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyProgressQuery, MyProgressQueryVariables>(MyProgressDocument, baseOptions);
        }
export type MyProgressQueryHookResult = ReturnType<typeof useMyProgressQuery>;
export type MyProgressLazyQueryHookResult = ReturnType<typeof useMyProgressLazyQuery>;
export type MyProgressQueryResult = ApolloReactCommon.QueryResult<MyProgressQuery, MyProgressQueryVariables>;
export const CreateUserProgressDocument = gql`
    mutation CreateUserProgress($data: UserProgressCreateUpdateInput!) {
  createUserProgress(data: $data) {
    id
  }
}
    `;
export type CreateUserProgressMutationFn = ApolloReactCommon.MutationFunction<CreateUserProgressMutation, CreateUserProgressMutationVariables>;
export type CreateUserProgressComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateUserProgressMutation, CreateUserProgressMutationVariables>, 'mutation'>;

    export const CreateUserProgressComponent = (props: CreateUserProgressComponentProps) => (
      <ApolloReactComponents.Mutation<CreateUserProgressMutation, CreateUserProgressMutationVariables> mutation={CreateUserProgressDocument} {...props} />
    );
    
export type CreateUserProgressProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateUserProgressMutation, CreateUserProgressMutationVariables>
    } & TChildProps;
export function withCreateUserProgress<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateUserProgressMutation,
  CreateUserProgressMutationVariables,
  CreateUserProgressProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateUserProgressMutation, CreateUserProgressMutationVariables, CreateUserProgressProps<TChildProps, TDataName>>(CreateUserProgressDocument, {
      alias: 'createUserProgress',
      ...operationOptions
    });
};

/**
 * __useCreateUserProgressMutation__
 *
 * To run a mutation, you first call `useCreateUserProgressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserProgressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserProgressMutation, { data, loading, error }] = useCreateUserProgressMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserProgressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserProgressMutation, CreateUserProgressMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserProgressMutation, CreateUserProgressMutationVariables>(CreateUserProgressDocument, baseOptions);
      }
export type CreateUserProgressMutationHookResult = ReturnType<typeof useCreateUserProgressMutation>;
export type CreateUserProgressMutationResult = ApolloReactCommon.MutationResult<CreateUserProgressMutation>;
export type CreateUserProgressMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserProgressMutation, CreateUserProgressMutationVariables>;
export const UpdateUserProgressDocument = gql`
    mutation UpdateUserProgress($where: UserProgressWhereUniqueInput!, $data: UserProgressCreateUpdateInput!) {
  updateUserProgress(where: $where, data: $data) {
    id
  }
}
    `;
export type UpdateUserProgressMutationFn = ApolloReactCommon.MutationFunction<UpdateUserProgressMutation, UpdateUserProgressMutationVariables>;
export type UpdateUserProgressComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUserProgressMutation, UpdateUserProgressMutationVariables>, 'mutation'>;

    export const UpdateUserProgressComponent = (props: UpdateUserProgressComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUserProgressMutation, UpdateUserProgressMutationVariables> mutation={UpdateUserProgressDocument} {...props} />
    );
    
export type UpdateUserProgressProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateUserProgressMutation, UpdateUserProgressMutationVariables>
    } & TChildProps;
export function withUpdateUserProgress<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateUserProgressMutation,
  UpdateUserProgressMutationVariables,
  UpdateUserProgressProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateUserProgressMutation, UpdateUserProgressMutationVariables, UpdateUserProgressProps<TChildProps, TDataName>>(UpdateUserProgressDocument, {
      alias: 'updateUserProgress',
      ...operationOptions
    });
};

/**
 * __useUpdateUserProgressMutation__
 *
 * To run a mutation, you first call `useUpdateUserProgressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProgressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProgressMutation, { data, loading, error }] = useUpdateUserProgressMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserProgressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserProgressMutation, UpdateUserProgressMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserProgressMutation, UpdateUserProgressMutationVariables>(UpdateUserProgressDocument, baseOptions);
      }
export type UpdateUserProgressMutationHookResult = ReturnType<typeof useUpdateUserProgressMutation>;
export type UpdateUserProgressMutationResult = ApolloReactCommon.MutationResult<UpdateUserProgressMutation>;
export type UpdateUserProgressMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserProgressMutation, UpdateUserProgressMutationVariables>;
export const UpdateMyProgressDocument = gql`
    mutation UpdateMyProgress($where: SeriesWhereUniqueInput!, $data: UserProgressCreateUpdateInput!) {
  updateMyProgress(where: $where, data: $data) {
    id
  }
}
    `;
export type UpdateMyProgressMutationFn = ApolloReactCommon.MutationFunction<UpdateMyProgressMutation, UpdateMyProgressMutationVariables>;
export type UpdateMyProgressComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateMyProgressMutation, UpdateMyProgressMutationVariables>, 'mutation'>;

    export const UpdateMyProgressComponent = (props: UpdateMyProgressComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateMyProgressMutation, UpdateMyProgressMutationVariables> mutation={UpdateMyProgressDocument} {...props} />
    );
    
export type UpdateMyProgressProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateMyProgressMutation, UpdateMyProgressMutationVariables>
    } & TChildProps;
export function withUpdateMyProgress<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateMyProgressMutation,
  UpdateMyProgressMutationVariables,
  UpdateMyProgressProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateMyProgressMutation, UpdateMyProgressMutationVariables, UpdateMyProgressProps<TChildProps, TDataName>>(UpdateMyProgressDocument, {
      alias: 'updateMyProgress',
      ...operationOptions
    });
};

/**
 * __useUpdateMyProgressMutation__
 *
 * To run a mutation, you first call `useUpdateMyProgressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMyProgressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMyProgressMutation, { data, loading, error }] = useUpdateMyProgressMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMyProgressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMyProgressMutation, UpdateMyProgressMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateMyProgressMutation, UpdateMyProgressMutationVariables>(UpdateMyProgressDocument, baseOptions);
      }
export type UpdateMyProgressMutationHookResult = ReturnType<typeof useUpdateMyProgressMutation>;
export type UpdateMyProgressMutationResult = ApolloReactCommon.MutationResult<UpdateMyProgressMutation>;
export type UpdateMyProgressMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateMyProgressMutation, UpdateMyProgressMutationVariables>;
export const DeleteUserProgressDocument = gql`
    mutation DeleteUserProgress($where: UserProgressWhereUniqueInput!) {
  deleteUserProgress(where: $where) {
    id
  }
}
    `;
export type DeleteUserProgressMutationFn = ApolloReactCommon.MutationFunction<DeleteUserProgressMutation, DeleteUserProgressMutationVariables>;
export type DeleteUserProgressComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteUserProgressMutation, DeleteUserProgressMutationVariables>, 'mutation'>;

    export const DeleteUserProgressComponent = (props: DeleteUserProgressComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteUserProgressMutation, DeleteUserProgressMutationVariables> mutation={DeleteUserProgressDocument} {...props} />
    );
    
export type DeleteUserProgressProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteUserProgressMutation, DeleteUserProgressMutationVariables>
    } & TChildProps;
export function withDeleteUserProgress<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteUserProgressMutation,
  DeleteUserProgressMutationVariables,
  DeleteUserProgressProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteUserProgressMutation, DeleteUserProgressMutationVariables, DeleteUserProgressProps<TChildProps, TDataName>>(DeleteUserProgressDocument, {
      alias: 'deleteUserProgress',
      ...operationOptions
    });
};

/**
 * __useDeleteUserProgressMutation__
 *
 * To run a mutation, you first call `useDeleteUserProgressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserProgressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserProgressMutation, { data, loading, error }] = useDeleteUserProgressMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteUserProgressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserProgressMutation, DeleteUserProgressMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteUserProgressMutation, DeleteUserProgressMutationVariables>(DeleteUserProgressDocument, baseOptions);
      }
export type DeleteUserProgressMutationHookResult = ReturnType<typeof useDeleteUserProgressMutation>;
export type DeleteUserProgressMutationResult = ApolloReactCommon.MutationResult<DeleteUserProgressMutation>;
export type DeleteUserProgressMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserProgressMutation, DeleteUserProgressMutationVariables>;