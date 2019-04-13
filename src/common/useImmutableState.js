import {useState} from 'react';
import {fromJS} from 'immutable';

const checkPrimitive = (variable) => !variable || typeof variable !== 'object';

const useImmutableState = (initialState) => {
  const [isPrimitive, setIsPrimitive] = useState(checkPrimitive(initialState));
  const [immutableState, setState] = useState(fromJS(initialState));

  const setImmutableState = (newState) => {
    setIsPrimitive(checkPrimitive(newState));
    setState(fromJS(newState));
  };

  return [
    isPrimitive ? immutableState : immutableState.toJS(),
    setImmutableState,
  ];
};

export default useImmutableState;
