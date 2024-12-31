import { useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";

function MessagePage() {
  const location = useLocation();
  const { message } = location.state || {};
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

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

  // Handle message submit by opening WhatsApp with the message
  const handleMessageSubmit = () => {
    const phoneNumber = "0317617835";  // Your WhatsApp number
    const encodedMessage = encodeURIComponent(message || "Wishing you a fabulous New Year!");
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gradient-to-r from-[#FF1493] via-[#FF7F50] to-[#FFD700] overflow-hidden"
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2024/12/26/08/19/ai-generated-9291566_640.png')",
        backgroundSize: "cover",
        animation: "backgroundShift 20s infinite linear",
      }}
    >
      {/* Confetti Animation */}
      <Confetti
        width={windowWidth}
        height={windowHeight}
        numberOfPieces={1200}
        recycle={false}
        gravity={0.3}
        colors={["#FFD700", "#FF1493", "#32CD32", "#1E90FF", "#FF8C00"]}
        style={{
          position: "absolute",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      <div className="text-center text-white px-6 py-10 relative z-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8C00] to-[#FF1493] drop-shadow-lg animate__animated animate__bounceInDown">
          🎉 Your New Year Message 🎉
        </h1>
        <p className="mt-6 text-3xl text-[#1E90FF] font-semibold drop-shadow-xl">
          {message || "Wishing you a fabulous New Year!"}
        </p>

        {/* Additional Festive Details */}
        <div className="mt-12 text-2xl text-[#32CD32] font-light">
          <p className="animate__animated animate__fadeIn animate__delay-1s">
            May 2025 bring you success, joy, and endless possibilities!
          </p>
        </div>

        {/* Button to send message to WhatsApp */}
        <div className="mt-8">
          <button
            onClick={handleMessageSubmit}
            className="px-6 py-3 bg-[#32CD32] text-white text-2xl font-semibold rounded-lg hover:bg-[#FFD700] transition-all"
          >
            Share on WhatsApp
          </button>
        </div>
      </div>

      {/* Animated Floating Stars */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-10 left-10 opacity-20 animate__animated animate__fadeIn animate__delay-2s">
          <span className="text-4xl">✨</span>
        </div>
        <div className="absolute top-40 right-20 opacity-15 animate__animated animate__fadeIn animate__delay-4s">
          <span className="text-3xl">🌟</span>
        </div>
        <div className="absolute bottom-20 left-10 opacity-30 animate__animated animate__fadeIn animate__delay-5s">
          <span className="text-5xl">🎆</span>
        </div>
      </div>
    </div>
  );
}

export default MessagePage;
