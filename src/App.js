import React from 'react';
import Presets from './components/Presets';
import Time from './components/Time';
import Controll from './components/Controll';
import './App.css';
import alarm from './media/alarm.mp3';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeLabel: 'Session',
      timeLeft: 25 * 60,
      started: false,
      timerInterval: null
    }
    this.audioBeep = React.createRef();
  }

  onPresets = (e, label) => {
    const operator = e.target.textContent;
    if (label === 'break' && this.state.breakLength > 1 && this.state.breakLength < 60 && !this.state.started) {
      this.setState({
        breakLength: (operator === '+') ? (this.state.breakLength + 1) : (this.state.breakLength - 1)
      });
    } else if (label === 'session' && this.state.sessionLength > 1 && this.state.sessionLength < 60 && !this.state.started) {
      this.setState({
        sessionLength: (operator === '+') ? (this.state.sessionLength + 1) : (this.state.sessionLength - 1),
        timeLeft: (operator === '+') ? ((this.state.sessionLength + 1) * 60) : ((this.state.sessionLength - 1) * 60)
      });
    }
  }

  stopBeep = () => {
    this.audioBeep.current.pause();
    this.audioBeep.current.currentTime = 0;
    this.state.timerInterval && clearInterval(this.state.timerInterval);
  }

  onReset = () => {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLabel: 'Session',
      timeLeft: 25 * 60,
      started: false,
      timerInterval: null
    });
    this.stopBeep();
  }

  //save the intervalID returned from setInterval() in 'timerInterval'
  onStartStop = () => {
    if (!this.state.started) {
      this.setState({
        started: !this.state.started,
        timerInterval: setInterval(() => {
          this.decreaseTimer();
          this.labelControl();
        }, 1000)
      })
    } else {
      this.stopBeep();
      this.setState({
        started: !this.state.started,
        timerInterval: null
      });
    }
  }

  decreaseTimer = () => {
    this.setState({
      timeLeft: this.state.timeLeft - 1
    });
  }

  labelControl = () => {
    if (this.state.timeLeft === 0) {
      this.audioBeep.current.play();
    } else if (this.state.timeLeft === -1) {
      if (this.state.timeLabel === 'Session') {
        this.setState({
          timeLabel: 'Break',
          timeLeft: this.state.breakLength * 60
        });
      } else {
        this.setState({
          timeLabel: 'Session',
          timeLeft: this.state.sessionLength * 60
        });
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="logo">
          <h1>Pomodoro Clock</h1>
        </div>
        <Presets
          breakLength={this.state.breakLength}
          sessionLength={this.state.sessionLength}
          started={this.state.started}
          onPresets={this.onPresets}
        />
        <Time
          timeLabel={this.state.timeLabel}
          timeLeft={this.state.timeLeft}
          started={this.state.started}
        />
        <Controll
          onReset={this.onReset}
          onStartStop={this.onStartStop}
          started={this.state.started}
        />
        <audio id="beep" preload="auto" src={alarm} ref={this.audioBeep}></audio>
        <footer> by <a href="https://pythonsway.it" target="_blank" rel="noopener noreferrer">Python's way</a></footer>
      </div>
    );
  }
}

