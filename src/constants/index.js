const FlightType = {
  CHEAP: 'Budget',
  BUSINESS: 'Business',
  ALL: 'All'
};

const SortOrderDirection = {
  ASC: 'asc',
  DESC: 'desc'
};

const DateTimeFormat = {
  display: 'MMMM Do YYYY, h:mm a'
};

const AsyncStatus = {
  IDLE: 'IDLE',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

export { FlightType, DateTimeFormat, AsyncStatus, SortOrderDirection };
export { default as ActionType } from './ActionType';
export { default as Label } from './Label';
