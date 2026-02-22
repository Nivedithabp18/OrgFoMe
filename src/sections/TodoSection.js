import React, { useState, useEffect } from 'react';
import { storageGet, storageSet } from '../utils/storage';
import { ACCENT } from '../utils/themes';
import Icon from '../components/Icon';
import { Modal, Btn, Input, SectionHeader, Empty, Tabs, TrashBtn } from '../components/UI';

const TodoSection = ({ T, mob, notifEmail }) => {
  const [todos, setTodos] = useState([]);
  const [modal, setModal] = useState(false);
  const [ttitle, setTtitle] = useState('');
  const [tdesc, setTdesc] = useState('');
  const [tdate, setTdate] = useState('');
  const [ttime, setTtime] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const d = storageGet('todos');
    if (d) setTodos(d);
  }, []);

  const save = (d) => { setTodos(d); storageSet('todos', d); };

  const addTodo = () => {
    if (!ttitle.trim()) return;
    save([...todos, { id: Date.now(), title: ttitle.trim(), desc: tdesc.trim(), date: tdate, time: ttime, done: false }]);
    setModal(false); setTtitle(''); setTdesc(''); setTdate(''); setTtime('');
  };

  const toggle = (id) => save(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const now = Date.now();
  const isUrgent  = t => { if (!t.date || t.done) return false; const due = new Date(t.date + (t.time ? ' ' + t.time : '')).getTime(); return due - now <= 86400000 && due > now; };
  const isOverdue = t => { if (!t.date || t.done) return false; return new Date(t.date + (t.time ? ' ' + t.time : '')).getTime() < now; };

  const filtered = todos.filter(t =>
    filter === 'active' ? !t.done :
    filter === 'done'   ?  t.done : true
  );

  return (
    <div>
      <SectionHeader
        title="To-Do List"
        sub={`${todos.filter(t => !t.done).length} tasks remaining`}
        onAdd={() => setModal(true)}
        accent={ACCENT.todo}
        T={T} mob={mob}
      />

      {notifEmail && (
        <div style={{ background: T.infoBg, border: `1px solid ${T.infoBorder}`, borderRadius: mob ? 8 : 11, padding: mob ? '8px 10px' : '10px 14px', marginBottom: mob ? 12 : 16, display: 'flex', gap: 7, alignItems: 'center' }}>
          <Icon name="bell" size={mob ? 13 : 15} color={ACCENT.todo} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mob ? 10 : 12, color: T.infoText, margin: 0 }}>
            Reminders → <strong style={{ color: T.text }}>{notifEmail}</strong>. Edit in Settings.
          </p>
        </div>
      )}

      <Tabs
        tabs={[{ id: 'all', label: 'All' }, { id: 'active', label: 'Active' }, { id: 'done', label: 'Done' }]}
        active={filter} onChange={setFilter} T={T} mob={mob}
      />

      {filtered.length === 0 && <Empty icon="todo" text="No tasks here." T={T} mob={mob} />}

      <div style={{ display: 'flex', flexDirection: 'column', gap: mob ? 8 : 10 }}>
        {filtered.map(t => (
          <div key={t.id} style={{ background: T.cardBg, border: `1.5px solid ${isOverdue(t) ? T.overdueBg : isUrgent(t) ? T.urgentBg : T.cardBorder}`, borderRadius: mob ? 10 : 13, padding: mob ? '10px 12px' : '13px 16px', display: 'flex', alignItems: 'flex-start', gap: mob ? 10 : 13, boxShadow: `0 1px 6px ${T.shadow}`, opacity: t.done ? 0.6 : 1, transition: 'all 0.18s' }}>
            <button onClick={() => toggle(t.id)} style={{ width: mob ? 18 : 21, height: mob ? 18 : 21, borderRadius: '50%', border: `2px solid ${t.done ? '#27ae60' : T.muted}`, background: t.done ? '#27ae60' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, marginTop: 1, transition: 'all 0.18s' }}>
              {t.done && <Icon name="check" size={mob ? 10 : 12} color="#fff" />}
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: mob ? 12 : 14, color: T.text, textDecoration: t.done ? 'line-through' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: mob ? 'nowrap' : 'normal' }}>{t.title}</div>
              {t.desc && !mob && <p style={{ fontSize: 12, color: T.subtext, marginTop: 3, fontFamily: "'DM Sans', sans-serif" }}>{t.desc}</p>}
              {(t.date || t.time) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, flexWrap: 'wrap' }}>
                  {isOverdue(t) && <span style={{ background: T.overdueBg, color: T.overdueText, borderRadius: 5, padding: mob ? '1px 5px' : '2px 7px', fontSize: mob ? 9 : 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Overdue</span>}
                  {isUrgent(t)  && <span style={{ background: T.urgentBg,  color: T.urgentText,  borderRadius: 5, padding: mob ? '1px 5px' : '2px 7px', fontSize: mob ? 9 : 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Due soon</span>}
                  <span style={{ fontSize: mob ? 10 : 12, color: T.subtext, fontFamily: "'DM Sans', sans-serif" }}>📅 {t.date}{t.time ? ' ' + t.time : ''}</span>
                </div>
              )}
            </div>
            <TrashBtn onClick={() => save(todos.filter(x => x.id !== t.id))} mob={mob} />
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="New Task" T={T} mob={mob}>
        <Input label="Task" value={ttitle} onChange={setTtitle} placeholder="What needs to be done?" T={T} mob={mob} />
        <Input label="Details (optional)" value={tdesc} onChange={setTdesc} multiline placeholder="Additional details..." T={T} mob={mob} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Input label="Due Date" type="date" value={tdate} onChange={setTdate} T={T} mob={mob} />
          <Input label="Due Time" type="time" value={ttime} onChange={setTtime} T={T} mob={mob} />
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Btn variant="ghost" onClick={() => setModal(false)} T={T} mob={mob}>Cancel</Btn>
          <Btn onClick={addTodo} T={T} mob={mob}>Add</Btn>
        </div>
      </Modal>
    </div>
  );
};

export default TodoSection;
