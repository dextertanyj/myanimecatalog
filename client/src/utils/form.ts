import { Season } from '../gql/documents';

export const calculateOverall = (
  execution: number[] | number | undefined | null,
  story: number[] | number | undefined | null,
  sound: number[] | number | undefined | null,
  art: number[] | number | undefined | null,
  character: number[] | number | undefined | null,
  appeal: number[] | number | undefined | null
): number | undefined | null => {
  if (
    (execution === undefined || execution === null) &&
    (story === undefined || story === null) &&
    (sound === undefined || sound === null) &&
    (art === undefined || art === null) &&
    (character === undefined || character === null) &&
    (appeal === undefined || appeal === null)
  ) {
    return null;
  } else {
    return Math.round(
      (((execution as number) || 0) +
        ((story as number) || 0) +
        ((sound as number) || 0) +
        ((art as number) || 0) +
        ((character as number) || 0) +
        ((appeal as number) || 0)) /
        6
    );
  }
};

export function arrayOrUndefined<T>(
  array: T[] | null | undefined
): T[] | undefined {
  if (Array.isArray(array) && array.length > 0) {
    return array;
  } else {
    return undefined;
  }
}

export const convertDuration = (
  duration: number | undefined | null
): [number | undefined, number | undefined, number | undefined] => {
  if (!duration) {
    return [undefined, undefined, undefined];
  }
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  const seconds = duration - hours * 3600 - minutes * 60;
  return [hours, minutes, seconds];
};

export const numberOrUndefined = (
  duration: number | undefined | null | boolean
): number | undefined => {
  if (!!duration && duration !== true) {
    return duration;
  } else if (duration === 0) {
    return 0;
  } else {
    return undefined;
  }
};

export function isNumberOrElse<T>(
  is: number | undefined | null | boolean,
  other: T
): number | T {
  if (!!is && is !== true) {
    return is;
  } else if (is === 0) {
    return 0;
  } else {
    return other;
  }
}

export const seasonComparator = (season1: Season, season2: Season): number => {
  const seasonOrder = [
    Season.Winter,
    Season.Spring,
    Season.Summer,
    Season.Fall,
  ];
  return seasonOrder.indexOf(season1) - seasonOrder.indexOf(season2);
};
