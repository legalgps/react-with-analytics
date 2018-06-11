# react-with-analytics

[![npm version](https://badge.fury.io/js/react-with-analytics.svg)](https://badge.fury.io/js/react-with-analytics)

## Installation

`yarn add react-ga react-with-analytics`

## Usage

### With react-router

```js
import React from 'react';

import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import withAnalytics, { initAnalytics } from 'react-with-analytics';

initAnalytics('UA-00000000-0');

const Home = () => (
  <div>
    HOME <Link to="/about">ABOUT</Link>
  </div>
);

const About = () => (
  <div>
    ABOUT <Link to="/">HOME</Link>
  </div>
);

const Root = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </Switch>
);

// you should only use `withAnalytics` once to warp your whole app
const App = withRouter(withAnalytics(Root));

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;
```

### Tracking users and events

```js
import { trackUser, trackEvent } from 'react-with-analytics';

// you can use these anywhere in your app
trackUser('@username');
trackEvent('Editing', 'Deleted Component', 'Game Widget');
```
