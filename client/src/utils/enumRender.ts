import { Role, Season, Status, Type } from '../gql/documents';

export const renderRole = (role: Role): string => {
  switch (role) {
    case Role.Admin:
      return 'Admin';
    case Role.Readonly: 
      return 'Read Only';
    case Role.Write:
      return 'Write'
  }
}

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
