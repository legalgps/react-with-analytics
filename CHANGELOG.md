# 0.0.5

- Support reporting in dev mode. To replicate the old behavior you can simply do `initAnalytics(process.env.NODE_ENV === 'production' ? 'PRODUCTION_TRACKING_ID' : 'ANY_STRING')`.

# 0.0.4

- Expose `trackPage`.
- Make `withAnalytics` pure.

# 0.0.1

- Initial release.
