import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Chatbot from "./pages/Chatbox";
import Compose from "./pages/Compose";
import Rewrite from "./pages/Rewrite";
import Home from "./pages/Home";

function App() {
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
      <Navbar setCurrentTab={setCurrentTab} />
      <div style={{ marginTop: 10 }}>{renderComponent()}</div>
    </div>
  );
}

export default App;
