import React, { Suspense } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';
import ErrorBoundary from '@/components/ErrorBoundary';
import NotFound from '@/pages/NotFound';

import Home from '@/pages/Home';

const Routes = (): React.ReactElement => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spin />}>
        <BrowserRouter basename='/'>
          <Switch>
            <Route path='/' component={Home} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routes;
