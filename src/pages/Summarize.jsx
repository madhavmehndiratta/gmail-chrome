/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Loading from "../components/Loading";

const Summarize = () => {
  const [selectedText, setSelectedText] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [lengthInput, setLengthInput] = useState("Short");
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    chrome.storage.local.get("selectedText", (result) => {
      setSelectedText(result.selectedText || "");
    });
  }, []);

  const generateReply = async () => {
    setIsLoading(true);
    let s = await ai.languageModel.create({
      systemPrompt:
        "You are a content summarizer. You have to summarize on some parameters. Make sure the summary look like human generated and not ai generated and is easy to understand.",
    });

    const output = await s.prompt(
      `Generate a summary using the following parameters: content ${selectedText}, and length ${lengthInput}`,
    );
    setReplyContent(output.trim());
    setIsLoading(false);
    setIsGenerated(true);
  };

  const handleGoBack = () => {
    setIsGenerated(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    alert("Summary copied to clipboard!");
  };

  return (
    <div>
      {!isGenerated & !isLoading ? (
        <div className="popup-container">
          <h3 className="popup-title">Summarize Your Content</h3>
          <textarea
            style={{
              width: "90%",
              height: "200px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
            value={selectedText}
            onChange={(e) => setSelectedText(e.target.value)}
            placeholder="Type your content here..."
          />

          <div className="input-box">
            <label htmlFor="length-select" className="input-label">
              Length
            </label>
            <select
              id="length-select"
              className="input-field"
              onChange={(e) => setLengthInput(e.target.value)}
            >
              <option value="Short">Short</option>
              <option value="Medium">Medium</option>
              <option value="Long">Long</option>
            </select>
          </div>
          <button className="submit-button" onClick={generateReply}>
            Summarize Content
          </button>
        </div>
      ) : isLoading ? (
        <div className="popup-container">
          <Loading />
        </div>
      ) : (
        <>
          <div className="response-box">
            <h3>Your Summmary:</h3>
            <div className="response-content">
              <ReactMarkdown>{replyContent}</ReactMarkdown>
            </div>
            <div className="response-actions">
              <button className="copy-button" onClick={copyToClipboard}>
                Copy Summary
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

export default Summarize;
