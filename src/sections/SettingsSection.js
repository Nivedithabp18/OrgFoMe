import React, { useState, useEffect } from 'react';
import { storageSet } from '../utils/storage';
import { THEMES } from '../utils/themes';
import Icon from '../components/Icon';
import { Input, Card } from '../components/UI';

const SettingsSection = ({ T, mob, currentTheme, setCurrentTheme, notifEmail, setNotifEmail }) => {
  const [emailInput, setEmailInput] = useState(notifEmail || '');
  const [saved, setSaved] = useState(false);

  useEffect(() => { setEmailInput(notifEmail || ''); }, [notifEmail]);

  const saveEmail = () => {
    setNotifEmail(emailInput);
    storageSet('notif_email', emailInput);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: mob ? 22 : 30, fontWeight: 700, color: T.text, margin: '0 0 4px' }}>Settings</h1>
      <p style={{ color: T.subtext, fontSize: mob ? 11 : 13, margin: `0 0 ${mob ? 18 : 28}px`, fontFamily: "'DM Sans', sans-serif" }}>Customize your workspace</p>

      {/* Theme */}
      <Card T={T} mob={mob} style={{ padding: mob ? '14px 14px' : '20px 22px', marginBottom: mob ? 12 : 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: mob ? 12 : 16 }}>
          <Icon name="palette" size={mob ? 15 : 18} color={T.text} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: mob ? 13 : 15, color: T.text }}>Theme</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: mob ? 8 : 10 }}>
          {Object.entries(THEMES).map(([key, theme]) => {
            const sel = currentTheme === key;
            return (
              <button key={key}
                onClick={() => { setCurrentTheme(key); storageSet('theme', key); }}
                style={{ border: `2px solid ${sel ? T.btnPrimary : T.cardBorder}`, borderRadius: mob ? 10 : 12, padding: mob ? '10px 6px' : '13px 8px', cursor: 'pointer', background: sel ? T.btnPrimary + '18' : T.inputBg, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: mob ? 4 : 6, transition: 'all 0.2s', width: '100%' }}>
                <span style={{ fontSize: mob ? 18 : 22 }}>{theme.emoji}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: mob ? 11 : 13, color: sel ? T.btnPrimary : T.text }}>{theme.name}</span>
                {sel && <span style={{ width: 4, height: 4, borderRadius: '50%', background: T.btnPrimary, display: 'block' }} />}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Email Notifications */}
      <Card T={T} mob={mob} style={{ padding: mob ? '14px 14px' : '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: mob ? 10 : 12 }}>
          <Icon name="mail" size={mob ? 15 : 18} color={T.text} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: mob ? 13 : 15, color: T.text }}>Email Notifications</span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mob ? 11 : 13, color: T.subtext, margin: `0 0 ${mob ? 10 : 14}px`, lineHeight: 1.5 }}>
          24h reminder before each to-do task is due.
        </p>
        <Input label="Add email" value={emailInput} onChange={setEmailInput} placeholder="you@example.com" type="email" T={T} mob={mob} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <button onClick={saveEmail} style={{ background: saved ? '#27ae60' : T.btnPrimary, color: '#fff', border: 'none', borderRadius: mob ? 8 : 10, padding: mob ? '8px 16px' : '9px 18px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: mob ? 12 : 13, transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
            {saved ? '✓ Saved!' : 'Save Email'}
          </button>
          {notifEmail && (
            <p style={{ fontSize: mob ? 10 : 12, color: T.subtext, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
              Current: <strong style={{ color: T.text }}>{notifEmail}</strong>
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SettingsSection;
