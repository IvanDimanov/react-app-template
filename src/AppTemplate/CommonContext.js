import React, {createContext} from 'react';
import PropTypes from 'prop-types';

import useImmutableState from 'common/useImmutableState';

const CommonContext = createContext();

const CommonContextProvider = ({children}) => {
  const [avatar, setAvatar] = useImmutableState(null);

  return (
    <CommonContext.Provider
      value={{
        avatar,
        setAvatar,
      }}
    >
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
