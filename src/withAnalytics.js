import React from 'react';

import ga from 'react-ga';
import PropTypes from 'prop-types';

import { trackPage } from './utils';

export default Component =>
  class WithAnalytics extends React.Component {
    static propTypes = {
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
      }).isRequired
    };

    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;
      if (currentPage !== nextPage) trackPage(nextPage);
    }

    render() {
      return <Component {...this.props} />;
    }
  };
