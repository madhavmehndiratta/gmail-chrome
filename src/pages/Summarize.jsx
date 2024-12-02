/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Loading from "../components/Loading";

const Summarize = () => {
  const [selectedText, setSelectedText] = useState("");
  const [summaryContent, setSummaryContent] = useState("");
  const [typeInput, setTypeInput] = useState("key-points");
  const [lengthInput, setLengthInput] = useState("short");
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    chrome.storage.local.get("selectedText", (result) => {
      setSelectedText(result.selectedText || "");
    });
  }, []);

  const generateSummary = async () => {
    setIsLoading(true);
    const options = {
      sharedContext: "",
      type: typeInput,
      format: "plain-text",
      length: lengthInput,
    };

    console.log(options);

    try {
      const summarizer = await ai.summarizer.create(options);

      const summary = await summarizer.summarize(selectedText);

      setSummaryContent(summary.trim());
      setIsGenerated(true);
    } catch (error) {
      console.error("Error generating summary:", error);
      setIsGenerated(true);
      setSummaryContent(
        "An error occurred while generating the summary. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    setCopiedText(false);
    setSummaryContent("");
    setTypeInput("key-points");
    setLengthInput("short");
    setIsGenerated(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summaryContent);
    setCopiedText(true);
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
            <label htmlFor="type-select" className="input-label">
              Type
            </label>
            <select
              id="type-select"
              className="input-field"
              onChange={(e) => setTypeInput(e.target.value)}
            >
              <option value="key-points">Key Points</option>
              <option value="tl;dr">TL;DR</option>
              <option value="teaser">Teaser</option>
              <option value="headline">Headline</option>
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
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>

          <button className="submit-button" onClick={generateSummary}>
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
              <ReactMarkdown>{summaryContent}</ReactMarkdown>
            </div>
            <div className="response-actions">
              <button className="copy-button" onClick={copyToClipboard}>
                {copiedText ? "Copied!" : "Copy Summary"}
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
