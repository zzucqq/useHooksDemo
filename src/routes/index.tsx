import React, { Suspense } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';
import ErrorBoundary from '@/components/ErrorBoundary';
import NotFound from '@/pages/NotFound';

import UseReducerDm from '@/pages/UseContextDm';

const Routes = (): React.ReactElement => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spin />}>
        <BrowserRouter basename='/'>
          <Switch>
            <Route path='/' component={UseReducerDm} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routes;
