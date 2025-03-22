import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const pdfFiles = [
    { name: 'Annual Report.pdf', url: 'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf' },
    { name: 'Project Docs.pdf', url: 'https://pdfobject.com/pdf/sample.pdf' },
    { name: 'Technical Specs.pdf', url: 'https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf' },
    { name: 'Meeting Notes.pdf', url: 'https://pdfobject.com/pdf/sample.pdf' },
    { name: 'User Manual.pdf', url: 'https://pdfobject.com/pdf/sample.pdf' },
    { name: 'Financial Review.pdf', url: 'https://pdfobject.com/pdf/sample.pdf' },
  ];

  const handlePdfClick = (pdfUrl: string) => {
    navigate(`/view`, { state: { pdfUrl } });
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '24px',
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '16px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const fileItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const iconContainerStyle = {
    width: '64px',
    height: '64px',
    backgroundColor: '#fee2e2',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
  };

  const pdfIconStyle = {
    width: '40px',
    height: '40px',
    color: '#dc2626',
  };

  const fileNameStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#1e293b',
    textAlign: 'center',
    wordBreak: 'break-word',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1e293b', marginBottom: '24px' }}>
        My Documents
      </h1>
      
      <div style={gridContainerStyle}>
        {pdfFiles.map((pdf, index) => (
          <div
            key={index}
            style={{
              ...fileItemStyle,
              backgroundColor: hoveredIndex === index ? '#f1f5f9' : 'transparent',
            }}
            onClick={() => handlePdfClick(pdf.url)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div style={iconContainerStyle}>
              <svg
                style={pdfIconStyle}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span style={fileNameStyle}>{pdf.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;