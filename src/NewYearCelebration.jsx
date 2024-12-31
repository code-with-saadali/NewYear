import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Function for generating a random color
const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function NewYearCelebration() {
  const [celebration, setCelebration] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [countdown, setCountdown] = useState(5);
  const [message, setMessage] = useState(
    "Here's to new beginnings and endless possibilities! 🎇✨"
  );
  const [bgColor, setBgColor] = useState(
    "bg-gradient-to-r from-[#FF5C8D] via-[#FF7F50] to-[#FF8C42]"
  );
  const [confettiColors, setConfettiColors] = useState([
    "#6A5ACD",
    "#FFD700",
    "#FF1493",
    "#32CD32",
    "#1E90FF",
  ]);
  const [celebrateAudio, setCelebrateAudio] = useState(
    new Audio("https://www.soundjay.com/button/beep-07.wav")
  );
  const [audioPlaying, setAudioPlaying] = useState(false);
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Countdown effect
  useEffect(() => {
    if (celebration && countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [celebration, countdown]);

  const handleClick = () => {
    setCelebration(true);
    setCountdown(3); // Reset countdown
    setTimeout(() => setCelebration(false), 1200000);

    // During Countdown
    setBgColor("bg-gradient-to-r from-[#FF8C42] via-[#FF5C8D] to-[#FF7F50]");

    // Generate random confetti colors
    setConfettiColors([
      randomColor(),
      randomColor(),
      randomColor(),
      randomColor(),
      randomColor(),
    ]);

    // Play audio immediately after click
    if (!audioPlaying) {
      celebrateAudio.play().catch((error) => {
        console.error("Error playing audio: ", error);
      });
      setAudioPlaying(true);
    }
  };

  // Stop the audio once it's finished
  useEffect(() => {
    celebrateAudio.addEventListener("ended", () => setAudioPlaying(false));

    return () => {
      celebrateAudio.removeEventListener("ended", () => setAudioPlaying(false));
    };
  }, [celebrateAudio]);

  // Animated Emoji Reactions
  const emojiReactions = ["🎆", "🎉", "🎇", "✨", "🌟", "🥂"];
  const randomEmoji =
    emojiReactions[Math.floor(Math.random() * emojiReactions.length)];

  const handleMessageSubmit = (e) => {
    if (e.key === "Enter") {
      // Navigate to the new page and pass the message as state
      navigate("/message", { state: { message } });
    }
  };

  return (
    <div
      className={`flex items-center justify-center h-[100vh] ${bgColor} overflow-hidden`}
    >
      <div className="text-center text-white px-4 md:px-8 space-y-8 fixed">
        {/* Header Animation */}
        <motion.h1
          className="text-6xl font-extrabold mb-6 max-md:text-center text-[#FF1493] drop-shadow-lg"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 80 }}
        >
          🎉 Welcome 2025! 🎉
        </motion.h1>

        {/* Countdown Timer */}
        {celebration && countdown > 0 && (
          <motion.div
            className="text-5xl font-semibold text-[#1E90FF] drop-shadow-lg max-md:text-[30px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: [1, 1.5, 1] }}
            transition={{ delay: 0.5, duration: 1, type: "spring" }}
          >
             {countdown}s - Get Ready!
          </motion.div>
        )}

        {/* Celebrate Button with Pulsating Effect */}
        <motion.button
          onClick={handleClick}
          aria-label="Celebrate New Year"
          className="px-12 py-6 bg-gradient-to-r from-[#32CD32] via-[#FFD700] to-[#FF1493] text-gray-800 rounded-lg text-2xl font-semibold transform transition-all hover:scale-110 hover:bg-gradient-to-r hover:from-[#FF1493] hover:via-[#FFD700] hover:to-[#32CD32] focus:outline-none focus:ring-4 focus:ring-[#1E90FF]"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Let's Celebrate
        </motion.button>

        {/* Celebration Message */}
        {celebration && countdown <= 0 && (
          <motion.div
            className="mt-6 text-6xl max-md:text-2xl max-md:leading-tight font-extrabold text-center text-[#FFD700] drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1,
              duration: 1.5,
              type: "spring",
              stiffness: 80,
            }}
          >
            🎉 Happy New Year 2025! 🎉
            <div className="mt-4 text-3xl text-white font-light drop-shadow-lg">
              {message}
            </div>
            <motion.div
              className="mt-8 text-4xl max-md:text-2xl font-semibold text-[#32CD32] drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [-10, 10, 0] }}
              transition={{
                delay: 2,
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Wishing you a year filled with happiness, success, and adventure!
            </motion.div>
          </motion.div>
        )}

        {/* Confetti Animation */}
        {celebration && countdown <= 0 && (
          <Confetti
            className="-ml-52 max-md:ml-0"
            width={windowWidth}
            height={windowHeight}
            numberOfPieces={1350}
            recycle={false}
            gravity={0.3}
            colors={confettiColors}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              pointerEvents: "none",
              zIndex: 9999,
            }}
          />
        )}

        {/* Interactive User Input for Custom Message */}
        {celebration && countdown <= 0 && (
          <motion.div
            className="mt-8 text-xl font-light text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.2 }}
          >
            <input
              type="text"
              placeholder="Share your New Year wish"
              className="max-w-[230px] h-[55px] px-3 text-lg rounded-lg bg-[#1E90FF] placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FF1493]"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleMessageSubmit}
            />
          </motion.div>
        )}

        {/* Replay Button */}
        {celebration && countdown <= 0 && (
          <motion.button
            onClick={handleClick}
            aria-label="Replay Celebration"
            className="mt-6 max-w-[450px] px-6 h-[52px] bg-gradient-to-r from-[#FFD700] via-[#6A5ACD] to-[#FF1493] text-white rounded-xl text-2xl font-semibold transform transition-all hover:scale-110 hover:bg-gradient-to-r hover:from-[#FF1493] hover:via-[#6A5ACD] hover:to-[#FFD700] focus:outline-none focus:ring-4 focus:ring-[#1E90FF]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.2 }}
          >
            Celebrate Again
          </motion.button>
        )}

        {/* Emoji Reaction after Celebration */}
        {celebration && countdown <= 0 && (
          <motion.div
            className="mt-8 text-5xl animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.2 }}
          >
            {randomEmoji}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default NewYearCelebration;
