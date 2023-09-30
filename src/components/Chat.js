import React, { Component } from "react";
import Wish from "./Wish";
class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      messages: [],
      userInput: "",
      success: false,
      isFlameVisible: true,
      isAudioPlaying: true,
      isCakeVisible: true,
    };
  }

  componentDidMount() {
    this.audioRef.current.addEventListener("ended", this.handleAudioEnd);
    // Start the conversation with a greeting from the bot
    const botGreeting =
      "ဘာတွေလုပ်နေလဲ နေကောင်းတယ် မဟုတ်လား ဒီတယောက်ကို သတိရော ရသေးရဲ့လား (  သတိရတယ် ၊ သတိမရဘူးဘဲဖြေပါ ) 😐";
    this.addBotMessage(botGreeting);
  }

  sendMessage = () => {
    const { userInput } = this.state;
    if (userInput.trim() === "") return;

    // Add the user's message to the chat
    this.addUserMessage(userInput);

    // Process the user's message and get the chatbot's response
    this.processUserInput(userInput);
  };

  addBotMessage = (messageText) => {
    const { messages } = this.state;
    const newMessages = [...messages, { text: messageText, type: "Sai Htet" }];
    this.setState({ messages: newMessages });
  };

  addUserMessage = (messageText) => {
    const { messages } = this.state;
    const newMessages = [
      ...messages,
      { text: messageText, type: "Chee Htoke" },
    ];
    this.setState({ messages: newMessages, userInput: "" });
  };

  processUserInput = (userInput) => {
    // Trim the user's input and convert it to lowercase for case-insensitive comparison
    const trimmedInput = userInput.trim().toLowerCase();

    // Define bot responses based on user input
    let chatbotResponse = "";

    // Check if the user's input is a number
    const userInputNumber = parseInt(trimmedInput);

    if (!isNaN(userInputNumber)) {
      // User input is a number
      if (userInputNumber === 1113) {
        const imageURL = "/hehe.jpg";
        chatbotResponse = (
          <div>
            <img src={imageURL} alt="" />
            <br></br>
            <p>မှတ်မိလိုတော်သေးတာပေါ့ 🙂</p>
          </div>
        );

        setTimeout(() => {
          this.setState({ success: true });
          this.audioRef.current.play();
          this.setState({ isFlameVisible: true });
        }, 4000);
      } else {
        chatbotResponse = "မမှတ်မိတော့ဘူးပေါ့လေ ရပါတယ် 🙂";
        this.setState({ isFlameVisible: false });
      }
    } else {
      // User input is not a number
      if (trimmedInput.includes("သတိရတယ်")) {
        chatbotResponse =
          "ပီးတာဘဲ 😏 မင်း နဲ့ ဒီတယောက်ဘဲ သိတဲ့ ဂဏန်းလေးလုံး မှတ်မိလား မှတ်မိရင် ရိုက်ပီး send လိုက်";
      } else if (trimmedInput.includes("သတိမရဘူး")) {
        chatbotResponse = "သတိမရဘူး ပြောရင် ဆက်မ run အောင်ရေးထားတယ် 😏";
      } else if (trimmedInput.includes("ရတယ်")) {
        chatbotResponse = "ရှေ့က သတိထည့်ပီးပြန်ရေး မဟုတ်ရင် ဆက်မ run ဘူး 😌";
      } else {
        // Default response for non-numeric user input
        chatbotResponse =
          "ဘာတွေရေးနေလဲ နားမလည်ဘူး dataset တွေအများကြီး ထည့်ထားတာ မဟုတ်ဘူး 😮‍💨";
      }
    }

    setTimeout(() => {
      this.addBotMessage(chatbotResponse);
    }, 1000); // Simulating a slight delay for a more natural conversation
  };

  handleAudioEnd = () => {
    setTimeout(() => {
      this.setState({ isAudioPlaying: false });
      this.setState({ isFlameVisible: false });
    }, 2000);

    setTimeout(() => {
      this.setState({ isCakeVisible: false });
    }, 5000);
  };

  componentWillUnmount() {
    this.audioRef.current.removeEventListener("ended", this.handleAudioEnd);
  }

  render() {
    const { success, isCakeVisible, isFlameVisible, isAudioPlaying } =
      this.state;

    return (
      <>
        {success ? (
          <>
            {isCakeVisible ? (
              <div>
                <div className={`${isAudioPlaying ? "" : "hidden"}`}>
                  <div className="firework"></div>
                  <div className="firework"></div>
                  <div className="firework"></div>
                  <h1 className="cake-title animate-charcter ">
                    Happy Birthday!
                  </h1>
                </div>

                <div className="cake centerme">
                  <div className="plate"></div>
                  <div className="layer layer-bottom"></div>
                  <div className="layer layer-middle"></div>
                  <div className="layer layer-top"></div>
                  <div className="icing"></div>
                  <div className="drip drip1"></div>
                  <div className="drip drip2"></div>
                  <div className="drip drip3"></div>
                  <div className="candle">
                    <div
                      className={`flame ${isFlameVisible ? "" : "hidden"}`}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <Wish></Wish>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-screen bounce-in">
            <div className="card bg-base-100 shadow-xl ">
              <div
                className="card-body"
                style={{ maxHeight: "90vh", overflowY: "auto" }}
              >
                {this.state.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`chat ${
                      message.type === "Sai Htet" ? "chat-start" : "chat-end"
                    }`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={
                            message.type === "Sai Htet"
                              ? "/shwy.jpg"
                              : "mna.jpeg"
                          }
                          alt={
                            message.type === "Sai Htet"
                              ? "Bot Avatar"
                              : "User Avatar"
                          }
                        />
                      </div>
                    </div>
                    <div className="chat-header pb-1">{message.type}</div>
                    <div className="chat-bubble">{message.text}</div>
                  </div>
                ))}

                <div className="pt-4 flex">
                  <input
                    type="text"
                    value={this.state.userInput}
                    onChange={(e) =>
                      this.setState({ userInput: e.target.value })
                    }
                    placeholder="Type your response..."
                    className="input w-3/4 border-gray-300"
                  />
                  <div className="ml-4">
                    <button
                      onClick={this.sendMessage}
                      className="btn btn-primary"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <audio ref={this.audioRef} src="/bdsong.mp3" />
      </>
    );
  }
}

export default Chatbot;
