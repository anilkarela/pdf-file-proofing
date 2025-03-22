import React from "react";
import { Page } from "react-pdf";
import { CommentData } from "../pages/PDFViewer";

interface PDFPageProps {
  pageNumber: number;
  onPageClick: (e: React.MouseEvent<HTMLDivElement>, page: number) => void;
  comments: CommentData[];
}

const PDFPage: React.FC<PDFPageProps> = ({
  pageNumber,
  onPageClick,
  comments,
}) => {
  return (
    <div
      style={{
        position: "relative",
        margin: "20px auto",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
      onClick={(e) => onPageClick(e, pageNumber)}
    >
      <Page
        pageNumber={pageNumber}
        width={800}
        renderTextLayer={false}
        renderAnnotationLayer={false}
      />
      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            position: "absolute",
            left: comment.x,
            top: comment.y,
            width: comment.width,
            height: comment.height,
            padding: "0",
            fontSize: "14px",
            lineHeight: "1.4",
            color: "#333",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
            overflow: "hidden",
          }}
        >
          {comment.text}
        </div>
      ))}
    </div>
  );
};

export default PDFPage;
