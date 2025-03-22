import React, { useState } from "react";

interface ReplyBoxProps {
  onAddReply: (replyText: string) => void;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({ onAddReply }) => {
  const [reply, setReply] = useState("");
  return (
    <div style={{ marginTop: "8px" }}>
      <input
        type="text"
        placeholder="Write a reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "13px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          marginBottom: "4px",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
        onBlur={(e) => (e.target.style.borderColor = "#ddd")}
      />
      <button
        onClick={() => {
          if (reply.trim()) {
            onAddReply(reply.trim());
            setReply("");
          }
        }}
        style={{
          padding: "6px 12px",
          fontSize: "12px",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          float: "right",
          transition: "background 0.2s",
        }}
      >
        Post Reply
      </button>
    </div>
  );
};

export default ReplyBox;
