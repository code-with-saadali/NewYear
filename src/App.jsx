import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewYearCelebration from "./NewYearCelebration";
import MessagePage from "./MessagePage"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewYearCelebration />} />
        <Route path="/message" element={<MessagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
