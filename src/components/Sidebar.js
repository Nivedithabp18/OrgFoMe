import React from 'react';
import Icon from './Icon';
import { ACCENT } from '../utils/themes';

const NAV_ITEMS = [
  { id: 'documents', label: 'Documents',     icon: 'document' },
  { id: 'subjects',  label: 'Subjects',      icon: 'subjects'  },
  { id: 'projects',  label: 'Projects',      icon: 'projects'  },
  { id: 'links',     label: 'Links & Details', icon: 'link'    },
  { id: 'todo',      label: 'To-Do List',    icon: 'todo'      },
  { id: 'settings',  label: 'Settings',      icon: 'settings'  },
];

// ─── Desktop Sidebar ───────────────────────────────────────────────────────────
export const DesktopSidebar = ({ active, setActive, T }) => (
  <div style={{ width: 218, flexShrink: 0, background: T.sidebar, borderRight: `1.5px solid ${T.border}`, display: 'flex', flexDirection: 'column', padding: '24px 12px', boxShadow: `2px 0 16px ${T.shadow}`, transition: 'background 0.3s', zIndex: 10 }}>
    {/* Logo */}
    <div style={{ padding: '0 6px', marginBottom: 26 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: T.logoBox, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="user" size={16} color={T.logoText} />
        </div>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, color: T.text, lineHeight: 1.1 }}>Niveditha</div>
          <div style={{ fontSize: 10, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>Personal Workspace</div>
        </div>
      </div>
    </div>

    {/* Nav */}
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
      {NAV_ITEMS.map(item => {
        const isActive = active === item.id;
        const acc = ACCENT[item.id] || T.subtext;
        return (
          <button key={item.id} onClick={() => setActive(item.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 11, border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s', background: isActive ? `${acc}1a` : 'transparent', color: isActive ? acc : T.subtext, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: isActive ? 600 : 400 }}>
            <Icon name={item.icon} size={16} color={isActive ? acc : T.muted} />
            {item.label}
            {isActive && <div style={{ width: 4, height: 4, borderRadius: '50%', background: acc, marginLeft: 'auto', flexShrink: 0 }} />}
          </button>
        );
      })}
    </nav>

    <div style={{ borderTop: `1px solid ${T.sidebarFooter}`, padding: '12px 6px 0' }}>
      <p style={{ fontSize: 10, color: T.muted, fontFamily: "'DM Sans', sans-serif", margin: 0, lineHeight: 1.6 }}>Data stored in browser</p>
    </div>
  </div>
);

// ─── Mobile Header ─────────────────────────────────────────────────────────────
export const MobileHeader = ({ active, setActive, T }) => (
  <div style={{ background: T.sidebar, borderBottom: `1px solid ${T.border}`, padding: '10px 14px 8px', flexShrink: 0, boxShadow: `0 1px 12px ${T.shadow}` }}>
    {/* Name row */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <div style={{ width: 26, height: 26, borderRadius: 8, background: T.logoBox, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name="user" size={12} color={T.logoText} />
      </div>
      <div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 700, color: T.text, lineHeight: 1 }}>Niveditha</div>
        <div style={{ fontSize: 9, color: T.muted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1 }}>Personal Workspace</div>
      </div>
    </div>

    {/* Icon nav */}
    <div style={{ display: 'flex', gap: 0, justifyContent: 'space-between' }}>
      {NAV_ITEMS.map(item => {
        const isActive = active === item.id;
        const acc = ACCENT[item.id] || T.subtext;
        return (
          <div key={item.id} className="mnav-btn" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => setActive(item.id)}
              style={{ width: 36, height: 34, borderRadius: 9, border: 'none', cursor: 'pointer', background: isActive ? `${acc}20` : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, transition: 'all 0.18s', position: 'relative' }}>
              <Icon name={item.icon} size={16} color={isActive ? acc : T.muted} />
              {isActive && <div style={{ width: 3, height: 3, borderRadius: '50%', background: acc }} />}
            </button>
            <div className="mnav-tip">{item.label}</div>
          </div>
        );
      })}
    </div>
  </div>
);
