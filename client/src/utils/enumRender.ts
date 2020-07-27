import {
  Role,
  Season,
  Source,
  Status,
  Type,
  WatchStatus,
} from '../gql/documents';

export const renderRole = (role: Role): string => {
  switch (role) {
    case Role.Admin:
      return 'Admin';
    case Role.Readonly:
      return 'Read Only';
    case Role.Write:
      return 'Read & Write';
  }
};

export const renderStatus = (status: Status): string => {
  switch (status) {
    case Status.Downloaded:
      return 'Downloaded';
    case Status.Missing:
      return 'Missing';
    case Status.Unreleased:
      return 'Unreleased';
  }
};

export const renderType = (type: Type): string => {
  switch (type) {
    case Type.Movie:
      return 'Movie';
    case Type.Musicvideo:
      return 'Music Video';
    case Type.Ova:
      return 'OVA';
    case Type.Series:
      return 'TV Series';
    case Type.Special:
      return 'Special';
  }
};

export const renderSeason = (season: Season): string => {
  switch (season) {
    case Season.Winter:
      return 'Winter';
    case Season.Fall:
      return 'Fall';
    case Season.Summer:
      return 'Summer';
    case Season.Spring:
      return 'Spring';
  }
};

export const renderSeasonInfo = (season: Season): string => {
  switch (season) {
    case Season.Winter:
      return 'Winter (Dec - Feb)';
    case Season.Fall:
      return 'Fall (Sept - Nov)';
    case Season.Summer:
      return 'Summer (Jun - Aug)';
    case Season.Spring:
      return 'Spring (Mar - May)';
  }
};

export const renderSource = (source: Source): string => {
  switch (source) {
    case Source.Bluray:
      return 'Blu-ray';
    case Source.Cd:
      return 'CD';
    case Source.Dvd:
      return 'DVD';
    case Source.Tv:
      return 'TV';
    case Source.Web:
      return 'Web';
  }
};

export const renderWatchStatus = (watchStatus: WatchStatus): string => {
  switch (watchStatus) {
    case WatchStatus.Completed:
      return 'Completed';
    case WatchStatus.Dropped:
      return 'Dropped';
    case WatchStatus.Onhold:
      return 'On-Hold';
    case WatchStatus.Pending:
      return 'Plan to Watch';
    case WatchStatus.Watching:
      return 'Watching';
  }
};

export const renderDuration = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  const seconds = duration - hours * 3600 - minutes * 60;
  return `${hours}:${minutes}.${seconds}`;
};
