import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RESET, START, STOP, TimerStatuses } from './timer.actions';
import { saveAndReset } from '../shared/actions';

import { getElapsedTime, formatElapsedTime } from '../utils';

class Timer extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      description: '',
      task: ''
    };
  }
  componentDidMount () {
    // start timer
    this.timer = setInterval(this.forceUpdate.bind(this), 33);
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

  render () {
    const { baseTime, startedAt, stoppedAt, status, dispatch } = this.props;

    const elapsed = getElapsedTime(baseTime, startedAt, stoppedAt);

    const buttonEnabled = !!this.state.task || !!this.state.description;
    const buttonText = status === TimerStatuses.STARTED ? 'Stop': 'Start';

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="form-group col-xs-12">
            <pre className="text-center" style={{fontSize: '32pt'}}>
              {formatElapsedTime(elapsed)}
            </pre>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-xs-3">
            <input type="text" className="form-control" placeholder="Task"
              value={this.state.task}
              onChange={(ev) => this.setState({ task: ev.target.value })}
            />
          </div>
          <div className="form-group col-xs-9">
            <input type="text" className="form-control" placeholder="Description"
              value={this.state.description}
              onChange={(ev) => this.setState({ description: ev.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-xs-12">
            <button className="btn btn-primary btn-block"
              onClick={() => {
                if (status === TimerStatuses.STARTED) {
                  dispatch({
                    type: STOP,
                    payload: {
                      now: Date.now()
                    }
                  });
                }
                else {
                  dispatch({
                    type: START,
                    payload: {
                      baseTime: elapsed,
                      now: Date.now()
                    }
                  });
                }
              }}
            >
            {buttonText}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-xs-12">
            <button className="btn btn-success btn-block"
              disabled={!buttonEnabled}
              onClick={() => {
                dispatch(saveAndReset({
                  time: elapsed,
                  description: this.state.description,
                  task: this.state.task
                }));
                this.setState({
                  description: '',
                  task: ''
              });
              }
            }>
              Save
            </button>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-xs-12">
            <button className="btn btn-warning btn-block"
              onClick={() => {
                dispatch({ type: RESET });
                this.setState({ description: '' });
              }
            }>
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function selectState (state) {
  const { baseTime, startedAt, stoppedAt, status } = state.timer;
  return { baseTime, startedAt, stoppedAt, status }
}

export default connect(selectState)(Timer);
