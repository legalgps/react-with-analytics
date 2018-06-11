import React from 'react';

import ga from 'react-ga';
import PropTypes from 'prop-types';

const dev = process.env.NODE_ENV !== 'production';

export default Component =>
  class WithAnalytics extends React.Component {
    static propTypes = {
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
      }).isRequired
    };

    componentDidMount() {
      const page = this.props.location.pathname;
      this.trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;
      if (currentPage !== nextPage) this.trackPage(nextPage);
    }

    trackPage = page => {
      if (!dev) {
        ga.set({ page });
        ga.pageview(page);
      }
    };

    render() {
      return <Component {...this.props} />;
    }
  };
