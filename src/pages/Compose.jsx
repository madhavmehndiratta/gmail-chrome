import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./Compose.css";

const Compose = () => {
  const [response, setResponse] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [toneInput, setToneInput] = useState("Professional");
  const [lengthInput, setLengthInput] = useState("One Liner");
  const [isGenerated, setIsGenerated] = useState(false); // Toggle for form or response view
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const composeEmail = async () => {
    setIsLoading(true); // Start loading animation
    let s = await ai.languageModel.create({
      systemPrompt:
        "You are an email composer. You can write the best emails given some parameters. Make sure the emails look like human generated and not ai generated.",
    });

    const output = await s.prompt(
      `Generate an email based on the following parameters: subject ${subjectInput}, tone ${toneInput} and length ${lengthInput}`
    );
    setResponse(output.trim());
    setIsLoading(false); // Stop loading animation
    setIsGenerated(true); // Show the generated email
  };

  const handleGoBack = () => {
    setIsGenerated(false); // Go back to the compose view
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    alert("Email copied to clipboard!"); // Show an alert when the email is copied
  };

  return (
    <div className="popup-container">
      {!isGenerated ? (
        <>
          <h1 className="popup-title">✍️ Craft Email</h1>
          <p className="popup-subtitle">
            Enter details to create your email.
          </p>

          <div className="input-box">
            <label htmlFor="subject-input" className="input-label">Subject</label>
            <input
              id="subject-input"
              className="input-field"
              type="text"
              placeholder="e.g., 'Follow-up Request'"
              onChange={(e) => setSubjectInput(e.target.value)}
            />
          </div>

          <div className="input-box">
            <label htmlFor="tone-select" className="input-label">Tone</label>
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
            <label htmlFor="length-select" className="input-label">Length</label>
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
          
          {isLoading && (
            <div className="loading-container">
              <div class="container">

<div class="h1Container">

  <div class="cube h1 w1 l1">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h1 w1 l2">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h1 w1 l3">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h1 w2 l1">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h1 w2 l2">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h1 w2 l3">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h1 w3 l1">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h1 w3 l2">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h1 w3 l3">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>
</div>

<div class="h2Container">

  <div class="cube h2 w1 l1">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h2 w1 l2">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h2 w1 l3">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h2 w2 l1">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h2 w2 l2">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h2 w2 l3">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h2 w3 l1">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h2 w3 l2">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h2 w3 l3">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>
</div>

<div class="h3Container">

  <div class="cube h3 w1 l1">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h3 w1 l2">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h3 w1 l3">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h3 w2 l1">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h3 w2 l2">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h3 w2 l3">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h3 w3 l1">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h3 w3 l2">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>

  <div class="cube h3 w3 l3">
    <div class="face top"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>
</div>

</div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="response-box">
            <h3>Your Email:</h3>
            <div className="response-content">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
            <div className="response-actions">
              <button className="copy-button" onClick={copyToClipboard}>
                Copy Email
              </button>
            </div>
          </div>

          <button className="go-back-button" onClick={handleGoBack}>
            Go Back
          </button>
        </>
      )}
    </div>
  );
};

export default Compose;
