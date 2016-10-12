import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import EntryGroup from './EntryGroup.react';

const entriesByDate = (entries) =>
  Object.keys(entries).reduce((groups, key) => {
    const dateFor = moment(Number(entries[key]['dateFor'])).format('MM/DD/YYYY');
    if (!groups[dateFor]) {
      groups[dateFor] = {};
    }
    groups[dateFor][key] = entries[key]
    return groups;
  }, {});

class Entries extends Component {
  render () {
    const { entries } = this.props;

    const groupedEntries = entriesByDate(entries);

    const entryGroups = Object.keys(groupedEntries)
      .map((dateFor, i) => {
        const entryGroup = groupedEntries[dateFor];
        return <EntryGroup key={i} dateFor={dateFor} entries={entryGroup} />
      });

    return (
      <div className="container-fluid">
        {entryGroups}
      </div>
    );
  }
}

function selectState (state) {
  const { entries } = state;
  return { entries };
}

export default connect(selectState)(Entries);
