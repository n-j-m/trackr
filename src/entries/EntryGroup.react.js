import React, { Component } from 'react';
import { connect } from 'react-redux';

import { exportToCSV } from '../utils';
import EntryItem from './EntryItem.react';

class EntryGroup extends Component {
  render () {
    const { entries, dateFor } = this.props;

    const entryItems = Object.keys(entries)
      .map((key) => <EntryItem key={key} id={key} {...entries[key]} />);

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-heading text-center">
              <strong>
                {dateFor}
              </strong>
              <small className="pull-right">
                <button className="btn btn-xs btn-default"
                  onClick={() => exportToCSV(entries)}>Export</button>
              </small>
            </div>
            <div className="panel-body">
              <table className="table table-stripped">
                <thead>
                  <tr>
                    <th></th>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {entryItems}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function selectState (state) {
  const { entries } = state;
  return { entries };
}

export default connect(selectState)(EntryGroup);
