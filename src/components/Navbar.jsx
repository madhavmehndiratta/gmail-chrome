import "./Navbar.css";

const Navbar = ({ setCurrentTab }) => {
  return (
    <div>
      <button onClick={() => setCurrentTab("Chatbot")}>Chatbot</button>
      <button onClick={() => setCurrentTab("Compose")}>Compose</button>
      <button onClick={() => setCurrentTab("Rewrite")}>Rewrite</button>
    </div>
  );
};

export default Navbar;
