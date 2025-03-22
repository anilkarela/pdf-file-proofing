import { useEffect, useRef, useState } from "react";

interface DraggableResizableCommentInputProps {
  initialX: number;
  initialY: number;
  onSave: (
    text: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) => void;
  onCancel: () => void;
}

const DraggableResizableCommentInput: React.FC<
  DraggableResizableCommentInputProps
> = ({ initialX, initialY, onSave, onCancel }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("drag-handle")) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      e.stopPropagation();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleSave = () => {
    const text = contentRef.current?.innerText.trim() || "";
    const headerHeight = headerRef.current?.clientHeight || 0;
    const measuredWidth = contentRef.current?.scrollWidth || 260;
    const measuredHeight = contentRef.current?.scrollHeight || 120;
    onSave(
      text,
      position.x,
      position.y + headerHeight,
      measuredWidth,
      measuredHeight
    );
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: "260px",
        minHeight: "120px",
        zIndex: 1000,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        background: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        resize: "both",
        overflow: "hidden",
        transition: "all 0.2s ease",
      }}
    >
      <div
        className="drag-handle"
        ref={headerRef}
        style={{
          cursor: "move",
          padding: "12px",
          background: "#f8f9fa",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        <span style={{ fontSize: "14px", color: "#666" }}>New Comment</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleSave}
            style={{
              width: "28px",
              height: "28px",
              background: "#4CAF50",
              border: "none",
              borderRadius: "50%",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            title="Save comment"
          >
            ✓
          </button>
          <button
            onClick={onCancel}
            style={{
              width: "28px",
              height: "28px",
              background: "#f44336",
              border: "none",
              borderRadius: "50%",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            title="Cancel"
          >
            ✕
          </button>
        </div>
      </div>

      <div
        ref={contentRef}
        contentEditable
        style={{
          padding: "12px",
          outline: "none",
          fontSize: "14px",
          lineHeight: "1.5",
          minHeight: "80px",
          maxHeight: "200px",
          overflowY: "auto",
          color: "#333",
        }}
      />
    </div>
  );
};

export default DraggableResizableCommentInput;
