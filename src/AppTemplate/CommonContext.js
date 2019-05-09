import React, {createContext, useMemo} from 'react';
import PropTypes from 'prop-types';

import useImmutableState from 'common/useImmutableState';

const CommonContext = createContext();

const CommonContextProvider = ({children}) => {
  const [avatar, setAvatar] = useImmutableState(null);

  /**
   * Our `providerValue` relies on props that are "values" (`avatar`) and props that are "functions" (`setAvatar`).
   * When the provider re-renders - it'll have the same set of "values" props but new set of "functions" props.
   * This will make all of the provider's children to unnecessary re-render.
   * In order to avoid this re-rendering we'll change our `providerValue` only when the "values" props change.
   * https://kentcdodds.com/blog/always-use-memo-your-context-value
   */
  const providerValue = useMemo(() => ({
    avatar,
    setAvatar,
  }), [
    avatar,
  ]);

  return (
    <CommonContext.Provider value={providerValue}>
      {children}
    </CommonContext.Provider>
  );
};

CommonContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export {
  CommonContext,
  CommonContextProvider,
};
