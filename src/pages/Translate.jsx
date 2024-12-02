/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Loading from "../components/Loading";

const Translate = () => {
  const [selectedText, setSelectedText] = useState("");
  const [translatedContent, setTranslatedContent] = useState("");
  const [sourceInput, setSourceInput] = useState("en");
  const [targetInput, setTargetInput] = useState("en");
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    chrome.storage.local.get("selectedText", (result) => {
      setSelectedText(result.selectedText || "");
    });
  }, []);

  const translateText = async () => {
    setIsLoading(true);
    const languagePair = {
      sourceLanguage: sourceInput,
      targetLanguage: targetInput,
    };
    try {
      const canTranslate = await translation.canTranslate(languagePair);

      let translator;
      if (canTranslate !== "no") {
        if (canTranslate === "readily") {
          translator = await translation.createTranslator(languagePair);
        } else {
          translator = await translation.createTranslator(languagePair);
          await translator.ready;
        }
      } else {
        console.log("Translation can not be created.");
      }

      const output = await translator.translate(selectedText);

      setTranslatedContent(output.trim());
      setIsGenerated(true);
    } catch (error) {
      console.error("Error generating translation:", error);
      setIsGenerated(true);
      setTranslatedContent(
        "An error occurred while translating the content. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    setCopiedText(false);
    setTranslatedContent("");
    setSourceInput("en");
    setTargetInput("en");
    setIsGenerated(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedContent);
    setCopiedText(true);
  };

  return (
    <div>
      {!isGenerated & !isLoading ? (
        <div className="popup-container">
          <h3 className="popup-title">Translate Your Content</h3>
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
            <label htmlFor="source-select" className="input-label">
              Source Language
            </label>
            <select
              id="source-select"
              className="input-field"
              onChange={(e) => setSourceInput(e.target.value)}
            >
              <option value="en">English</option>
              <option value="zh">Mandarian Chinese</option>
              <option value="ja">Japanese</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="es">Spanish</option>
              <option value="tr">Turkish</option>
              <option value="hi">Hindi</option>
              <option value="vi">Vietnamese</option>
              <option value="bn">Bengali</option>
            </select>
          </div>

          <div className="input-box">
            <label htmlFor="target-select" className="input-label">
              Target Language
            </label>
            <select
              id="target-select"
              className="input-field"
              onChange={(e) => setTargetInput(e.target.value)}
            >
              <option value="en">English</option>
              <option value="zh">Mandarian Chinese</option>
              <option value="ja">Japanese</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="es">Spanish</option>
              <option value="tr">Turkish</option>
              <option value="hi">Hindi</option>
              <option value="vi">Vietnamese</option>
              <option value="bn">Bengali</option>
            </select>
          </div>

          <button className="submit-button" onClick={translateText}>
            Translate Content
          </button>
        </div>
      ) : isLoading ? (
        <div className="popup-container">
          <Loading />
        </div>
      ) : (
        <>
          <div className="response-box">
            <h3>Your Translation:</h3>
            <div className="response-content">
              <ReactMarkdown>{translatedContent}</ReactMarkdown>
            </div>
            <div className="response-actions">
              <button className="copy-button" onClick={copyToClipboard}>
                {copiedText ? "Copied!" : "Copy Translation"}
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

export default Translate;
