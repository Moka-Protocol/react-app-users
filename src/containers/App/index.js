import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//COMPONENTS
import Users from 'containers/Users';

function App(props) {
  const pageLoadTime = new Date().getTime();

  return (
    <React.Suspense
      fallback={
        <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          loading...
        </div>
      }
    >
      <Router>
        <Switch>
          <Route path="/:uid" render={(props) => (<Users {...props} pageLoadTime={pageLoadTime} />)} />
        </Switch>
      </Router>
    </React.Suspense>
  );
}

export default App;