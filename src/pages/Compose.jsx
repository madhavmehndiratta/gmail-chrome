import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./Compose.css";
import Loading from "../components/Loading";
import { z } from "zod";

const Compose = () => {
  const [response, setResponse] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [toneInput, setToneInput] = useState("Professional");
  const [lengthInput, setLengthInput] = useState("One Liner");
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedText, setCopiedText] = useState(false);
  const inputSchema = z
    .string()
    .min(3, "Input must be at least 3 characters long");

  const composeEmail = async () => {
    try {
      inputSchema.parse(subjectInput);
      setError("");
    } catch (e) {
      setError(e.errors[0].message);
      return;
    }

    setIsLoading(true);
    let s = await ai.languageModel.create({
      systemPrompt:
        "You are an email composer. You can write the best emails given some parameters. Make sure the emails look like human generated and not ai generated.",
    });

    const output = await s.prompt(
      `Generate an email based on the following parameters: subject ${subjectInput}, tone ${toneInput} and length ${lengthInput}`,
    );
    setResponse(output.trim());
    setIsLoading(false);
    setIsGenerated(true);
  };

  const handleGoBack = () => {
    setToneInput("Professional");
    setLengthInput("One Liner");
    setIsGenerated(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopiedText(true);
  };

  return (
    <>
      <div>
        {!isGenerated && !isLoading ? (
          <div className="popup-container">
            <h1 className="popup-title">✍️ Craft Email</h1>
            <p className="popup-subtitle">
              Enter details to create your email.
            </p>

            <div className="input-box">
              <label htmlFor="subject-input" className="input-label">
                Subject
              </label>
              <input
                id="subject-input"
                className="input-field"
                type="text"
                placeholder={"e.g., 'Follow-up Request'"}
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
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
                <option value="Excited">Excited</option>
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

            <button className="submit-button" onClick={composeEmail}>
              Generate Email
            </button>
          </div>
        ) : isLoading ? (
          <div className="popup-container">
            <Loading />
          </div>
        ) : (
          <>
            <div className="response-box">
              <h3>Your Email:</h3>
              <div className="response-content">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
              <div className="response-actions">
                <button className="copy-button" onClick={copyToClipboard}>
                  {copiedText ? "Copied!" : "Copy Email"}
                </button>
              </div>
              <button className="go-back-button" onClick={handleGoBack}>
                Go Back
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Compose;
