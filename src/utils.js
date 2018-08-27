import ga from 'react-ga';

export const initAnalytics = (trackingId, opts = {}) =>
  ga.initialize(trackingId, opts);

export const trackPage = (page, opts = {}, trackerNames, title) => {
  ga.set({ page, ...opts });
  ga.pageview(page, trackerNames, title);
};

export const trackUser = (userId, opts = {}) => ga.set({ userId, ...opts });

export const trackEvent = (category, action, label, opts = {}) =>
  ga.event({ category, action, label, ...opts });

export function gaFunction() { return ga.ga(); }
