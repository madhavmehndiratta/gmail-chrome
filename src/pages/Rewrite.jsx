import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { z } from "zod";

import Loading from "../components/Loading";

const Rewrite = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [toneInput, setToneInput] = useState("Professional");
  const [lengthInput, setLengthInput] = useState("One Liner");
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputSchema = z
    .string()
    .min(3, "Input must be at least 3 characters long");

  const generateContent = async () => {
    try {
      inputSchema.parse(userInput);
      setError("");
    } catch (e) {
      setError(e.errors[0].message);
      return;
    }

    setIsLoading(true);
    let s = await ai.languageModel.create({
      systemPrompt:
        "You are content paraphraser. You have to rewrite the content based on some parameters. Make sure the content look like human generated and not ai generated.",
    });

    const output = await s.prompt(
      `Rewrite the content based on the following parameters: content ${userInput}, tone ${toneInput} and length ${lengthInput}`,
    );
    setResponse(output.trim());
    setIsLoading(false);
    setIsGenerated(true);
  };

  const handleGoBack = () => {
    setIsGenerated(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    alert("Content copied to clipboard!");
  };

  return (
    <div>
      {!isGenerated & !isLoading ? (
        <div className="popup-container">
          <h3 className="popup-title">Rewrite Content</h3>
          <div className="input-box">
            <label htmlFor="subject-input" className="input-label">
              Type your content here
            </label>
            <input
              id="subject-input"
              className="input-field"
              type="text"
              style={{
                width: "90%",
                height: "200px",
                fontSize: "14px",
                marginBottom: "10px",
              }}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="input-box">
            <label htmlFor="tone-select" className="input-label">
              Tone
            </label>
            <select
              id="tone-select"
              className="input-field"
              onChange={(e) => setToneInput(e.target.value)}
            >
              <option value="Professional">Professional</option>
              <option value="Casual">Casual</option>
              <option value="Normal">Normal</option>
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="length-select" className="input-label">
              Length
            </label>
            <select
              id="length-select"
              className="input-field"
              onChange={(e) => setLengthInput(e.target.value)}
            >
              <option value="One Liner">One Liner</option>
              <option value="Short">Short</option>
              <option value="Medium">Medium</option>
              <option value="Long">Long</option>
            </select>
          </div>
          <button className="submit-button" onClick={generateContent}>
            Rewrite Content
          </button>
        </div>
      ) : isLoading ? (
        <div className="popup-container">
          <Loading />
        </div>
      ) : (
        <>
          <div className="response-box">
            <h3>Your Content:</h3>
            <div className="response-content">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
            <div className="response-actions">
              <button className="copy-button" onClick={copyToClipboard}>
                Copy Response
              </button>
            </div>
            <button className="go-back-button" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Rewrite;
