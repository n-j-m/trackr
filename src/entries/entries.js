import { id } from '../utils.js';
import { SAVE, DELETE } from './entries.actions';

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
    case DELETE:
      return Object.keys(state).reduce((newState, key) => {
        if (key !== action.payload.id) {
          newState[key] = Object.assign({}, state[key]);
        }
        return newState;
      }, {});
    default:
      return state;
  }
}
