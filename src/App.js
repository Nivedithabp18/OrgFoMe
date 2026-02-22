import React, { useState, useEffect } from 'react';
import { storageGet, storageSet } from './utils/storage';
import { THEMES } from './utils/themes';
import useIsMobile from './utils/useIsMobile';
import { DesktopSidebar, MobileHeader } from './components/Sidebar';
import DocumentsSection from './sections/DocumentsSection';
import SubjectsSection  from './sections/SubjectsSection';
import ProjectsSection  from './sections/ProjectsSection';
import LinksSection     from './sections/LinksSection';
import TodoSection      from './sections/TodoSection';
import SettingsSection  from './sections/SettingsSection';

const App = () => {
  const [active, setActive]           = useState('documents');
  const [currentTheme, setCurrentTheme] = useState('light');
  const [notifEmail, setNotifEmail]   = useState('');
  const mob = useIsMobile();
  const T   = THEMES[currentTheme] || THEMES.light;

  useEffect(() => {
    const t = storageGet('theme');
    if (t) setCurrentTheme(t);
    const e = storageGet('notif_email');
    if (e) setNotifEmail(e);
  }, []);

  const sharedProps = { T, mob };

  const renderSection = () => {
    switch (active) {
      case 'documents': return <DocumentsSection {...sharedProps} />;
      case 'subjects':  return <SubjectsSection  {...sharedProps} />;
      case 'projects':  return <ProjectsSection  {...sharedProps} />;
      case 'links':     return <LinksSection      {...sharedProps} />;
      case 'todo':      return <TodoSection       {...sharedProps} notifEmail={notifEmail} />;
      case 'settings':  return (
        <SettingsSection
          {...sharedProps}
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
          notifEmail={notifEmail}
          setNotifEmail={(email) => {
            setNotifEmail(email);
            storageSet('notif_email', email);
          }}
        />
      );
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', height: '100vh', background: T.bg, fontFamily: "'DM Sans', sans-serif", overflow: 'hidden', transition: 'background 0.3s' }}>

      {mob
        ? <MobileHeader active={active} setActive={setActive} T={T} />
        : <DesktopSidebar active={active} setActive={setActive} T={T} />
      }

      {/* Main content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: mob ? '14px 13px' : '34px 40px', transition: 'background 0.3s' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default App;
