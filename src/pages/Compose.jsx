import { useState } from "react";
import ReactMarkdown from "react-markdown";

const Compose = () => {
  const [response, setResponse] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [toneInput, setToneInput] = useState("Professional");
  const [lengthInput, setLengthInput] = useState("One Liner");

  const composeEmail = async () => {
    let s = await ai.languageModel.create({
      systemPrompt:
        "You are an email composer. You can write the best emails given some parameters. Make sure the emails look like human generated and not ai generated.",
    });

    console.log(
      `Generate an email based on the following parameters: subject - ${subjectInput}, tone - ${toneInput} and length - ${lengthInput}. Send the response in markdown format`,
    );
    const output = await s.prompt(
      `Generate an email based on the following parameters: subject ${subjectInput}, tone ${toneInput} and length ${lengthInput}`,
    );
    setResponse(output.trim());
  };

  return (
    <div>
      <p>Compose an email by giving the subject</p>
      <div style={{ display: "flex", marginTop: 10 }}>
        <div style={{ marginRight: 10 }}>Subject</div>
        <input
          style={{}}
          type="text"
          placeholder="Enter subject of the email"
          onChange={(e) => setSubjectInput(e.target.value)}
        ></input>
      </div>
      <div style={{ display: "flex", marginTop: 10 }}>
        <label style={{ marginRight: 10, marginTop: 5 }}>Select a tone</label>
        <select onChange={(e) => setToneInput(e.target.value)}>
          <option value={"Professional"}>Professional</option>
          <option value={"Casual"}>Casual</option>
          <option value={"Normal"}>Normal</option>
        </select>
      </div>
      <div style={{ display: "flex", marginTop: 10 }}>
        <label style={{ marginRight: 10, marginTop: 5 }}>Select a length</label>
        <select onChange={(e) => setLengthInput(e.target.value)}>
          <option value={"One Liner"}>One Liner</option>
          <option value={"Short"}>Short</option>
          <option value={"Medium"}>Medium</option>
          <option value={"Long"}>Long</option>
        </select>
      </div>
      <button style={{ marginTop: 20 }} onClick={composeEmail}>
        Submit
      </button>
      <div style={{ marginTop: 10 }}>
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Compose;
