import React, { useEffect, useState } from "react";
import "./FlipCountdown.css";

function FlipCountdown({ targetTime }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [initialRender, setInitialRender] = useState(true);

  const flipAllCards = (time) => {
    if (time < 0) return;

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600) % 24;
    const days = Math.floor(time / 86400);

    flip(document.querySelector("[data-days-tens]"), Math.floor(days / 10));
    flip(document.querySelector("[data-days-ones]"), days % 10);
    flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
    flip(document.querySelector("[data-hours-ones]"), hours % 10);
    flip(
      document.querySelector("[data-minutes-tens]"),
      Math.floor(minutes / 10)
    );
    flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
    flip(
      document.querySelector("[data-seconds-tens]"),
      Math.floor(seconds / 10)
    );
    flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
  };

  const flip = (flipCard, newNumber) => {
    if (!flipCard) return;

    const top = flipCard.querySelector(".top");
    const bottom = flipCard.querySelector(".bottom");
    const startNumber = top.textContent;

    if (newNumber == startNumber) return;

    top.textContent = startNumber;
    bottom.textContent = startNumber;
    flipCard.dataset.currentNumber = newNumber;
    flipCard.dataset.nextNumber = newNumber;

    flipCard.addEventListener("animationstart", () => {
      top.textContent = newNumber;
    });

    flipCard.addEventListener("animationend", () => {
      bottom.textContent = newNumber;
      flipCard.classList.remove("flip");
    });

    if (!initialRender) {
      flipCard.classList.add("flip");
    }
  };

  useEffect(() => {
    const targetDate = new Date(targetTime).getTime();
    const updateTimer = () => {
      const currentTime = new Date().getTime();
      const remainingTime = Math.max(
        Math.ceil((targetDate - currentTime) / 1000),
        0
      );
      setTimeLeft(remainingTime);
    };

    updateTimer(); // Immediately update on first render
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  useEffect(() => {
    flipAllCards(timeLeft);
    setInitialRender(false);
  }, [timeLeft]); // Har safar timeLeft o'zgarganda flipAllCards ishlaydi

  return (
    <div className="timaPage">
      <div className="countdown-container">
        <div className="countdown-cards">
          <div className="card-title">Kun</div>
          <div className="card-container">
            <div className="flip-card" data-days-tens>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
            <div className="flip-card" data-days-ones>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
          </div>
        </div>
        <div className="countdown-cards">
          <div className="card-title">Soat</div>
          <div className="card-container">
            <div className="flip-card" data-hours-tens>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
            <div className="flip-card" data-hours-ones>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
          </div>
        </div>
        <div className="countdown-cards">
          <div className="card-title">Daqiqalar</div>
          <div className="card-container">
            <div className="flip-card" data-minutes-tens>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
            <div className="flip-card" data-minutes-ones>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
          </div>
        </div>
        <div className="countdown-cards">
          <div className="card-title">Soniyalar</div>
          <div className="card-container">
            <div className="flip-card" data-seconds-tens>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
            <div className="flip-card" data-seconds-ones>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCountdown;
