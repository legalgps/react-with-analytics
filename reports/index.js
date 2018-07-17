import React from 'react';

// https://developers.google.com/analytics/devguides/reporting/core/v4/quickstart/web-js
const CLIENT_ID = 'CLIENT_ID';

// https://developers.google.com/analytics/devguides/reporting/core/v3/#user_reports
const VIEW_ID = 'VIEW_ID';

const START_DATE = '2018-07-01';

export default class Reports extends React.PureComponent {
  async componentDidMount() {
    try {
      await this.load();
      await this.auth();

      // pages
      const views = await this.getPageViews('/coming-soon');

      // events
      const occurrences = await this.getEventOccurrences(
        'Editing',
        'Deleted Component',
        'Game Widget'
      );

      console.log(views, occurrences);
    } catch (err) {
      console.error(err);
    }
  }

  getReport = (dimensions, metrics, dimensionFilterClauses) =>
    new Promise((res, rej) =>
      window.gapi.client
        .request({
          path: '/v4/reports:batchGet',
          root: 'https://analyticsreporting.googleapis.com',
          method: 'POST',
          body: {
            reportRequests: [
              {
                viewId: VIEW_ID,
                dimensions,
                metrics,
                dimensionFilterClauses,
                dateRanges: [{ startDate: START_DATE, endDate: 'today' }]
              }
            ]
          }
        })
        .then(res, rej)
    );

  getPageViews = path =>
    this.getReport(
      [{ name: 'ga:pagePath' }],
      [{ expression: 'ga:pageviews' }],
      [
        {
          filters: [
            {
              operator: 'EXACT',
              dimensionName: 'ga:pagePath',
              expressions: [path]
            }
          ]
        }
      ]
    ).then(report =>
      parseInt(report.result.reports[0].data.rows[0].metrics[0].values[0], 10)
    );

  getEventOccurrences = (category, action, label) =>
    this.getReport(
      [
        { name: 'ga:eventCategory' },
        { name: 'ga:eventAction' },
        { name: 'ga:eventLabel' }
      ],
      [{ expression: 'ga:totalEvents' }],
      [
        {
          filters: [
            {
              operator: 'EXACT',
              dimensionName: 'ga:eventCategory',
              expressions: [category]
            },
            {
              operator: 'EXACT',
              dimensionName: 'ga:eventAction',
              expressions: [action]
            },
            {
              operator: 'EXACT',
              dimensionName: 'ga:eventLabel',
              expressions: [label]
            }
          ]
        }
      ]
    ).then(report =>
      parseInt(report.result.reports[0].data.totals[0].values[0], 10)
    );

  load = () =>
    new Promise((res, rej) => {
      const script = document.createElement('script');

      script.src = 'https://apis.google.com/js/client:platform.js';

      script.addEventListener('load', res);
      script.addEventListener('error', rej);

      document.body.appendChild(script);
    });

  auth = () =>
    new Promise((res, rej) => {
      const client = document.createElement('meta');

      client.name = 'google-signin-client_id';
      client.content = CLIENT_ID;

      const scope = document.createElement('meta');

      scope.name = 'google-signin-scope';
      scope.content = 'https://www.googleapis.com/auth/analytics.readonly';

      document.head.appendChild(client);
      document.head.appendChild(scope);

      window.gapi.signin2.render('signin2', {
        onsuccess: res,
        onfailure: rej
      });
    });

  render() {
    return <div id="signin2" />;
  }
}

// TODO: move to server https://github.com/google/google-api-nodejs-client/blob/master/samples/analyticsReporting/batchGet.js
