import { SAVE } from '../entries/entries.actions';
import { RESET } from '../timer/timer.actions';

export function saveAndReset (payload) {
  return (dispatch) => {
    dispatch({ type: SAVE, payload });
    dispatch({ type: RESET });
  };
}

export const CLEAR_ALL_DATA = 'CLEAR_ALL_DATA';
