import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
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
  /** DateTime custom scalar type */
  DateTime: string;
  /** Long (64-bit) custom scalar type */
  Long: number;
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

export type CatalogStatistics = {
  readonly __typename?: 'CatalogStatistics';
  readonly totalSeriesCount?: Maybe<Scalars['Int']>;
  readonly totalEpisodeCount?: Maybe<Scalars['Int']>;
  readonly allFiles?: Maybe<ReadonlyArray<Maybe<File>>>;
  readonly totalFileSize?: Maybe<Scalars['Long']>;
  readonly totalDuration?: Maybe<Scalars['Int']>;
};

export type Codec = {
  readonly __typename?: 'Codec';
  readonly codec?: Maybe<Scalars['String']>;
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
  readonly previous?: Maybe<Scalars['String']>;
  readonly next?: Maybe<Scalars['String']>;
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
  readonly fileSize?: Maybe<Scalars['Long']>;
  readonly duration?: Maybe<Scalars['Int']>;
  readonly resolutionHeight?: Maybe<Scalars['Int']>;
  readonly resolutionWidth?: Maybe<Scalars['Int']>;
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
  readonly fileSize?: Maybe<Scalars['Long']>;
  readonly duration?: Maybe<Scalars['Int']>;
  readonly resolutionHeight?: Maybe<Scalars['Int']>;
  readonly resolutionWidth?: Maybe<Scalars['Int']>;
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


export type MeUpdateInput = {
  readonly username?: Maybe<Scalars['String']>;
  readonly currentPassword?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly password?: Maybe<Scalars['String']>;
  readonly passwordAttempts?: Maybe<Scalars['Int']>;
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
  data: MeUpdateInput;
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
  readonly catalogStatistics?: Maybe<CatalogStatistics>;
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

export type ReferenceSource = {
  readonly __typename?: 'ReferenceSource';
  readonly source?: Maybe<Scalars['String']>;
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

export type SearchPayload = {
  readonly __typename?: 'SearchPayload';
  readonly series: ReadonlyArray<Maybe<Series>>;
  readonly episodes: ReadonlyArray<Maybe<Episode>>;
};

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
  readonly currentStatus?: Maybe<WatchStatus>;
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

export type CatalogStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type CatalogStatisticsQuery = (
  { readonly __typename?: 'Query' }
  & { readonly catalogStatistics?: Maybe<(
    { readonly __typename?: 'CatalogStatistics' }
    & Pick<CatalogStatistics, 'totalSeriesCount' | 'totalEpisodeCount' | 'totalFileSize' | 'totalDuration'>
    & { readonly allFiles?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'File' }
      & Pick<File, 'codec' | 'source' | 'resolutionHeight' | 'resolutionWidth'>
    )>>> }
  )> }
);

export type ExportDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ExportDataQuery = (
  { readonly __typename?: 'Query' }
  & { readonly allSeries?: Maybe<ReadonlyArray<Maybe<(
    { readonly __typename?: 'Series' }
    & Pick<Series, 'title' | 'seasonNumber' | 'episodeCount' | 'status' | 'type' | 'releaseSeason' | 'releaseYear' | 'remarks'>
    & { readonly alternativeTitles?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'AlternativeTitle' }
      & Pick<AlternativeTitle, 'title'>
    )>>>, readonly episodes?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Episode' }
      & Pick<Episode, 'title' | 'episodeNumber' | 'remarks'>
      & { readonly alternativeTitles?: Maybe<ReadonlyArray<Maybe<(
        { readonly __typename?: 'AlternativeTitle' }
        & Pick<AlternativeTitle, 'title'>
      )>>>, readonly files?: Maybe<ReadonlyArray<Maybe<(
        { readonly __typename?: 'File' }
        & Pick<File, 'path' | 'fileSize' | 'checksum' | 'duration' | 'resolutionHeight' | 'resolutionWidth' | 'source' | 'codec' | 'remarks'>
      )>>> }
    )>>>, readonly prequels?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'title'>
    )>>>, readonly sequels?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'title'>
    )>>>, readonly sideStories?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'title'>
    )>>>, readonly mainStories?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'title'>
    )>>>, readonly relatedSeries?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'title'>
    )>>>, readonly relatedAlternatives?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Series' }
      & Pick<Series, 'title'>
    )>>>, readonly references?: Maybe<ReadonlyArray<Maybe<(
      { readonly __typename?: 'Reference' }
      & Pick<Reference, 'link' | 'source'>
    )>>> }
  )>>> }
);

