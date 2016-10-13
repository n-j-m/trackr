import { id } from '../utils.js';
import { EDIT, SAVE, DELETE, CLEAR_ENTRIES } from './entries.actions';
import { CLEAR_ALL_DATA } from '../shared/actions';

const initialEntriesState = {};

export function entries (state = initialEntriesState, action) {
  switch (action.type) {
    case SAVE:
      return {
        ...state,
        [id()]: {
          description: action.payload.description,
          task: action.payload.task,
          dateFor: action.payload.dateFor,
          time: action.payload.time
        }
      };
    case EDIT:
      return Object.keys(state).reduce((newState, key) => {
        if (key === action.payload.id) {
          newState[key] = Object.assign({}, state[key], action.payload.entry)
        }
        else {
          newState[key] = state[key];
        }
        return newState;
      }, {});
    case DELETE:
      return Object.keys(state).reduce((newState, key) => {
        if (key !== action.payload.id) {
          newState[key] = Object.assign({}, state[key]);
        }
        return newState;
      }, {});
    case CLEAR_ENTRIES:
    case CLEAR_ALL_DATA:
      return Object.assign({}, initialEntriesState);
    default:
      return state;
  }
}
