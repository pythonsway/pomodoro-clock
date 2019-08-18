import React from 'react';
import './Controll.css';

const Controll = (props) => (
  <div className="controll">
    <button
      id="start_stop"
      onClick={props.onStartStop}>
      {props.started ? 'Stop' : 'Start'}
    </button>
    <button id="reset" onClick={props.onReset}>Reset</button>
  </div>
)

export default Controll;