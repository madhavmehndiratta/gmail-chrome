import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-box">
        <img src="/images/mimo.png" alt="Mimo" className="mimo-image" />
        <h1 className="welcome-text">Welcome to Mimo! ✨</h1>
        <p className="description">
          Your personal assistant for Gmail: summarize, rewrite, chat,
          auto-reply, and more!
        </p>
      </div>
    </div>
  );
};

export default Home;
