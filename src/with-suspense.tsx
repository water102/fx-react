import React from 'react';
import { Loading } from './components';

export const withSuspense = (Component: React.FC<any>) => (props: any) => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Component {...props} />
    </React.Suspense>
  );
};
