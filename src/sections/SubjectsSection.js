import React, { useState, useEffect, useRef } from 'react';
import { storageGet, storageSet } from '../utils/storage';
import { ACCENT } from '../utils/themes';
import Icon from '../components/Icon';
import { Modal, AddBtn, Btn, Input, Tag, SectionHeader, Empty, Card, TrashBtn } from '../components/UI';

const SubjectsSection = ({ T, mob }) => {
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(null);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [sem, setSem] = useState('');
  const [fileModal, setFileModal] = useState(false);
  const [fname, setFname] = useState('');
  const [note, setNote] = useState('');
  const [file, setFile] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    const d = storageGet('subjects');
    if (d) setSubjects(d);
  }, []);

  const save = (d) => { setSubjects(d); storageSet('subjects', d); };

  const addSubject = () => {
    if (!name.trim()) return;
    save([...subjects, { id: Date.now(), name: name.trim(), semester: sem.trim(), files: [] }]);
    setModal(false); setName(''); setSem('');
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => setFile({ data: ev.target.result, type: f.type, origName: f.name });
    reader.readAsDataURL(f);
  };

  const addFile = () => {
    if (!fname.trim() && !note.trim() && !file) return;
    save(subjects.map(s => s.id === open
      ? { ...s, files: [...s.files, { id: Date.now(), name: fname || file?.origName || 'Note', note, file }] }
      : s
    ));
    setFileModal(false); setFname(''); setNote(''); setFile(null);
  };

  const openSub = subjects.find(s => s.id === open);

  return (
    <div>
      {!open ? (
        <>
          <SectionHeader title="Subjects" sub="Semester folders" onAdd={() => setModal(true)} accent={ACCENT.subjects} T={T} mob={mob} />
          {subjects.length === 0 && <Empty icon="subjects" text="No subjects yet." T={T} mob={mob} />}
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(auto-fill,minmax(180px,1fr))', gap: mob ? 10 : 13 }}>
            {subjects.map(s => (
              <Card key={s.id} T={T} mob={mob} style={{ padding: mob ? '14px 12px' : '20px 16px', cursor: 'pointer', position: 'relative' }}>
                <div onClick={() => setOpen(s.id)}>
                  <Icon name="folder" size={mob ? 22 : 28} color={ACCENT.subjects} />
                  <div style={{ marginTop: mob ? 7 : 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: mob ? 12 : 14, color: T.text }}>{s.name}</div>
                  {s.semester && <div style={{ marginTop: 4 }}><Tag label={s.semester} T={T} mob={mob} /></div>}
                  <div style={{ marginTop: 5, fontSize: mob ? 10 : 12, color: T.subtext, fontFamily: "'DM Sans', sans-serif" }}>{s.files.length} item{s.files.length !== 1 ? 's' : ''}</div>
                </div>
                <button onClick={e => { e.stopPropagation(); save(subjects.filter(x => x.id !== s.id)); }} style={{ position: 'absolute', top: mob ? 8 : 10, right: mob ? 8 : 10, background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                  <Icon name="trash" size={mob ? 12 : 14} color="#ffaaaa" />
                </button>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: mob ? 10 : 14, marginBottom: mob ? 16 : 22 }}>
            <button onClick={() => setOpen(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
              <Icon name="back" size={mob ? 18 : 22} color={T.subtext} />
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: mob ? 20 : 27, fontWeight: 700, color: T.text, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{openSub?.name}</h1>
              {openSub?.semester && <div style={{ marginTop: 3 }}><Tag label={openSub.semester} T={T} mob={mob} /></div>}
            </div>
            <AddBtn onClick={() => setFileModal(true)} T={T} accent={ACCENT.subjects} mob={mob} />
          </div>
          {openSub?.files.length === 0 && <Empty icon="file" text="No items yet." T={T} mob={mob} />}
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(auto-fill,minmax(160px,1fr))', gap: mob ? 10 : 13 }}>
            {openSub?.files.map(f => (
              <Card key={f.id} T={T} mob={mob} style={{ overflow: 'hidden' }}>
                {f.file?.type?.startsWith('image/') && <img src={f.file.data} alt={f.name} style={{ width: '100%', height: mob ? 70 : 90, objectFit: 'cover' }} />}
                <div style={{ padding: mob ? '8px 10px' : '11px 13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: mob ? 11 : 13, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{f.name}</span>
                    <TrashBtn onClick={() => save(subjects.map(s => s.id === open ? { ...s, files: s.files.filter(x => x.id !== f.id) } : s))} mob={mob} />
                  </div>
                  {f.note && <p style={{ fontSize: mob ? 10 : 12, color: T.subtext, marginTop: 4, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>{f.note}</p>}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title="Add Subject" T={T} mob={mob}>
        <Input label="Subject Name" value={name} onChange={setName} placeholder="e.g. Machine Learning" T={T} mob={mob} />
        <Input label="Semester (optional)" value={sem} onChange={setSem} placeholder="e.g. Sem 5" T={T} mob={mob} />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Btn variant="ghost" onClick={() => setModal(false)} T={T} mob={mob}>Cancel</Btn>
          <Btn onClick={addSubject} T={T} mob={mob}>Add</Btn>
        </div>
      </Modal>

      <Modal open={fileModal} onClose={() => setFileModal(false)} title="Add Item" T={T} mob={mob}>
        <Input label="Name" value={fname} onChange={setFname} placeholder="e.g. Chapter 3 Notes" T={T} mob={mob} />
        <Input label="Notes (optional)" value={note} onChange={setNote} multiline placeholder="Write your notes..." T={T} mob={mob} />
        <div style={{ marginBottom: mob ? 12 : 16 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: mob ? 11 : 13, color: T.subtext, fontFamily: "'DM Sans', sans-serif" }}>File (optional)</label>
          <input ref={fileRef} type="file" accept="image/*,.pdf" onChange={handleFile} style={{ display: 'none' }} />
          <Btn variant="ghost" onClick={() => fileRef.current.click()} T={T} mob={mob}>
            <Icon name="file" size={mob ? 13 : 15} color={T.btnGhostText} /> Choose
          </Btn>
          {file && <p style={{ marginTop: 5, fontSize: mob ? 10 : 12, color: T.subtext, fontFamily: "'DM Sans', sans-serif" }}>✓ {file.origName}</p>}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Btn variant="ghost" onClick={() => setFileModal(false)} T={T} mob={mob}>Cancel</Btn>
          <Btn onClick={addFile} T={T} mob={mob}>Save</Btn>
        </div>
      </Modal>
    </div>
  );
};

export default SubjectsSection;
