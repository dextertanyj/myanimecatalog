import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AlternativeTitleName = {
  readonly __typename?: 'AlternativeTitleName';
  readonly id: Scalars['String'];
  readonly titleName: Scalars['String'];
};

export type AlternativeTitleNameCreateUpdateInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly titleName?: Maybe<Scalars['String']>;
  readonly episode?: Maybe<EpisodeRelationInput>;
  readonly series?: Maybe<SeriesRelationInput>;
};

export type AlternativeTitleNameRelationInput = {
  readonly connect?: Maybe<ReadonlyArray<Maybe<AlternativeTitleNameWhereUniqueInput>>>;
  readonly create?: Maybe<ReadonlyArray<Maybe<AlternativeTitleNameCreateUpdateInput>>>;
  readonly disconnect?: Maybe<ReadonlyArray<Maybe<AlternativeTitleNameWhereUniqueInput>>>;
  readonly update?: Maybe<ReadonlyArray<Maybe<AlternativeTitleNameUpdateWhereUniqueInput>>>;
};

export type AlternativeTitleNameUpdateWhereUniqueInput = {
  readonly where?: Maybe<AlternativeTitleNameWhereUniqueInput>;
  readonly data?: Maybe<AlternativeTitleNameCreateUpdateInput>;
};

export type AlternativeTitleNameWhereUniqueInput = {
  readonly id: Scalars['String'];
};

export type AuthPayload = {
  readonly __typename?: 'AuthPayload';
  readonly token: Scalars['String'];
  readonly user: User;
};


export type Episode = {
  readonly __typename?: 'Episode';
  readonly id: Scalars['String'];
  readonly title: Scalars['String'];
  readonly alternativeTitle?: Maybe<ReadonlyArray<Maybe<AlternativeTitleName>>>;
  readonly series: Series;
  readonly episodeNumber: Scalars['Int'];
  readonly files?: Maybe<ReadonlyArray<Maybe<File>>>;
  readonly remarks?: Maybe<Scalars['String']>;
};

export type EpisodeCreateUpdateInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly alternativeTitle?: Maybe<AlternativeTitleNameRelationInput>;
  readonly series?: Maybe<SeriesRelationInput>;
  readonly episodeNumber?: Maybe<Scalars['Int']>;
  readonly files?: Maybe<FileRelationInput>;
  readonly remarks?: Maybe<Scalars['String']>;
};

export type EpisodeManyRelationInput = {
  readonly create?: Maybe<ReadonlyArray<Maybe<EpisodeCreateUpdateInput>>>;
  readonly connect?: Maybe<ReadonlyArray<Maybe<EpisodeWhereUniqueInput>>>;
  readonly disconnect?: Maybe<ReadonlyArray<Maybe<EpisodeWhereUniqueInput>>>;
  readonly delete?: Maybe<ReadonlyArray<Maybe<EpisodeWhereUniqueInput>>>;
};

export type EpisodeRelationInput = {
  readonly create?: Maybe<EpisodeCreateUpdateInput>;
  readonly connect?: Maybe<EpisodeWhereUniqueInput>;
  readonly disconnect?: Maybe<EpisodeWhereUniqueInput>;
};

export type EpisodeWhereUniqueInput = {
  readonly id: Scalars['String'];
};

export type File = {
  readonly __typename?: 'File';
  readonly id: Scalars['String'];
  readonly path: Scalars['String'];
  readonly checksum: Scalars['String'];
  readonly fileSize: Scalars['Int'];
  readonly duration: Scalars['String'];
  readonly resolution: Scalars['String'];
  readonly source: Source;
  readonly codec: Scalars['String'];
  readonly remarks?: Maybe<Scalars['String']>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly episode: Episode;
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
  readonly connect?: Maybe<ReadonlyArray<Maybe<FileWhereUniqueInput>>>;
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
  readonly id: Scalars['String'];
  readonly link: Scalars['String'];
  readonly source: Scalars['String'];
};

export type ReferenceCreateUpdateInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly link?: Maybe<Scalars['String']>;
  readonly source?: Maybe<Scalars['String']>;
  readonly series?: Maybe<SeriesRelationInput>;
};