export type EpisodeQueryVariables = Exact<{
  where: EpisodeWhereUniqueInput;
}>;


export type EpisodeQuery = (
  { readonly __typename?: 'Query' }
  & { readonly episode?: Maybe<(
    { readonly __typename?: 'Episode' }
    & Pick<Episode, 'id' | 'title' | 'episodeNumber' | 'remarks' | 'createdAt' | 'updatedAt' | 'previous' | 'next'>
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
  data: ReadonlyArray<EpisodeCreateUpdateInput> | EpisodeCreateUpdateInput;
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
    & Pick<File, 'id' | 'path' | 'duration' | 'fileSize' | 'source' | 'resolutionHeight' | 'resolutionWidth' | 'codec' | 'checksum' | 'remarks' | 'createdAt' | 'updatedAt'>
  )>>> }
);

export type FileQueryVariables = Exact<{
  where: FileWhereUniqueInput;
}>;


export type FileQuery = (
  { readonly __typename?: 'Query' }
  & { readonly file?: Maybe<(
    { readonly __typename?: 'File' }
    & Pick<File, 'id' | 'path' | 'duration' | 'fileSize' | 'source' | 'resolutionHeight' | 'resolutionWidth' | 'codec' | 'checksum' | 'remarks' | 'createdAt' | 'updatedAt'>
  )> }
);

export type FilesQueryVariables = Exact<{ [key: string]: never; }>;


