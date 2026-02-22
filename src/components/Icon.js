import React from 'react';

const Icon = ({ name, size = 18, color = 'currentColor' }) => {
  const icons = {
    document: (
      <>
        <rect x="4" y="2" width="12" height="16" rx="2" strokeWidth="1.5" stroke={color} fill="none" />
        <line x1="8" y1="8" x2="16" y2="8" strokeWidth="1.5" stroke={color} />
        <line x1="8" y1="12" x2="14" y2="12" strokeWidth="1.5" stroke={color} />
      </>
    ),
    subjects: (
      <path d="M4 19V5a2 2 0 012-2h10a2 2 0 012 2v14l-7-3-7 3z" strokeWidth="1.5" stroke={color} fill="none" />
    ),
    projects: (
      <>
        <rect x="2" y="6" width="20" height="14" rx="2" strokeWidth="1.5" stroke={color} fill="none" />
        <path d="M2 10h20M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="1.5" stroke={color} fill="none" />
      </>
    ),
    link: (
      <>
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeWidth="1.5" stroke={color} fill="none" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeWidth="1.5" stroke={color} fill="none" />
      </>
    ),
    todo: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="1.5" stroke={color} fill="none" />
        <path d="M16 3v4M8 3v4M3 11h18" strokeWidth="1.5" stroke={color} fill="none" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" stroke={color} fill="none" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeWidth="1.5" stroke={color} fill="none" />
      </>
    ),
    plus: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2.5" stroke={color} />
        <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2.5" stroke={color} />
      </>
    ),
    trash: (
      <>
        <polyline points="3 6 5 6 21 6" strokeWidth="1.5" stroke={color} fill="none" />
        <path d="M19 6l-1 14H6L5 6" strokeWidth="1.5" stroke={color} fill="none" />
        <path d="M10 11v6M14 11v6M9 6V4h6v2" strokeWidth="1.5" stroke={color} fill="none" />
      </>
    ),
    eye: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeWidth="1.5" stroke={color} fill="none" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" stroke={color} fill="none" />
      </>
    ),
    eyeoff: (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" strokeWidth="1.5" stroke={color} fill="none" />
        <line x1="1" y1="1" x2="23" y2="23" strokeWidth="1.5" stroke={color} />
      </>
    ),
    check: (
      <polyline points="20 6 9 17 4 12" strokeWidth="2" stroke={color} fill="none" />
    ),
    folder: (
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" strokeWidth="1.5" stroke={color} fill="none" />
    ),
    file: (
      <>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeWidth="1.5" stroke={color} fill="none" />
        <polyline points="14 2 14 8 20 8" strokeWidth="1.5" stroke={color} fill="none" />
      </>
    ),
    back: (
      <polyline points="15 18 9 12 15 6" strokeWidth="2" stroke={color} fill="none" />
    ),
    lock: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" strokeWidth="1.5" stroke={color} fill="none" />
        <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="1.5" stroke={color} fill="none" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" strokeWidth="1.5" stroke={color} fill="none" />
        <path d="M13.73 21a2 2 0 01-3.46 0" strokeWidth="1.5" stroke={color} fill="none" />
      </>
    ),
    close: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" stroke={color} />
        <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" stroke={color} />
      </>
    ),
    user: (
      <>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeWidth="1.5" stroke={color} fill="none" />
        <circle cx="12" cy="7" r="4" strokeWidth="1.5" stroke={color} fill="none" />
      </>
    ),
    mail: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="1.5" stroke={color} fill="none" />
        <polyline points="22,6 12,13 2,6" strokeWidth="1.5" stroke={color} fill="none" />
      </>
    ),
    palette: (
      <>
        <circle cx="12" cy="12" r="10" strokeWidth="1.5" stroke={color} fill="none" />
        <circle cx="8" cy="10" r="1.5" fill={color} />
        <circle cx="16" cy="10" r="1.5" fill={color} />
        <circle cx="8" cy="15" r="1.5" fill={color} />
        <circle cx="16" cy="15" r="1.5" fill={color} />
        <circle cx="12" cy="12" r="1.5" fill={color} />
      </>
    ),
    pdf: (
      <>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeWidth="1.5" stroke={color} fill="none" />
        <text x="6" y="18" fontSize="6" fill={color} fontWeight="bold">PDF</text>
      </>
    ),
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {icons[name] || null}
    </svg>
  );
};

export default Icon;
