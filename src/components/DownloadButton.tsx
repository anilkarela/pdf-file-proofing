import React from "react";

interface DownloadButtonProps {
  onDownload: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onDownload }) => {
  return (
    <button
      onClick={onDownload}
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        zIndex: 1100,
        padding: "8px 16px",
        background: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        transition: "all 0.2s ease",
      }}
    >
      Download PDF
    </button>
  );
};

export default DownloadButton;