export type FilesQuery = (
  { readonly __typename?: 'Query' }
  & { readonly files?: Maybe<ReadonlyArray<Maybe<(
    { readonly __typename?: 'File' }
    & Pick<File, 'id' | 'path' | 'duration' | 'fileSize' | 'source' | 'resolutionHeight' | 'resolutionWidth' | 'codec' | 'checksum' | 'remarks' | 'createdAt' | 'updatedAt'>
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

export type FileExportQueryVariables = Exact<{ [key: string]: never; }>;


export type FileExportQuery = (
  { readonly __typename?: 'Query' }
  & { readonly files?: Maybe<ReadonlyArray<Maybe<(
    { readonly __typename?: 'File' }
    & Pick<File, 'path'>
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
  data: MeUpdateInput;
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LoggedInQuery, LoggedInQueryVariables>(LoggedInDocument, options);
      }
export function useLoggedInLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LoggedInQuery, LoggedInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LoggedInQuery, LoggedInQueryVariables>(LoggedInDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MyTopTenSeriesQuery, MyTopTenSeriesQueryVariables>(MyTopTenSeriesDocument, options);
      }
export function useMyTopTenSeriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyTopTenSeriesQuery, MyTopTenSeriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MyTopTenSeriesQuery, MyTopTenSeriesQueryVariables>(MyTopTenSeriesDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MyCurrentlyWatchingQuery, MyCurrentlyWatchingQueryVariables>(MyCurrentlyWatchingDocument, options);
      }
export function useMyCurrentlyWatchingLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyCurrentlyWatchingQuery, MyCurrentlyWatchingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MyCurrentlyWatchingQuery, MyCurrentlyWatchingQueryVariables>(MyCurrentlyWatchingDocument, options);
        }
export type MyCurrentlyWatchingQueryHookResult = ReturnType<typeof useMyCurrentlyWatchingQuery>;
export type MyCurrentlyWatchingLazyQueryHookResult = ReturnType<typeof useMyCurrentlyWatchingLazyQuery>;
export type MyCurrentlyWatchingQueryResult = ApolloReactCommon.QueryResult<MyCurrentlyWatchingQuery, MyCurrentlyWatchingQueryVariables>;
export const CatalogStatisticsDocument = gql`
    query CatalogStatistics {
  catalogStatistics {
    totalSeriesCount
    totalEpisodeCount
    allFiles {
      codec
      source
      resolutionHeight
      resolutionWidth
    }
    totalFileSize
    totalDuration
  }
}
    `;

/**
 * __useCatalogStatisticsQuery__
 *
 * To run a query within a React component, call `useCatalogStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCatalogStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCatalogStatisticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCatalogStatisticsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CatalogStatisticsQuery, CatalogStatisticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CatalogStatisticsQuery, CatalogStatisticsQueryVariables>(CatalogStatisticsDocument, options);
      }
export function useCatalogStatisticsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CatalogStatisticsQuery, CatalogStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CatalogStatisticsQuery, CatalogStatisticsQueryVariables>(CatalogStatisticsDocument, options);
        }
export type CatalogStatisticsQueryHookResult = ReturnType<typeof useCatalogStatisticsQuery>;
export type CatalogStatisticsLazyQueryHookResult = ReturnType<typeof useCatalogStatisticsLazyQuery>;
export type CatalogStatisticsQueryResult = ApolloReactCommon.QueryResult<CatalogStatisticsQuery, CatalogStatisticsQueryVariables>;
export const ExportDataDocument = gql`
    query ExportData {
  allSeries {
    title
    seasonNumber
    episodeCount
    status
    type
    releaseSeason
    releaseYear
    remarks
    alternativeTitles {
      title
    }
    episodes {
      title
      episodeNumber
      remarks
      alternativeTitles {
        title
      }
      files {
        path
        fileSize
        checksum
        duration
        resolutionHeight
        resolutionWidth
        source
        codec
        remarks
      }
    }
    prequels {
      title
    }
    sequels {
      title
    }
    sideStories {
      title
    }
    mainStories {
      title
    }
    relatedSeries {
      title
    }
    relatedAlternatives {
      title
    }
    references {
      link
      source
    }
  }
}
    `;

/**
 * __useExportDataQuery__
 *
 * To run a query within a React component, call `useExportDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useExportDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ExportDataQuery, ExportDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ExportDataQuery, ExportDataQueryVariables>(ExportDataDocument, options);
      }
export function useExportDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ExportDataQuery, ExportDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ExportDataQuery, ExportDataQueryVariables>(ExportDataDocument, options);
        }
export type ExportDataQueryHookResult = ReturnType<typeof useExportDataQuery>;
export type ExportDataLazyQueryHookResult = ReturnType<typeof useExportDataLazyQuery>;
export type ExportDataQueryResult = ApolloReactCommon.QueryResult<ExportDataQuery, ExportDataQueryVariables>;
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
    previous
    next
  }
}
    `;

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
export function useEpisodeQuery(baseOptions: ApolloReactHooks.QueryHookOptions<EpisodeQuery, EpisodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<EpisodeQuery, EpisodeQueryVariables>(EpisodeDocument, options);
      }
export function useEpisodeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EpisodeQuery, EpisodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<EpisodeQuery, EpisodeQueryVariables>(EpisodeDocument, options);
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
export function useEpisodesInSeriesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<EpisodesInSeriesQuery, EpisodesInSeriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<EpisodesInSeriesQuery, EpisodesInSeriesQueryVariables>(EpisodesInSeriesDocument, options);
      }
export function useEpisodesInSeriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EpisodesInSeriesQuery, EpisodesInSeriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<EpisodesInSeriesQuery, EpisodesInSeriesQueryVariables>(EpisodesInSeriesDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateEpisodeMutation, CreateEpisodeMutationVariables>(CreateEpisodeDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<BatchCreateEpisodeMutation, BatchCreateEpisodeMutationVariables>(BatchCreateEpisodeDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateEpisodeMutation, UpdateEpisodeMutationVariables>(UpdateEpisodeDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteEpisodeMutation, DeleteEpisodeMutationVariables>(DeleteEpisodeDocument, options);
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
    resolutionHeight
    resolutionWidth
    codec
    checksum
    remarks
    createdAt
    updatedAt
  }
}
    `;

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
export function useFilesForEpisodeQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FilesForEpisodeQuery, FilesForEpisodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FilesForEpisodeQuery, FilesForEpisodeQueryVariables>(FilesForEpisodeDocument, options);
      }
export function useFilesForEpisodeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FilesForEpisodeQuery, FilesForEpisodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FilesForEpisodeQuery, FilesForEpisodeQueryVariables>(FilesForEpisodeDocument, options);
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
    resolutionHeight
    resolutionWidth
    codec
    checksum
    remarks
    createdAt
    updatedAt
  }
}
    `;

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
export function useFileQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FileQuery, FileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FileQuery, FileQueryVariables>(FileDocument, options);
      }
export function useFileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FileQuery, FileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FileQuery, FileQueryVariables>(FileDocument, options);
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
    resolutionHeight
    resolutionWidth
    codec
    checksum
    remarks
    createdAt
    updatedAt
  }
}
    `;

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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FilesQuery, FilesQueryVariables>(FilesDocument, options);
      }
export function useFilesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FilesQuery, FilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FilesQuery, FilesQueryVariables>(FilesDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SuggestedCodecsQuery, SuggestedCodecsQueryVariables>(SuggestedCodecsDocument, options);
      }
export function useSuggestedCodecsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SuggestedCodecsQuery, SuggestedCodecsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SuggestedCodecsQuery, SuggestedCodecsQueryVariables>(SuggestedCodecsDocument, options);
        }
export type SuggestedCodecsQueryHookResult = ReturnType<typeof useSuggestedCodecsQuery>;
export type SuggestedCodecsLazyQueryHookResult = ReturnType<typeof useSuggestedCodecsLazyQuery>;
export type SuggestedCodecsQueryResult = ApolloReactCommon.QueryResult<SuggestedCodecsQuery, SuggestedCodecsQueryVariables>;
export const FileExportDocument = gql`
    query FileExport {
  files {
    path
  }
}
    `;

/**
 * __useFileExportQuery__
 *
 * To run a query within a React component, call `useFileExportQuery` and pass it any options that fit your needs.
 * When your component renders, `useFileExportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFileExportQuery({
 *   variables: {
 *   },
 * });
 */
export function useFileExportQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FileExportQuery, FileExportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FileExportQuery, FileExportQueryVariables>(FileExportDocument, options);
      }
export function useFileExportLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FileExportQuery, FileExportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FileExportQuery, FileExportQueryVariables>(FileExportDocument, options);
        }
export type FileExportQueryHookResult = ReturnType<typeof useFileExportQuery>;
export type FileExportLazyQueryHookResult = ReturnType<typeof useFileExportLazyQuery>;
export type FileExportQueryResult = ApolloReactCommon.QueryResult<FileExportQuery, FileExportQueryVariables>;
export const CreateFileDocument = gql`
    mutation CreateFile($data: FileCreateUpdateInput!) {
  createFile(data: $data) {
    id
  }
}
    `;
export type CreateFileMutationFn = ApolloReactCommon.MutationFunction<CreateFileMutation, CreateFileMutationVariables>;

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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateFileMutation, CreateFileMutationVariables>(CreateFileDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateFileMutation, UpdateFileMutationVariables>(UpdateFileDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteFileMutation, DeleteFileMutationVariables>(DeleteFileDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SuggestedSourcesQuery, SuggestedSourcesQueryVariables>(SuggestedSourcesDocument, options);
      }
export function useSuggestedSourcesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SuggestedSourcesQuery, SuggestedSourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SuggestedSourcesQuery, SuggestedSourcesQueryVariables>(SuggestedSourcesDocument, options);
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
export function useQuickSearchQuery(baseOptions: ApolloReactHooks.QueryHookOptions<QuickSearchQuery, QuickSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<QuickSearchQuery, QuickSearchQueryVariables>(QuickSearchDocument, options);
      }
export function useQuickSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<QuickSearchQuery, QuickSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<QuickSearchQuery, QuickSearchQueryVariables>(QuickSearchDocument, options);
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
export function useSeriesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<SeriesQuery, SeriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SeriesQuery, SeriesQueryVariables>(SeriesDocument, options);
      }
export function useSeriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SeriesQuery, SeriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SeriesQuery, SeriesQueryVariables>(SeriesDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AllSeriesQuery, AllSeriesQueryVariables>(AllSeriesDocument, options);
      }
export function useAllSeriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllSeriesQuery, AllSeriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AllSeriesQuery, AllSeriesQueryVariables>(AllSeriesDocument, options);
        }
export type AllSeriesQueryHookResult = ReturnType<typeof useAllSeriesQuery>;
export type AllSeriesLazyQueryHookResult = ReturnType<typeof useAllSeriesLazyQuery>;
export type AllSeriesQueryResult = ApolloReactCommon.QueryResult<AllSeriesQuery, AllSeriesQueryVariables>;
export const TotalSeriesCountDocument = gql`
    query TotalSeriesCount {
  totalSeriesCount
}
    `;

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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<TotalSeriesCountQuery, TotalSeriesCountQueryVariables>(TotalSeriesCountDocument, options);
      }
export function useTotalSeriesCountLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TotalSeriesCountQuery, TotalSeriesCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<TotalSeriesCountQuery, TotalSeriesCountQueryVariables>(TotalSeriesCountDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateSeriesMutation, CreateSeriesMutationVariables>(CreateSeriesDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateSeriesMutation, UpdateSeriesMutationVariables>(UpdateSeriesDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteSeriesMutation, DeleteSeriesMutationVariables>(DeleteSeriesDocument, options);
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
export function useUserQuery(baseOptions: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const IsInitializedDocument = gql`
    query IsInitialized {
  isInitialized
}
    `;

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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<IsInitializedQuery, IsInitializedQueryVariables>(IsInitializedDocument, options);
      }
export function useIsInitializedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsInitializedQuery, IsInitializedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<IsInitializedQuery, IsInitializedQueryVariables>(IsInitializedDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateInitialUserMutation, CreateInitialUserMutationVariables>(CreateInitialUserDocument, options);
      }
export type CreateInitialUserMutationHookResult = ReturnType<typeof useCreateInitialUserMutation>;
export type CreateInitialUserMutationResult = ApolloReactCommon.MutationResult<CreateInitialUserMutation>;
export type CreateInitialUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateInitialUserMutation, CreateInitialUserMutationVariables>;
export const UpdateMeDocument = gql`
    mutation UpdateMe($data: MeUpdateInput!) {
  updateMe(data: $data) {
    id
  }
}
    `;
export type UpdateMeMutationFn = ApolloReactCommon.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;

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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
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
export function useMySeriesProgressQuery(baseOptions: ApolloReactHooks.QueryHookOptions<MySeriesProgressQuery, MySeriesProgressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MySeriesProgressQuery, MySeriesProgressQueryVariables>(MySeriesProgressDocument, options);
      }
export function useMySeriesProgressLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MySeriesProgressQuery, MySeriesProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MySeriesProgressQuery, MySeriesProgressQueryVariables>(MySeriesProgressDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MyProgressQuery, MyProgressQueryVariables>(MyProgressDocument, options);
      }
export function useMyProgressLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyProgressQuery, MyProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MyProgressQuery, MyProgressQueryVariables>(MyProgressDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateUserProgressMutation, CreateUserProgressMutationVariables>(CreateUserProgressDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateUserProgressMutation, UpdateUserProgressMutationVariables>(UpdateUserProgressDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateMyProgressMutation, UpdateMyProgressMutationVariables>(UpdateMyProgressDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteUserProgressMutation, DeleteUserProgressMutationVariables>(DeleteUserProgressDocument, options);
      }
export type DeleteUserProgressMutationHookResult = ReturnType<typeof useDeleteUserProgressMutation>;
export type DeleteUserProgressMutationResult = ApolloReactCommon.MutationResult<DeleteUserProgressMutation>;
export type DeleteUserProgressMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserProgressMutation, DeleteUserProgressMutationVariables>;