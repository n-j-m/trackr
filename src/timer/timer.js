import { RESET, START, STOP, TimerStatuses } from './timer.actions';
import { CLEAR_ALL_DATA } from '../shared/actions';

const initialTimerState = {
  status: TimerStatuses.STOPPED,
  startedAt: undefined,
  stoppedAt: undefined,
  baseTime: undefined
};

export function timer (state = initialTimerState, action) {
  switch (action.type) {
    case START:
      return {
        ...state,
        baseTime: action.payload.baseTime,
        startedAt: action.payload.now,
        stoppedAt: undefined,
        status: TimerStatuses.STARTED
      };
    case STOP:
      return {
        ...state,
        stoppedAt: action.payload.now,
        status: TimerStatuses.STOPPED
      };
    case RESET:
      return {
        baseTime: 0,
        startedAt: state.startedAt ? action.now : undefined,
        stoppedAt: state.stoppedAt ? action.now : undefined,
        status: TimerStatuses.STOPPED,
        description: undefined
      }
    case CLEAR_ALL_DATA:
      return Object.assign({}, initialTimerState);
    default:
      return state;
  }
}
