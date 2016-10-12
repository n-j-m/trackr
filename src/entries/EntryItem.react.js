import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { DELETE } from './entries.actions';

import { formatElapsedTime } from '../utils';

function EntryItem (props) {
  const { id, task, description, dateFor, time, dispatch } = props;

  const date = moment(dateFor);

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
        {task}
      </td>
      <td>
        {description}
      </td>
      <td>
        {formatElapsedTime(time)}
      </td>
    </tr>
  );
}

EntryItem.propTypes = {
  description: PropTypes.string,
  dateFor: PropTypes.object,
  time: PropTypes.number
};

function mapDispatch (dispatch) {
  return {
    dispatch
  };
}

export default connect(null, mapDispatch)(EntryItem);

