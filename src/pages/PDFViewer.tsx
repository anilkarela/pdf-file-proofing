import React, { useRef, useState } from "react";
import { Document, pdfjs } from "react-pdf";
import { useLocation } from "react-router-dom";
import { PDFDocument, rgb } from "pdf-lib";
import DownloadButton from "../components/DownloadButton";
import PDFPage from "../components/PDFPage";
import DraggableResizableCommentInput from "../components/CommentInput";
import CommentsPanel from "../components/CommentsPanel";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export interface CommentData {
  id: number;
  page: number;
  x: number;
  y: number;
  text: string;
  width: number;
  height: number;
  replies: string[];
}

const PDFViewer: React.FC = () => {
  const location = useLocation();
  const { pdfUrl } = location.state || {};

  const [numPages, setNumPages] = useState<number>(0);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [activeCommentInput, setActiveCommentInput] = useState<{
    page: number;
    x: number;
    y: number;
    pageOffsetLeft: number;
    pageOffsetTop: number;
  } | null>(null);
  const [panelOpen, setPanelOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!pdfUrl) {
    return <div>Error: No PDF selected. Please go back to the homepage.</div>;
  }

  const handleDownloadPdf = async () => {
    try {
      const existingPdfBytes = await fetch(pdfUrl).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();

      comments.forEach((comment) => {
        const page = pages[comment.page - 1];
        const { width, height } = page.getSize();
        const scale = width / 800;
        const pdfX = comment.x * scale;
        const pdfY = height - comment.y * scale - comment.height * scale;
        page.drawText(comment.text, {
          x: pdfX,
          y: pdfY,
          size: 10,
          color: rgb(0, 0, 0),
          maxWidth: comment.width * scale,
        });
      });

      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "commented-document.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const handlePageClick = (
    e: React.MouseEvent<HTMLDivElement>,
    page: number
  ) => {
    if (activeCommentInput) return;
    const pageElement = e.currentTarget;
    const pageRect = pageElement.getBoundingClientRect();
    const x = e.clientX - pageRect.left;
    const y = e.clientY - pageRect.top;
    const pageOffsetLeft = pageElement.offsetLeft;
    const pageOffsetTop = pageElement.offsetTop;

    setActiveCommentInput({
      page,
      x,
      y,
      pageOffsetLeft,
      pageOffsetTop,
    });
  };

  const handleSaveComment = (
    text: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    if (activeCommentInput && text) {
      const newComment: CommentData = {
        id: Date.now(),
        page: activeCommentInput.page,
        x: x - activeCommentInput.pageOffsetLeft,
        y: y - activeCommentInput.pageOffsetTop,
        text,
        width,
        height,
        replies: [],
      };
      setComments([...comments, newComment]);
    }
    setActiveCommentInput(null);
  };

  const handleCancelComment = () => {
    setActiveCommentInput(null);
  };

  const handleAddReply = (commentId: number, replyText: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, replyText] }
          : comment
      )
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "100vh",
        background: "#eee",
      }}
    >
      <DownloadButton onDownload={handleDownloadPdf} />
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        style={{
          position: "fixed",
          top: "20px",
          right: panelOpen ? "320px" : "20px",
          zIndex: 1100,
          padding: "8px 16px",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          transition: "all 0.2s ease",
        }}
      >
        {panelOpen ? "Close Comments" : "Open Comments"}
      </button>
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (_, index) => {
          const pageNumber = index + 1;
          return (
            <PDFPage
              key={`page_${pageNumber}`}
              pageNumber={pageNumber}
              onPageClick={handlePageClick}
              comments={comments.filter((c) => c.page === pageNumber)}
            />
          );
        })}
      </Document>
      {activeCommentInput && (
        <DraggableResizableCommentInput
          initialX={
            activeCommentInput.pageOffsetLeft + activeCommentInput.x
          }
          initialY={
            activeCommentInput.pageOffsetTop + activeCommentInput.y
          }
          onSave={handleSaveComment}
          onCancel={handleCancelComment}
        />
      )}
      {panelOpen && (
        <CommentsPanel comments={comments} onAddReply={handleAddReply} />
      )}
    </div>
  );
};

export default PDFViewer;
