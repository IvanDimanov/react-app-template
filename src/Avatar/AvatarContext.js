import React, {createContext, useMemo} from 'react';
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

  /**
   * Our `providerValue` relies on props that are "values" (`searchName`, `isSearchLoading`, etc.)
   * and props that are "functions" (`setSearchName`, `searchForUser`, etc.).
   * When the provider re-renders - it'll have the same set of "values" props but new set of "functions" props.
   * This will make all of the provider's children to unnecessary re-render.
   * In order to avoid this re-rendering we'll change our `providerValue` only when the "values" props change.
   * https://kentcdodds.com/blog/always-use-memo-your-context-value
   */
  const providerValue = useMemo(() => ({
    searchName,
    isSearchLoading,
    searchUsers,
    userRepos,

    setSearchName,
    searchForUser,
    loadUserRepos,
  }), [
    searchName,
    isSearchLoading,
    searchUsers,
    userRepos,
  ]);

  return (
    <AvatarContext.Provider value={providerValue}>
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
