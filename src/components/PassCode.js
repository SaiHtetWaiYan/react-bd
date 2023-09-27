import React, { useState, useEffect, useRef } from "react";

const PassCode = () => {
  const predefinedPasscode = [1, 1, 1, 3];
  const audioRef = useRef(null);

  const [userCode, setUserCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isFlameVisible, setIsFlameVisible] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "").slice(0, 4);
    setUserCode(inputValue);
  };

  const handleSubmit = () => {
    if (userCode.length !== 4) {
      setErrorMessage("Please enter a 4-digit passcode.");
      setSuccess(false);
      return;
    }

    const numbers = userCode.split("").map(Number);
    const isCodeCorrect =
      JSON.stringify(numbers) === JSON.stringify(predefinedPasscode);

    setSuccess(isCodeCorrect);
    setErrorMessage(isCodeCorrect ? "" : "Passcode is incorrect!");

    if (isCodeCorrect) {
      audioRef.current.play();
      setIsFlameVisible(true);
    } else {
      setIsFlameVisible(false);
    }

    setUserCode("");
  };

  const handleFlameClick = () => {
    setIsFlameVisible(false);
  };

  const handleAudioEnd = () => {
    console.log("Audio has finished playing.");
    setIsAudioPlaying(false);
  };

  useEffect(() => {
    const currentAudioRef = audioRef.current;
    currentAudioRef.addEventListener("ended", handleAudioEnd);
    return () => {
      currentAudioRef.removeEventListener("ended", handleAudioEnd);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

  return (
    <>
      {success ? (
        <div>
          {isAudioPlaying ? (
            <div>
              <div className="firework"></div>
              <div className="firework"></div>
              <div className="firework"></div>
              <h1 className="cake-title animate-charcter ">Happy Birthday!</h1>
            </div>
          ) : (
            <h1 className="cake-title center-text">Touch Flame</h1>
          )}
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
              {isAudioPlaying ? (
                <div className="flame"></div>
              ) : (
                <div
                  className={`flame ${isFlameVisible ? "" : "hidden"}`}
                  onClick={handleFlameClick}
                ></div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 bounce-in">
          <div className="card-body">
            <div className="form-control">
              <input
                type="password"
                placeholder="4-digit passcode"
                className="input input-bordered"
                value={userCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="toast toast-end">
        {errorMessage && (
          <div className="alert alert-error">
            <span style={{ color: "white" }}>{errorMessage}</span>
          </div>
        )}
      </div>
      <audio ref={audioRef} src="/bdsong.mp3" />
    </>
  );
};

export default PassCode;
