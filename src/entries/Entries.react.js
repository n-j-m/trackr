import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import EntryItem from './EntryItem.react';

class Entries extends Component {
  render () {
    const { entries } = this.props;

    const entryItems = Object.keys(entries).map(id => <EntryItem key={id} id={id} {...entries[id]} />);

    const now = moment();

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <strong>
                  {now.format("M/DD/YYYY")}
                </strong>
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
      </div>
    );
  }
}

function selectState (state) {
  const { entries } = state;
  return { entries };
}

export default connect(selectState)(Entries);
