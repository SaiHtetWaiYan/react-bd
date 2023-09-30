import React, { Component } from "react";
import { TypeAnimation } from "react-type-animation";

export default class Wish extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      showDiv1: true,
      showDiv2: false,
      audioRepeats: 0, // Track the number of audio repeats
    };
  }

  componentDidMount() {
    // Start audio playback
    this.audioRef.current.play();

    // Add an event listener to restart audio playback when it ends
    this.audioRef.current.addEventListener("ended", this.handleAudioEnded);

    this.timer = setTimeout(() => {
      this.setState({
        showDiv1: false,
        showDiv2: true,
      });
    }, 35000); // 35000 milliseconds = 35 seconds
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    // Remove the event listener to prevent memory leaks
    this.audioRef.current.removeEventListener("ended", this.handleAudioEnded);
  }

  // Event handler to restart audio playback
  handleAudioEnded = () => {
    const { audioRepeats } = this.state;
    if (audioRepeats < 2) {
      // If audio has not repeated 2 times, play it again
      this.audioRef.current.play();
      this.setState((prevState) => ({
        audioRepeats: prevState.audioRepeats + 1,
      }));
    }
  };
  render() {
    return (
      <>
        {this.state.showDiv1 && (
          <div
            className="hero min-h-screen fade-in"
            style={{
              backgroundImage: `url('/mna_cake.jpg')`, // Notice the url() function
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-xl">
                <TypeAnimation
                  sequence={[
                    "မွေးနေ့ကစပြီး နောင်နှစ်ပေါင်းများစွာ ပျော်ရွှင်နိုင်ပါစေ",
                    1000,
                    "ချစ်ရ ခင်ရသူတွေနဲ့လဲ အမြဲရှိနေနိုင်ပါစေ",
                    1000,
                  ]}
                  speed={20}
                  style={{ fontSize: "3em" }}
                  repeat={1}
                />
              </div>
            </div>
          </div>
        )}
        {this.state.showDiv2 && (
          <div
            className="hero min-h-screen fade-in"
            style={{
              backgroundImage: `url('/mna_cake_ai.jpg')`, // Notice the url() function
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-xl">
                <TypeAnimation
                  sequence={[
                    "この誕生日からいつも幸せでありますように。",
                    1000,
                    "いつも愛する人たちのそばにいることを願っています。",
                    1000,
                  ]}
                  speed={20}
                  style={{ fontSize: "3em" }}
                  repeat={2}
                />
              </div>
            </div>
          </div>
        )}
        <audio ref={this.audioRef} src="/bdsong_jp.mp3" />
      </>
    );
  }
}
