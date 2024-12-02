import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { z } from "zod";
import "./Rewrite.css";
import Loading from "../components/Loading";

const Rewrite = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [toneInput, setToneInput] = useState("Professional");
  const [lengthInput, setLengthInput] = useState("One Liner");
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedText, setCopiedText] = useState(false);
  const inputSchema = z
    .string()
    .min(3, "Input must be at least 3 characters long");

  const inputRef = useRef(null);

  const handleGoBack = () => {
    setToneInput("Professional");
    setLengthInput("One Liner");
    setIsGenerated(false);
    setUserInput("");
  };

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
        "You are content paraphraser. You have to rewrite the content based on some parameters. Make sure the content looks like human-generated and not AI-generated.",
    });

    const output = await s.prompt(
      `Rewrite the content based on the following parameters: content ${userInput}, tone ${toneInput} and length ${lengthInput}`,
    );
    setResponse(output.trim());
    setIsLoading(false);
    setIsGenerated(true);
  };

  useEffect(() => {
    if (!isGenerated) {
      inputRef.current?.focus();
    }
  }, [isGenerated]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopiedText(true);
  };

  return (
    <div>
      {!isGenerated && !isLoading ? (
        <div className="popup-container">
          <h3 className="popup-title rewriteTitle">Rewrite Content</h3>
          <div className="input-box">
            <label htmlFor="subject-input" className="input-label">
              Type your content here
            </label>
            <textarea
              id="subject-input"
              className="userInput rewriteUserInput"
              ref={inputRef}
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
              className="rewriteInput"
              onChange={(e) => setToneInput(e.target.value)}
            >
              <option value="Professional">Professional</option>
              <option value="Casual">Casual</option>
              <option value="Excited">Excited</option>
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="length-select" className="input-label">
              Length
            </label>
            <select
              id="length-select"
              className="rewriteInput"
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
                {copiedText ? "Copied!" : "Copy Response"}
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
