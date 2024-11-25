import "./Navbar.css";

const Navbar = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="navBody navButton">
      <button
        className={currentTab === "Chatbot" ? "selected" : ""}
        onClick={() => setCurrentTab("Chatbot")}
      >
        Chatbot
      </button>
      <button
        className={currentTab === "Compose" ? "selected" : ""}
        onClick={() => setCurrentTab("Compose")}
      >
        Compose
      </button>
      <button
        className={currentTab === "Rewrite" ? "selected" : ""}
        onClick={() => setCurrentTab("Rewrite")}
      >
        Rewrite
      </button>
      <div id="indicator"></div>
    </div>
  );
};

export default Navbar;
