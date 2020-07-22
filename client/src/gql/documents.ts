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


export const LoggedIn = gql`
    query LoggedIn {
  loggedIn {
    id
    username
    name
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
export const Series = gql`
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
export const AllSeries = gql`
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
export const CreateSeries = gql`
    mutation CreateSeries($data: SeriesCreateUpdateInput!) {
  createSeries(data: $data) {
    id
  }
}
    `;
export const UpdateSeries = gql`
    mutation UpdateSeries($where: SeriesWhereUniqueInput!, $data: SeriesCreateUpdateInput!) {
  updateSeries(where: $where, data: $data) {
    id
  }
}
    `;
export const DeleteSeries = gql`
    mutation DeleteSeries($where: SeriesWhereUniqueInput!) {
  deleteSeries(where: $where) {
    id
  }
}
    `;
export const User = gql`
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
export const Users = gql`
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
export const CreateInitialUser = gql`
    mutation CreateInitialUser($data: UserCreateUpdateInput!) {
  createInitialUser(data: $data) {
    id
  }
}
    `;
export const UpdateMe = gql`
    mutation UpdateMe($data: UserCreateUpdateInput!) {
  updateMe(data: $data) {
    id
  }
}
    `;
export const UpdateUser = gql`
    mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserCreateUpdateInput!) {
  updateUser(where: $where, data: $data) {
    id
  }
}
    `;
export const DeleteUser = gql`
    mutation DeleteUser($where: UserWhereUniqueInput!) {
  deleteUser(where: $where) {
    id
  }
}
    `;