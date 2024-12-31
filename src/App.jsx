import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewYearCelebration from "./NewYearCelebration";
import MessagePage from "./MessagePage";
import PageNotFound from "./PageNotFound"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewYearCelebration />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="*" element={<PageNotFound />} /> 
      </Routes>
    </Router>
  );
}

export default App;
