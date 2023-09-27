import React, { Component } from "react";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 10, // Set the initial countdown time (in seconds).
      audioPlaying: false, // Track whether the audio is playing.
    };
    this.audioRef = React.createRef();
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      const { countdown } = this.state;
      if (countdown === 0) {
        clearInterval(this.countdownInterval);
        this.playAudio();
      } else {
        this.setState({ countdown: countdown - 1 });
      }
    }, 1000); // Countdown timer updates every second (1000 milliseconds).
  }

  playAudio() {
    if (this.audioRef.current) {
      this.audioRef.current.play().then(() => {
        this.setState({ audioPlaying: true });
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.countdown > 0 && (
          <p>Countdown: {this.state.countdown} seconds</p>
        )}

        {!this.state.audioPlaying && (
          <button onClick={() => this.startCountdown()}>Start Countdown</button>
        )}

        <audio ref={this.audioRef} controls>
          <source src="/bdsong.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

export default AudioPlayer;
