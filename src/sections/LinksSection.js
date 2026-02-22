import React, { useState, useEffect } from 'react';
import { storageGet, storageSet } from '../utils/storage';
import { ACCENT } from '../utils/themes';
import Icon from '../components/Icon';
import { Modal, Btn, Input, SectionHeader, Empty, RowItem, IconBox, Tabs, CopyBtn, TrashBtn } from '../components/UI';

const LinksSection = ({ T, mob }) => {
  const [links, setLinks] = useState([]);
  const [passwords, setPasswords] = useState([]);
  const [tab, setTab] = useState('links');
  const [modal, setModal] = useState(false);
  const [pwModal, setPwModal] = useState(false);
  const [ltitle, setLtitle] = useState('');
  const [lurl, setLurl] = useState('');
  const [lcat, setLcat] = useState('');
  const [papp, setPapp] = useState('');
  const [ppass, setPpass] = useState('');
  const [showPw, setShowPw] = useState({});

  useEffect(() => {
    const l = storageGet('links'); if (l) setLinks(l);
    const p = storageGet('passwords'); if (p) setPasswords(p);
  }, []);

  const saveLinks = (d) => { setLinks(d); storageSet('links', d); };
  const savePws   = (d) => { setPasswords(d); storageSet('passwords', d); };

  const addLink = () => {
    if (!ltitle.trim() || !lurl.trim()) return;
    saveLinks([...links, { id: Date.now(), title: ltitle.trim(), url: lurl.trim(), cat: lcat.trim() }]);
    setModal(false); setLtitle(''); setLurl(''); setLcat('');
  };

  const addPw = () => {
    if (!papp.trim() || !ppass.trim()) return;
    savePws([...passwords, { id: Date.now(), app: papp.trim(), pass: ppass.trim() }]);
    setPwModal(false); setPapp(''); setPpass('');
  };

  return (
    <div>
      <SectionHeader
        title="Links & Details"
        sub="Links and passwords"
        onAdd={() => tab === 'links' ? setModal(true) : setPwModal(true)}
        accent={ACCENT.links}
        T={T} mob={mob}
      />

      <Tabs
        tabs={[{ id: 'links', label: '🔗 Links' }, { id: 'passwords', label: '🔒 Passwords' }]}
        active={tab} onChange={setTab} T={T} mob={mob}
      />

      {tab === 'links' && (
        <>
          {links.length === 0 && <Empty icon="link" text="No links saved yet." T={T} mob={mob} />}
          <div style={{ display: 'flex', flexDirection: 'column', gap: mob ? 8 : 10 }}>
            {links.map(l => (
              <RowItem key={l.id} T={T} mob={mob}
                left={<IconBox name="link" color={ACCENT.links} bg={T.infoBg} mob={mob} />}
                center={
                  <>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: mob ? 12 : 14, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.title}</div>
                    <a href={l.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: mob ? 10 : 12, color: ACCENT.links, textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{l.url}</a>
                    {l.cat && !mob && <span style={{ background: T.tagBg, color: T.tagText, borderRadius: 5, padding: '2px 9px', fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 3, display: 'inline-block' }}>{l.cat}</span>}
                  </>
                }
                right={<><CopyBtn text={l.url} T={T} mob={mob} /><TrashBtn onClick={() => saveLinks(links.filter(x => x.id !== l.id))} mob={mob} /></>}
              />
            ))}
          </div>
        </>
      )}

      {tab === 'passwords' && (
        <>
          <div style={{ background: T.warnBg, border: `1px solid ${T.warnBorder}`, borderRadius: mob ? 8 : 11, padding: mob ? '8px 10px' : '10px 14px', marginBottom: mob ? 10 : 14, display: 'flex', gap: 7, alignItems: 'center' }}>
            <span style={{ fontSize: mob ? 13 : 15 }}>⚠️</span>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mob ? 10 : 12, color: T.warnText, margin: 0 }}>Stored locally. Use a dedicated manager for critical passwords.</p>
          </div>
          {passwords.length === 0 && <Empty icon="lock" text="No passwords saved yet." T={T} mob={mob} />}
          <div style={{ display: 'flex', flexDirection: 'column', gap: mob ? 8 : 10 }}>
            {passwords.map(p => (
              <RowItem key={p.id} T={T} mob={mob}
                left={<IconBox name="lock" color={ACCENT.links} bg="#fff0f8" mob={mob} />}
                center={
                  <>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: mob ? 12 : 14, color: T.text }}>{p.app}</div>
                    <div style={{ fontFamily: 'monospace', fontSize: mob ? 11 : 13, color: T.subtext, letterSpacing: showPw[p.id] ? 0 : 3 }}>
                      {showPw[p.id] ? p.pass : '•'.repeat(Math.min(p.pass.length, 10))}
                    </div>
                  </>
                }
                right={
                  <>
                    <button onClick={() => setShowPw(s => ({ ...s, [p.id]: !s[p.id] }))} style={{ background: T.btnGhost, border: 'none', borderRadius: mob ? 6 : 8, padding: mob ? '5px' : '7px', cursor: 'pointer' }}>
                      <Icon name={showPw[p.id] ? 'eyeoff' : 'eye'} size={mob ? 12 : 14} color={T.subtext} />
                    </button>
                    <CopyBtn text={p.pass} T={T} mob={mob} />
                    <TrashBtn onClick={() => savePws(passwords.filter(x => x.id !== p.id))} mob={mob} />
                  </>
                }
              />
            ))}
          </div>
        </>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title="Save a Link" T={T} mob={mob}>
        <Input label="Title" value={ltitle} onChange={setLtitle} placeholder="e.g. ML Tutorial" T={T} mob={mob} />
        <Input label="URL" value={lurl} onChange={setLurl} placeholder="https://..." T={T} mob={mob} />
        <Input label="Category (optional)" value={lcat} onChange={setLcat} placeholder="e.g. YouTube" T={T} mob={mob} />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Btn variant="ghost" onClick={() => setModal(false)} T={T} mob={mob}>Cancel</Btn>
          <Btn onClick={addLink} T={T} mob={mob}>Save</Btn>
        </div>
      </Modal>

      <Modal open={pwModal} onClose={() => setPwModal(false)} title="Save a Password" T={T} mob={mob}>
        <Input label="App / Website" value={papp} onChange={setPapp} placeholder="e.g. Gmail" T={T} mob={mob} />
        <Input label="Password" type="password" value={ppass} onChange={setPpass} placeholder="Enter password" T={T} mob={mob} />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Btn variant="ghost" onClick={() => setPwModal(false)} T={T} mob={mob}>Cancel</Btn>
          <Btn onClick={addPw} T={T} mob={mob}>Save</Btn>
        </div>
      </Modal>
    </div>
  );
};

export default LinksSection;
