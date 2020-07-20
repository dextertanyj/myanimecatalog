import { Season, Status, Type } from '../gql/documents';

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
