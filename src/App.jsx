import { useState } from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Chatbot from "./pages/Chatbox";
import Compose from "./pages/Compose";
import Rewrite from "./pages/Rewrite";
import Home from "./pages/Home";
import Reply from "./pages/Reply";
import Summarize from "./pages/Summarize";
import Translate from "./pages/Translate";

function Main() {
  const [currentTab, setCurrentTab] = useState("");

  const renderComponent = () => {
    switch (currentTab) {
      case "Chatbot":
        return <Chatbot />;
      case "Compose":
        return <Compose />;
      case "Rewrite":
        return <Rewrite />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="page">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div style={{ marginTop: 10 }}>{renderComponent()}</div>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/reply" element={<Reply />} />
        <Route path="/summarize" element={<Summarize />} />
        <Route path="/translate" element={<Translate />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
