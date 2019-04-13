import React, {createContext} from 'react';
import PropTypes from 'prop-types';

import request from 'utils/request';

import useImmutableState from 'common/useImmutableState';

const AvatarContext = createContext();

const AvatarContextProvider = ({children}) => {
  const [searchName, setSearchNameState] = useImmutableState('');
  const [isSearchLoading, setIsSearchLoading] = useImmutableState(false);
  const [searchUsers, setSearchUsers] = useImmutableState([]);
  const [userRepos, setUserRepos] = useImmutableState([]);

  const setSearchName = (event) => {
    const {value} = event.target;
    setSearchNameState(String(value || ''));
  };

  const searchForUser = async (searchName) => {
    setIsSearchLoading(true);

    const {data: {items = []}} = await request(`https://api.github.com/search/users?q=${searchName}`);

    setSearchUsers(items);
    setUserRepos([]);
    setIsSearchLoading(false);
  };

  const loadUserRepos = async (userName) => {
    setIsSearchLoading(true);

    const {data: repos = []} = await request(`https://api.github.com/users/${userName}/repos`);

    setUserRepos(repos);
    setIsSearchLoading(false);
  };

  return (
    <AvatarContext.Provider
      value={{
        searchName,
        isSearchLoading,
        searchUsers,
        userRepos,

        setSearchName,
        searchForUser,
        loadUserRepos,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
};

AvatarContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export {
  AvatarContext,
  AvatarContextProvider,
};
