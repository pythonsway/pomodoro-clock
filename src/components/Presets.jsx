import React from 'react';
import './Presets.css';

const Presets = (props) => {
  const buttonClass = props.started ? 'disable' : '';
  const labels = ['break', 'session'];
  return (
    <div className="presets">
      {labels.map((label) => (
        <div
          key={label}
          className="presets-section">
          <label
            id={`${label}-label`}>
            {`${label} Length`}
          </label>
          <div>
            <button
              className={buttonClass}
              id={`${label}-decrement`}
              onClick={(e) => props.onPresets(e, label)}>
              -
            </button>
            <span
              id={`${label}-length`}>
              {(label === 'break') ? props.breakLength : props.sessionLength}
            </span>
            <button
              className={buttonClass}
              id={`${label}-increment`}
              onClick={(e) => props.onPresets(e, label)}>
              +
            </button>
          </div>
        </div>
      ))
      }
    </div>
  )
}

export default Presets;