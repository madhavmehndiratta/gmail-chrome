import { useState } from "react";

const Popup = () => {
  const [replyContent, setReplyContent] = useState("");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3>Customize Your Reply</h3>
      <textarea
        style={{ width: "100%", height: "200px", fontSize: "14px" }}
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="Type your reply here..."
      />
      <button>Reply</button>
    </div>
  );
};

export default Popup;
