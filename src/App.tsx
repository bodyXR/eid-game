import { useState, useEffect } from "react";
import "./App.css";

type Sheep = {
  id: number;
  x: number;
  y: number;
};

type CelebrationPopup = {
  show: boolean;
  money: number;
};

type FeedbackMessage = {
  id: number;
  x: number;
  y: number;
  message: string;
};

function App() {
  const [sheep, setSheep] = useState<Sheep[]>([]);
  const [celebration, setCelebration] = useState<CelebrationPopup>({
    show: false,
    money: 0,
  });
  const [showInstructions, setShowInstructions] = useState(true);
  const [feedbackMessages, setFeedbackMessages] = useState<FeedbackMessage[]>(
    []
  );

  const resetGame = () => {
    const initialSheep: Sheep[] = Array.from({ length: 3 }, () => ({
      id: Date.now() + Math.random(),
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
    }));
    setSheep(initialSheep);
    setCelebration({ show: false, money: 0 });
    setFeedbackMessages([]);
  };

  const addInitialSheep = () => {
    const initialSheep: Sheep[] = Array.from({ length: 3 }, () => ({
      id: Date.now() + Math.random(),
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
    }));
    setSheep(initialSheep);
  };

  const handleClick = (id: number) => {
    setSheep((prev) => {
      const newSheep = prev.filter((s) => s.id !== id);
      if (newSheep.length === 0) {
        const randomMoney = Math.floor(Math.random() * 10 + 1) * 50;
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        const messages = [
          "Try next eid when you grow up 😢",
          "i have gave it to your mom! 😥",
          "Mom: i took it 🤐",
        ];
        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];
        // Randomly choose between randomMoney and randomNumber for celebration
        const celebrationValue =
          Math.random() < 0.5 ? randomMoney : randomNumber;
        setCelebration({ show: true, money: celebrationValue });
        setFeedbackMessages([
          {
            id: Date.now(),
            x: window.innerWidth / 2,
            y: window.innerHeight / 2 + 100,
            message: randomMessage,
          },
        ]);
      }
      return newSheep;
    });
  };

  useEffect(() => {
    addInitialSheep();
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (feedbackMessages.length > 0) {
      const timer = setTimeout(() => {
        setFeedbackMessages([]);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessages]);

  return (
    <div className="game-container">
      <div className="game-area">
        {sheep.map((s) => (
          <div
            key={s.id}
            className="sheep"
            style={{ left: s.x + "px", top: s.y + "px" }}
            onClick={() => handleClick(s.id)}
          >
            🐑
          </div>
        ))}
      </div>
      {showInstructions && (
        <div className="instruction-popup">
          <h2>Kill the sheep to get your Eidia! 🎉</h2>
        </div>
      )}
      {celebration.show && (
        <div className="celebration-popup">
          <h1>Eid Mubarak! 🥳</h1>
          <p>Your Eidia is ${celebration.money}!</p>
          {celebration.money < 50 &&
            feedbackMessages.map((msg) => (
              <div key={msg.id} className="feedback-message">
                {msg.message}
              </div>
            ))}
          <button onClick={resetGame} className="try-again-button">
            Try Again
          </button>
        </div>
      )}{" "}
      <div className="copyright-footer">Copyright © 2024 Abdullah Mohammed</div>
    </div>
  );
}

export default App;
