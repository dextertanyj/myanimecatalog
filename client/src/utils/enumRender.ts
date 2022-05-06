import moment from 'moment';
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
    default:
      return '';
  }
};

export const renderStatus = (status: Status): string => {
  switch (status) {
    case Status.Downloaded:
      return 'Downloaded';
    case Status.Missing:
      return 'Missing';
    case Status.Unreleased:
      return 'Not Yet Aired';
    default:
      return '';
  }
};

export const renderType = (type: Type): string => {
  switch (type) {
    case Type.Movie:
      return 'Movie';
    case Type.Musicvideo:
      return 'Music Video';
    case Type.Speciaload:
      return 'Special - OAD';
    case Type.Specialona:
      return 'Special - ONA';
    case Type.Specialova:
      return 'Special - OVA';
    case Type.Specialtv:
      return 'Special - TV';
    case Type.Seriesoad:
      return 'Series - OAD';
    case Type.Seriesona:
      return 'Series - ONA';
    case Type.Seriesova:
      return 'Series - OVA';
    case Type.Seriestv:
      return 'Series - TV';
    case Type.Bonusextra:
      return 'Bonus/Extra';
    default:
      return '';
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
    default:
      return '';
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
    default:
      return '';
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
    default:
      return '';
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
      return 'Plan To Watch';
    case WatchStatus.Watching:
      return 'Watching';
    default:
      return '';
  }
};

export const renderDuration = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  const seconds = duration - hours * 3600 - minutes * 60;
  return `${hours}:${minutes}.${seconds}`;
};

export const renderReleaseInfo = (
  season: Season | undefined | null,
  year: string | undefined | null
): string => {
  if (season && year) {
    return `${renderSeason(season)} ${moment(year).format('YYYY')}`;
  } else if (season) {
    return renderSeason(season);
  } else if (year) {
    return moment(year).format('YYYY');
  } else {
    return '⁠–';
  }
};
