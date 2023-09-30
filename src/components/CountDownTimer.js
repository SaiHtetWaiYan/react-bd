import React, { useState, useEffect } from "react";
import Chatbot from "./Chat";
function CountDownTimer() {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [countdownReached, setCountdownReached] = useState(false); // State for countdown reached

  useEffect(() => {
    const targetDate = new Date("2023-10-02T00:00:00").getTime();

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const daysRemaining = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hoursRemaining = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesRemaining = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsRemaining = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(formatTime(daysRemaining));
      setHours(formatTime(hoursRemaining));
      setMinutes(formatTime(minutesRemaining));
      setSeconds(formatTime(secondsRemaining));

      if (distance <= 0) {
        clearInterval(intervalId);
        setCountdownReached(true); // Set the state to indicate countdown reached
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {countdownReached ? (
        // Your content when countdown reaches its target
        <Chatbot></Chatbot>
      ) : (
        // <PassCode></PassCode>
        // Your countdown timer
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": days }}></span>
            </span>
            days
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": hours }}></span>
            </span>
            hours
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": minutes }}></span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": seconds }}></span>
            </span>
            sec
          </div>
        </div>
      )}
    </div>
  );
}

export default CountDownTimer;
