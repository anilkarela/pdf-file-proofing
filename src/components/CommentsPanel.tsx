import React from "react";
import ReplyBox from "./ReplyBox";
import { CommentData } from "../pages/PDFViewer";

interface CommentsPanelProps {
  comments: CommentData[];
  onAddReply: (commentId: number, replyText: string) => void;
}

const CommentsPanel: React.FC<CommentsPanelProps> = ({
  comments,
  onAddReply,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "300px",
        height: "100vh",
        background: "#fff",
        boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
        padding: "16px",
        zIndex: 1050,
        overflowY: "auto",
      }}
    >
      <h3 style={{ marginBottom: "20px", color: "#333" }}>Comments</h3>
      {comments.length === 0 && (
        <p style={{ color: "#666", textAlign: "center" }}>
          No comments yet
        </p>
      )}
      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            marginBottom: "16px",
            padding: "12px",
            border: "1px solid #eee",
            borderRadius: "8px",
            background: "#f8f9fa",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong style={{ color: "#1976d2" }}>
              Page {comment.page}
            </strong>
            <span style={{ fontSize: "12px", color: "#666" }}>
              #{comment.id.toString().slice(-4)}
            </span>
          </div>
          <p style={{ margin: "8px 0", color: "#333" }}>{comment.text}</p>
          {comment.replies.map((reply, idx) => (
            <div
              key={idx}
              style={{
                marginLeft: "8px",
                padding: "8px",
                background: "#fff",
                borderRadius: "4px",
                fontSize: "13px",
                color: "#555",
                borderLeft: "3px solid #1976d2",
              }}
            >
              {reply}
            </div>
          ))}
          <ReplyBox
            onAddReply={(replyText) => onAddReply(comment.id, replyText)}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentsPanel;
