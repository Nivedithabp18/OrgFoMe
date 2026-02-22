import React, { useState, useEffect, useRef } from 'react';
import { storageGet, storageSet } from '../utils/storage';
import { ACCENT } from '../utils/themes';
import Icon from '../components/Icon';
import { Modal, AddBtn, Btn, Input, SectionHeader, Empty, Card, TrashBtn } from '../components/UI';

const DocumentsSection = ({ T, mob }) => {
  const [docs, setDocs] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    const d = storageGet('docs');
    if (d) setDocs(d);
  }, []);

  const save = (d) => { setDocs(d); storageSet('docs', d); };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => setPreview({ data: ev.target.result, type: f.type, fname: f.name });
    reader.readAsDataURL(f);
  };

  const add = () => {
    if (!name.trim() || !preview) return;
    save([...docs, { id: Date.now(), name: name.trim(), ...preview }]);
    setModal(false); setName(''); setPreview(null);
  };

  return (
    <div>
      <SectionHeader
        title="Documents"
        sub={`${docs.length} file${docs.length !== 1 ? 's' : ''} saved`}
        onAdd={() => setModal(true)}
        accent={ACCENT.documents}
        T={T} mob={mob}
      />

      {docs.length === 0 && <Empty icon="document" text="No documents yet. Tap + to add!" T={T} mob={mob} />}

      <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(auto-fill,minmax(150px,1fr))', gap: mob ? 10 : 13 }}>
        {docs.map(doc => (
          <Card key={doc.id} T={T} mob={mob} style={{ overflow: 'hidden' }}>
            <div style={{ height: mob ? 85 : 110, background: T.inputBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {doc.type?.startsWith('image/')
                ? <img src={doc.data} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <Icon name="pdf" size={mob ? 32 : 40} color="#c0392b" />
              }
            </div>
            <div style={{ padding: mob ? '7px 9px' : '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
              <span style={{ fontSize: mob ? 11 : 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{doc.name}</span>
              <TrashBtn onClick={() => save(docs.filter(d => d.id !== doc.id))} mob={mob} />
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Add Document" T={T} mob={mob}>
        <Input label="Name" value={name} onChange={setName} placeholder="e.g. Semester Notes" T={T} mob={mob} />
        <div style={{ marginBottom: mob ? 12 : 16 }}>
          <label style={{ display: 'block', marginBottom: 6, fontSize: mob ? 11 : 13, color: T.subtext, fontFamily: "'DM Sans', sans-serif" }}>File (PDF or Image)</label>
          <input ref={fileRef} type="file" accept=".pdf,image/*" onChange={handleFile} style={{ display: 'none' }} />
          <Btn variant="ghost" onClick={() => fileRef.current.click()} T={T} mob={mob}>
            <Icon name="file" size={mob ? 13 : 15} color={T.btnGhostText} /> Choose
          </Btn>
          {preview && <p style={{ marginTop: 6, fontSize: mob ? 11 : 13, color: T.subtext, fontFamily: "'DM Sans', sans-serif" }}>✓ {preview.fname}</p>}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Btn variant="ghost" onClick={() => setModal(false)} T={T} mob={mob}>Cancel</Btn>
          <Btn onClick={add} T={T} mob={mob}>Save</Btn>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentsSection;
