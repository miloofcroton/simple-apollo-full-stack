import React from 'react';

export const FallbackComp = LoadingComponent => Component => {
  return function LoadingFallbackComponent(props) {
    if (props.loading) return (
      <LoadingComponent {...props} />
    );

    return <Component {...props} />;
  };
};

export const FallbackFunctional = LoadingComponent => Component => {
  return function LoadingFallbackComponent(props) {
    if (props.loading) {
      return LoadingComponent(props);
    }

    return Component(props);
  };
};
