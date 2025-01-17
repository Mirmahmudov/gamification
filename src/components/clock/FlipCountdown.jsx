import React, { useEffect, useState } from 'react';
import './FlipCountdown.css';

function FlipCountdown({ targetTime }) {
    const [timeLeft, setTimeLeft] = useState(0); // vaqtni saqlash uchun

    const flipAllCards = (time) => {
        const seconds = Math.floor(time % 60);
        const minutes = Math.floor(time / 60) % 60;
        const hours = Math.floor(time / 3600) % 24;
        const days = Math.floor(time / 86400);

        flip(document.querySelector("[data-days-tens]"), Math.floor(days / 10));
        flip(document.querySelector("[data-days-ones]"), days % 10);
        flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
        flip(document.querySelector("[data-hours-ones]"), hours % 10);
        flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10));
        flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
        flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10));
        flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
    };

    const flip = (flipCard, newNumber) => {
        const top = flipCard.querySelector('.top');
        const bottom = flipCard.querySelector('.bottom');
        const startNumber = flipCard.querySelector('.top').textContent;

        if (newNumber == startNumber) return;

        top.textContent = startNumber;
        bottom.textContent = startNumber;
        flipCard.dataset.currentNumber = newNumber;
        flipCard.dataset.nextNumber = newNumber;

        flipCard.addEventListener('animationstart', () => {
            top.textContent = newNumber;
        });

        flipCard.addEventListener('animationend', () => {
            bottom.textContent = newNumber;
            flipCard.classList.remove('flip');
        });

        flipCard.classList.add('flip');
    };

    useEffect(() => {
        const targetDate = new Date(targetTime);  // Target date

        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const totalTime = Math.ceil((targetDate - currentTime) / 1000);

            if (totalTime <= 0) {
                clearInterval(interval);
                setTimeLeft(0);  // End countdown if time is over
            } else {
                setTimeLeft(totalTime); // Update the remaining time
            }

            flipAllCards(totalTime);  // Update the flip effect
        }, 250);

        return () => {
            clearInterval(interval);
        };
    }, [targetTime]);

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
