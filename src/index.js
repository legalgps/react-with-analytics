import withAnalytics from './withAnalytics';

import { initAnalytics, trackPage, trackUser, trackEvent, gaFunction } from './utils';

export {
  withAnalytics as default,
  initAnalytics,
  trackPage,
  trackUser,
  trackEvent,
  gaFunction as ga
};
