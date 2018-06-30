import ga from 'react-ga';

const dev = process.env.NODE_ENV !== 'production';

export const initAnalytics = (trackingId, opts = {}) =>
  !dev && ga.initialize(trackingId, opts);

export const trackPage = (page, opts = {}, trackerNames, title) => {
  if (!dev) {
    ga.set({ page, ...opts });
    ga.pageview(page, trackerNames, title);
  }
};

export const trackUser = (userId, opts = {}) =>
  !dev && ga.set({ userId, ...opts });

export const trackEvent = (category, action, label, opts = {}) =>
  !dev && ga.event({ category, action, label, ...opts });
