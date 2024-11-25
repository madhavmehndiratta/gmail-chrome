import { useState } from "react";
import ReactMarkdown from "react-markdown";

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
    <>
      <div>Chatbot</div>
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          placeholder="Enter your prompt"
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <button style={{ marginLeft: 10 }} onClick={getResponse}>
          Submit
        </button>
      </div>
      <div>
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </>
  );
};

export default Chatbot;
