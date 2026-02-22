import React, { useState, useEffect, useRef } from 'react';
import { storageGet, storageSet } from '../utils/storage';
import { ACCENT } from '../utils/themes';
import Icon from '../components/Icon';
import { Modal, AddBtn, Btn, Input, SectionHeader, Empty, Card, TrashBtn } from '../components/UI';

const ProjectsSection = ({ T, mob }) => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(null);
  const [modal, setModal] = useState(false);
  const [pname, setPname] = useState('');
  const [pdesc, setPdesc] = useState('');
  const [itemModal, setItemModal] = useState(false);
  const [iname, setIname] = useState('');
  const [inote, setInote] = useState('');
  const [ifile, setIfile] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    const d = storageGet('projects');
    if (d) setProjects(d);
  }, []);

  const save = (d) => { setProjects(d); storageSet('projects', d); };

  const addProject = () => {
    if (!pname.trim()) return;
    save([...projects, { id: Date.now(), name: pname.trim(), desc: pdesc.trim(), items: [] }]);
    setModal(false); setPname(''); setPdesc('');
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => setIfile({ data: ev.target.result, type: f.type, origName: f.name });
    reader.readAsDataURL(f);
  };

  const addItem = () => {
    if (!iname.trim() && !inote.trim() && !ifile) return;
    save(projects.map(p => p.id === open
      ? { ...p, items: [...p.items, { id: Date.now(), name: iname || ifile?.origName || 'Item', note: inote, file: ifile }] }
      : p
    ));
    setItemModal(false); setIname(''); setInote(''); setIfile(null);
  };

  const openProj = projects.find(p => p.id === open);

  return (
    <div>
      {!open ? (
        <>
          <SectionHeader title="Projects" sub="Your project workspace" onAdd={() => setModal(true)} accent={ACCENT.projects} T={T} mob={mob} />
          {projects.length === 0 && <Empty icon="projects" text="No projects yet." T={T} mob={mob} />}
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(auto-fill,minmax(185px,1fr))', gap: mob ? 10 : 13 }}>
            {projects.map(p => (
              <Card key={p.id} T={T} mob={mob} style={{ padding: mob ? '14px 12px' : '20px 16px', cursor: 'pointer', position: 'relative' }}>
                <div onClick={() => setOpen(p.id)}>
                  <Icon name="folder" size={mob ? 22 : 28} color={ACCENT.projects} />
                  <div style={{ marginTop: mob ? 7 : 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: mob ? 12 : 14, color: T.text }}>{p.name}</div>
                  {p.desc && <p style={{ fontSize: mob ? 10 : 12, color: T.subtext, marginTop: 4, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.3 }}>{p.desc.slice(0, 45)}{p.desc.length > 45 ? '…' : ''}</p>}
                  <div style={{ marginTop: 5, fontSize: mob ? 10 : 12, color: T.subtext, fontFamily: "'DM Sans', sans-serif" }}>{p.items.length} item{p.items.length !== 1 ? 's' : ''}</div>
                </div>
                <button onClick={e => { e.stopPropagation(); save(projects.filter(x => x.id !== p.id)); if (open === p.id) setOpen(null); }}
                  style={{ position: 'absolute', top: mob ? 8 : 10, right: mob ? 8 : 10, background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
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
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: mob ? 20 : 27, fontWeight: 700, color: T.text, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{openProj?.name}</h1>
              {openProj?.desc && <p style={{ color: T.subtext, fontSize: mob ? 11 : 13, margin: '3px 0 0', fontFamily: "'DM Sans', sans-serif" }}>{openProj.desc}</p>}
            </div>
            <AddBtn onClick={() => setItemModal(true)} T={T} accent={ACCENT.projects} mob={mob} />
          </div>
          {openProj?.items.length === 0 && <Empty icon="file" text="No items yet." T={T} mob={mob} />}
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(auto-fill,minmax(180px,1fr))', gap: mob ? 10 : 13 }}>
            {openProj?.items.map(item => (
              <Card key={item.id} T={T} mob={mob} style={{ overflow: 'hidden' }}>
                {item.file?.type?.startsWith('image/') && <img src={item.file.data} alt={item.name} style={{ width: '100%', height: mob ? 80 : 105, objectFit: 'cover' }} />}
                {item.file && !item.file.type?.startsWith('image/') && (
                  <div style={{ height: mob ? 55 : 70, background: T.overdueBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="file" size={mob ? 22 : 26} color="#c0392b" />
                  </div>
                )}
                <div style={{ padding: mob ? '8px 10px' : '11px 13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: mob ? 11 : 13, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{item.name}</span>
                    <TrashBtn onClick={() => save(projects.map(p => p.id === open ? { ...p, items: p.items.filter(i => i.id !== item.id) } : p))} mob={mob} />
                  </div>
                  {item.note && <p style={{ fontSize: mob ? 10 : 12, color: T.subtext, marginTop: 4, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.3 }}>{item.note}</p>}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title="New Project" T={T} mob={mob}>
        <Input label="Project Name" value={pname} onChange={setPname} placeholder="e.g. Final Year Project" T={T} mob={mob} />
        <Input label="Description (optional)" value={pdesc} onChange={setPdesc} multiline placeholder="Brief description..." T={T} mob={mob} />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Btn variant="ghost" onClick={() => setModal(false)} T={T} mob={mob}>Cancel</Btn>
          <Btn onClick={addProject} T={T} mob={mob}>Create</Btn>
        </div>
      </Modal>

      <Modal open={itemModal} onClose={() => setItemModal(false)} title="Add Item" T={T} mob={mob}>
        <Input label="Name" value={iname} onChange={setIname} placeholder="e.g. Design Mockup" T={T} mob={mob} />
        <Input label="Notes" value={inote} onChange={setInote} multiline placeholder="Write notes..." T={T} mob={mob} />
        <div style={{ marginBottom: mob ? 12 : 16 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: mob ? 11 : 13, color: T.subtext, fontFamily: "'DM Sans', sans-serif" }}>File (any type)</label>
          <input ref={fileRef} type="file" onChange={handleFile} style={{ display: 'none' }} />
          <Btn variant="ghost" onClick={() => fileRef.current.click()} T={T} mob={mob}>
            <Icon name="file" size={mob ? 13 : 15} color={T.btnGhostText} /> Choose
          </Btn>
          {ifile && <p style={{ marginTop: 5, fontSize: mob ? 10 : 12, color: T.subtext, fontFamily: "'DM Sans', sans-serif" }}>✓ {ifile.origName}</p>}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Btn variant="ghost" onClick={() => setItemModal(false)} T={T} mob={mob}>Cancel</Btn>
          <Btn onClick={addItem} T={T} mob={mob}>Save</Btn>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectsSection;
