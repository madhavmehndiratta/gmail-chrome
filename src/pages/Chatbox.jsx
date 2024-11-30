import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./Chatbot.css";

const Chatbot = () => {
  const [response, setResponse] = useState("");
  const [inputValue, setInputValue] = useState("");

  async function getResponse() {
    let s = await ai.languageModel.create({
      systemPrompt: "You are a friendly conversation bot.",
    });

    const response = await s.prompt(
      "Reply to the user with max 300 words in a friendly manner. Return the answer in markdown. Here is the question: " +
        inputValue,
    );
    setResponse(response.trim());
  }

  return (
    <div className="chat-segment">
      <div className="chatbotHead">Ask Mimo</div>
      <div className="ques-segment">
        <img className="img-mimo" src="/images/mimo.png" alt="Mimo Avatar" />
        <p className="mimo">How can I help you today?</p>
      </div>
      <div className="userInput">
        <input
          type="text"
          placeholder="Ask your questions!"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </div>
      <button className="submitButton" onClick={getResponse}>
        Submit
      </button>
      <div className="Output">
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Chatbot;
