import React, { useEffect } from 'react';
import './Time.css';

const formatTime = (timeLeft) => {
  let minute = Math.floor(timeLeft / 60);
  let second = timeLeft - (60 * minute);
  if (minute < 10) (minute = '0' + minute)
  if (second < 10) (second = '0' + second)

  return `${minute}:${second}`
}

const Time = (props) => {
  // Similar to componentDidMount():
  useEffect(() => {
    document.title = `${props.timeLabel} ${formatTime(props.timeLeft)} - Pomodoro Clock`;
  });

  return (<div className="time">
    <div className="time-content">
      <label id="timer-label">{`"${props.timeLabel}"`}</label>
      <span id="time-left">{formatTime(props.timeLeft)}</span>
    </div>
  </div>
  );
}

export default Time;