import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { DELETE, EDIT } from './entries.actions';

import { formatElapsedTime } from '../utils';

function EntryItem (props) {
  const { id, task, description, time, dispatch } = props;

  return (
    <tr>
      <td>
        <button type="button" className="close" aria-label="hidden"
          onClick={() => dispatch({
            type: DELETE,
            payload: { id }
          })}>
          <span aria-hidden="true">&times;</span>
        </button>
      </td>
      <td>
        <input type="text" defaultValue={task}
          className="form-control input-sm"
          onInput={(ev) => dispatch({type: EDIT, payload: {
            id,
            entry: {
              task: ev.target.value
            }
          }})} />
      </td>
      <td>
        <input type="text" defaultValue={description}
          className="form-control input-sm"
          onInput={(ev) => dispatch({type: EDIT, payload: {
            id,
            entry: {
              description: ev.target.value
            }
          }})} />
      </td>
      <td>
        <pre>{formatElapsedTime(time)}</pre>
      </td>
    </tr>
  );
}

EntryItem.propTypes = {
  description: PropTypes.string,
  time: PropTypes.number
};

function mapDispatch (dispatch) {
  return {
    dispatch
  };
}

export default connect(null, mapDispatch)(EntryItem);