export type ReferenceRelationInput = {
  readonly create?: Maybe<ReadonlyArray<Maybe<ReferenceCreateUpdateInput>>>;
  readonly connect?: Maybe<ReadonlyArray<Maybe<ReferenceWhereUniqueInput>>>;
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
  readonly name?: Maybe<Scalars['String']>;
  readonly alternativeName?: Maybe<ReadonlyArray<Maybe<AlternativeTitleName>>>;
  readonly episodes?: Maybe<ReadonlyArray<Maybe<Episode>>>;
  readonly status?: Maybe<Status>;
  readonly releaseSeason?: Maybe<Scalars['String']>;
  readonly releaseYear?: Maybe<Scalars['DateTime']>;
  readonly remarks?: Maybe<Scalars['String']>;
  readonly prequel?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly sequel?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly sideStory?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly mainStory?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly related?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly relatedAlternative?: Maybe<ReadonlyArray<Maybe<Series>>>;
  readonly progress?: Maybe<UserProgress>;
  readonly progresses?: Maybe<ReadonlyArray<Maybe<UserProgress>>>;
  readonly references?: Maybe<ReadonlyArray<Maybe<Reference>>>;
};

export type SeriesCreateUpdateInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly alternativeName?: Maybe<AlternativeTitleNameRelationInput>;
  readonly episodes?: Maybe<EpisodeManyRelationInput>;
  readonly status?: Maybe<Status>;
  readonly releaseSeason?: Maybe<Scalars['String']>;
  readonly releaseYear?: Maybe<Scalars['DateTime']>;
  readonly remarks?: Maybe<Scalars['String']>;
  readonly prequel?: Maybe<SeriesManyRelationInput>;
  readonly sequel?: Maybe<SeriesManyRelationInput>;
  readonly sideStory?: Maybe<SeriesManyRelationInput>;
  readonly mainStory?: Maybe<SeriesManyRelationInput>;
  readonly related?: Maybe<SeriesManyRelationInput>;
  readonly relatedAlternative?: Maybe<SeriesManyRelationInput>;
  readonly progress?: Maybe<UserProgressRelationInput>;
  readonly reference?: Maybe<ReferenceRelationInput>;
};

export type SeriesManyRelationInput = {
  readonly create?: Maybe<ReadonlyArray<Maybe<SeriesCreateUpdateInput>>>;
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
  readonly id: Scalars['String'];
  readonly username: Scalars['String'];
  readonly name: Scalars['String'];
  readonly password: Scalars['String'];
  readonly passwordAttempts: Scalars['Int'];
  readonly role: Role;
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
  readonly id: Scalars['String'];
  readonly series: Series;
  readonly user: User;
  readonly status: WatchStatus;
  readonly completed?: Maybe<Scalars['Int']>;
  readonly overall?: Maybe<Scalars['Int']>;
  readonly execution?: Maybe<Scalars['Int']>;
  readonly story?: Maybe<Scalars['Int']>;
  readonly sound?: Maybe<Scalars['Int']>;
  readonly art?: Maybe<Scalars['Int']>;
  readonly character?: Maybe<Scalars['Int']>;
  readonly appeal?: Maybe<Scalars['Int']>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
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
};

export type UserProgressRelationInput = {
  readonly create?: Maybe<ReadonlyArray<Maybe<UserProgressCreateUpdateInput>>>;
  readonly connect?: Maybe<ReadonlyArray<Maybe<UserProgressWhereUniqueInput>>>;
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
  readonly create?: Maybe<UserCreateUpdateInput>;
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


export const LoggedIn = gql`
    query LoggedIn {
  loggedIn {
    id
    username
    role
  }
}
    `;
export const Login = gql`
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
export const User = gql`
    query User($where: UserWhereUniqueInput!) {
  user(where: $where) {
    id
    username
    name
  }
}
    `;
export const Users = gql`
    query Users {
  users {
    id
  }
}
    `;
export const UserCount = gql`
    query UserCount {
  userCount
}
    `;
export const CreateUser = gql`
    mutation CreateUser($data: UserCreateUpdateInput!) {
  createUser(data: $data) {
    id
  }
}
    `;