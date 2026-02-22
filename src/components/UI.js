import React, { useState } from 'react';
import Icon from './Icon';

// ─── Modal ─────────────────────────────────────────────────────────────────────
export const Modal = ({ open, onClose, title, children, T, mob }) => {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.overlay, backdropFilter: 'blur(3px)', padding: mob ? '8px' : '0' }}>
      <div style={{ background: T.modalBg, borderRadius: mob ? 14 : 18, padding: mob ? '18px 16px' : '26px 28px', minWidth: 0, maxWidth: 480, width: '100%', boxShadow: `0 8px 48px ${T.shadow}`, border: `1px solid ${T.border}`, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: mob ? 14 : 20 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: mob ? 17 : 21, fontWeight: 700, color: T.text }}>{title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexShrink: 0 }}>
            <Icon name="close" size={mob ? 16 : 18} color={T.subtext} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// ─── AddBtn ────────────────────────────────────────────────────────────────────
export const AddBtn = ({ onClick, T, accent, mob }) => (
  <button onClick={onClick} title="Add" style={{ width: mob ? 32 : 38, height: mob ? 32 : 38, borderRadius: '50%', border: 'none', cursor: 'pointer', background: accent || T.btnPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 10px ${(accent || T.btnPrimary)}55`, transition: 'all 0.18s', flexShrink: 0 }}>
    <Icon name="plus" size={mob ? 13 : 16} color="#fff" />
  </button>
);

// ─── Btn ───────────────────────────────────────────────────────────────────────
export const Btn = ({ onClick, children, variant = 'primary', T, mob, style = {} }) => {
  const base = { border: 'none', borderRadius: mob ? 8 : 10, padding: mob ? '7px 12px' : '9px 16px', fontSize: mob ? 12 : 13, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, transition: 'all 0.18s', whiteSpace: 'nowrap', ...style };
  const v = {
    primary: { background: T.btnPrimary, color: T.btnPrimaryText },
    ghost:   { background: T.btnGhost,   color: T.btnGhostText   },
  };
  return <button onClick={onClick} style={{ ...base, ...v[variant] }}>{children}</button>;
};

// ─── Input ─────────────────────────────────────────────────────────────────────
export const Input = ({ label, value, onChange, type = 'text', placeholder = '', multiline = false, T, mob, ...rest }) => (
  <div style={{ marginBottom: mob ? 12 : 15 }}>
    {label && <label style={{ display: 'block', marginBottom: 5, fontSize: mob ? 11 : 13, color: T.subtext, fontFamily: "'DM Sans', sans-serif" }}>{label}</label>}
    {multiline
      ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
          style={{ width: '100%', border: `1.5px solid ${T.inputBorder}`, borderRadius: mob ? 8 : 10, padding: mob ? '8px 10px' : '10px 13px', fontSize: mob ? 12 : 13, fontFamily: "'DM Sans', sans-serif", resize: 'vertical', outline: 'none', background: T.inputBg, color: T.text, boxSizing: 'border-box' }} />
      : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} {...rest}
          style={{ width: '100%', border: `1.5px solid ${T.inputBorder}`, borderRadius: mob ? 8 : 10, padding: mob ? '8px 10px' : '10px 13px', fontSize: mob ? 12 : 13, fontFamily: "'DM Sans', sans-serif", outline: 'none', background: T.inputBg, color: T.text, boxSizing: 'border-box' }} />
    }
  </div>
);

// ─── Tag ───────────────────────────────────────────────────────────────────────
export const Tag = ({ label, T, mob }) => (
  <span style={{ background: T.tagBg, color: T.tagText, borderRadius: 5, padding: mob ? '1px 7px' : '2px 9px', fontSize: mob ? 10 : 12, fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
);

// ─── SectionHeader ─────────────────────────────────────────────────────────────
export const SectionHeader = ({ title, sub, onAdd, accent, T, mob }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: mob ? 16 : 24 }}>
    <div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: mob ? 22 : 30, fontWeight: 700, color: T.text, margin: 0, lineHeight: 1.1 }}>{title}</h1>
      {sub && <p style={{ color: T.subtext, fontSize: mob ? 11 : 13, margin: '3px 0 0', fontFamily: "'DM Sans', sans-serif" }}>{sub}</p>}
    </div>
    <AddBtn onClick={onAdd} T={T} accent={accent} mob={mob} />
  </div>
);

// ─── Empty ─────────────────────────────────────────────────────────────────────
export const Empty = ({ icon, text, T, mob }) => (
  <div style={{ textAlign: 'center', padding: mob ? '40px 0' : '70px 0', color: T.muted }}>
    <Icon name={icon} size={mob ? 32 : 42} color={T.muted} />
    <p style={{ marginTop: 10, fontFamily: "'DM Sans', sans-serif", fontSize: mob ? 12 : 14 }}>{text}</p>
  </div>
);

// ─── Card ──────────────────────────────────────────────────────────────────────
export const Card = ({ children, T, mob, style = {} }) => (
  <div style={{ background: T.cardBg, border: `1.5px solid ${T.cardBorder}`, borderRadius: mob ? 10 : 13, boxShadow: `0 2px 10px ${T.shadow}`, ...style }}>
    {children}
  </div>
);

// ─── RowItem ───────────────────────────────────────────────────────────────────
export const RowItem = ({ left, center, right, T, mob }) => (
  <div style={{ background: T.cardBg, border: `1.5px solid ${T.cardBorder}`, borderRadius: mob ? 10 : 13, padding: mob ? '10px 12px' : '13px 16px', display: 'flex', alignItems: 'center', gap: mob ? 10 : 13, boxShadow: `0 1px 6px ${T.shadow}` }}>
    {left}
    <div style={{ flex: 1, minWidth: 0 }}>{center}</div>
    <div style={{ display: 'flex', gap: mob ? 5 : 7, flexShrink: 0, alignItems: 'center' }}>{right}</div>
  </div>
);

// ─── IconBox ───────────────────────────────────────────────────────────────────
export const IconBox = ({ name, color, bg, mob }) => (
  <div style={{ width: mob ? 30 : 36, height: mob ? 30 : 36, borderRadius: mob ? 8 : 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <Icon name={name} size={mob ? 13 : 16} color={color} />
  </div>
);

// ─── Tabs ──────────────────────────────────────────────────────────────────────
export const Tabs = ({ tabs, active, onChange, T, mob }) => (
  <div style={{ display: 'flex', gap: 3, marginBottom: mob ? 14 : 20, background: T.tabBg, borderRadius: mob ? 8 : 11, padding: 3, width: 'fit-content' }}>
    {tabs.map(t => (
      <button key={t.id} onClick={() => onChange(t.id)} style={{ border: 'none', borderRadius: mob ? 6 : 9, padding: mob ? '5px 10px' : '6px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: mob ? 11 : 13, cursor: 'pointer', background: active === t.id ? T.tabActiveBg : 'transparent', color: active === t.id ? T.text : T.subtext, boxShadow: active === t.id ? `0 1px 6px ${T.shadow}` : 'none', fontWeight: active === t.id ? 600 : 400, transition: 'all 0.18s', whiteSpace: 'nowrap' }}>
        {t.label}
      </button>
    ))}
  </div>
);

// ─── CopyBtn ───────────────────────────────────────────────────────────────────
export const CopyBtn = ({ text, T, mob }) => {
  const [copied, setCopied] = useState(false);
  const doCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={doCopy} style={{ background: copied ? T.doneBg : T.btnGhost, border: 'none', borderRadius: mob ? 6 : 8, padding: mob ? '5px 8px' : '6px 10px', cursor: 'pointer', fontSize: mob ? 10 : 12, fontFamily: "'DM Sans', sans-serif", color: copied ? T.doneText : T.btnGhostText, transition: 'all 0.18s', flexShrink: 0 }}>
      {copied ? '✓' : 'Copy'}
    </button>
  );
};

// ─── TrashBtn ──────────────────────────────────────────────────────────────────
export const TrashBtn = ({ onClick, mob }) => (
  <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: mob ? 2 : 3, flexShrink: 0 }}>
    <Icon name="trash" size={mob ? 13 : 15} color="#ffaaaa" />
  </button>
);
