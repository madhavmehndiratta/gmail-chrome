/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./Reply.css";
import Loading from "../components/Loading";

const Reply = () => {
  const [selectedText, setSelectedText] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [toneInput, setToneInput] = useState("Professional");
  const [lengthInput, setLengthInput] = useState("One Liner");
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
        "You are an email composer. You have to generate a reply based on some parameters. Make sure the emails look like human generated and not ai generated.",
    });

    const output = await s.prompt(
      `Generate a reply to email the following parameters: replyText ${selectedText}, tone ${toneInput} and length ${lengthInput}`,
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
    alert("Email copied to clipboard!");
  };

  return (
    <div>
      {!isGenerated & !isLoading ? (
        <div className="popup-container">
          <h3 className="popup-title">Customize Your Reply</h3>
          <textarea
            style={{
              width: "90%",
              height: "200px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
            value={selectedText}
            onChange={(e) => setSelectedText(e.target.value)}
            placeholder="Type your reply here..."
          />
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
          <button className="submit-button" onClick={generateReply}>
            Generate Reply
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
              <ReactMarkdown>{replyContent}</ReactMarkdown>
            </div>
            <div className="response-actions">
              <button className="copy-button" onClick={copyToClipboard}>
                Copy Email
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

export default Reply;
