import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { z } from "zod";
import "./Chatbot.css";
import Loading from "../components/Loading";

const Chatbot = () => {
  const [response, setResponse] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputSchema = z
    .string()
    .min(2, "Input must be at least 2 characters long");

  async function getResponse() {
    try {
      inputSchema.parse(inputValue);
      setError("");
    } catch (e) {
      setError(e.errors[0].message);
      return;
    }

    setResponse("");
    setIsLoading(true);
    let s = await ai.languageModel.create({
      systemPrompt: "You are a friendly conversation bot.",
    });

    const response = await s.prompt(
      "Remember the whole conversation.. Reply to the user with max 300 words in a friendly manner. Return the answer in markdown. Here is the question: " +
        inputValue,
    );
    setIsLoading(false);
    setResponse(response.trim());
  }

  return (
    <div className="chat-segment">
      <div className="chatbotHead">Ask Mimo</div>
      <div className="ques-segment">
        <img className="img-mimo" src="/images/mimo.png" alt="Mimo Avatar" />
        <div className="mimo">How can I help you today?</div>
      </div>
      <div className="userInput">
        <input
          type="text"
          placeholder="Ask your questions!"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        {error && <p className="error-message">{error}</p>}
      </div>
      <button className="submitButton" onClick={getResponse}>
        Submit
      </button>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isLoading ? <Loading /> : ""}
      </div>
      <div className="Output">
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Chatbot;
