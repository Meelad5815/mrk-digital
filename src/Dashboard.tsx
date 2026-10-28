import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowUpRight, BriefcaseBusiness, CheckCircle2,
  ClipboardList, Download, FileText, FolderKanban, LayoutDashboard, Plus,
  Search, Trash2, Users, Wallet, X, CircleDollarSign, RefreshCw, Database
} from 'lucide-react';

type Section = 'overview' | 'tasks' | 'clients' | 'orders' | 'income' | 'expenses' | 'projects';
type Status = 'Pending' | 'In Progress' | 'Completed' | 'Paid' | 'Cancelled';
type RecordItem = {
  id: string; name: string; date: string; notes: string; amount: number;
  status: Status; phone?: string; category?: string; dueDate?: string;
};
type Store = Record<Exclude<Section, 'overview'>, RecordItem[]>;

const STORE_KEY = 'mrk-digital-business-dashboard-v1';
const today = () => new Date().toISOString().slice(0, 10);
const emptyStore: Store = { tasks: [], clients: [], orders: [], income: [], expenses: [], projects: [] };
const nav: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'tasks', label: 'Daily tasks', icon: ClipboardList },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'orders', label: 'Orders', icon: BriefcaseBusiness },
  { id: 'income', label: 'Income', icon: ArrowUpRight },
  { id: 'expenses', label: 'Expenses', icon: ArrowDownRight },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
];
const titles: Record<Exclude<Section, 'overview'>, string> = {
  tasks: 'Daily tasks', clients: 'Clients', orders: 'Orders', income: 'Income', expenses: 'Expenses', projects: 'Projects'
};
const money = (value: number) => new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(value || 0);
const readStore = (): Store => {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return emptyStore;
    const parsed = JSON.parse(raw);
    return { ...emptyStore, ...parsed };
  } catch { return emptyStore; }
};

export default function Dashboard() {
  const [data, setData] = useState<Store>(() => readStore());
  const [active, setActive] = useState<Section>('overview');
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<RecordItem | null>(null);
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({ name: '', date: today(), amount: '', status: 'Pending' as Status, phone: '', category: '', dueDate: '', notes: '' });

  useEffect(() => { localStorage.setItem(STORE_KEY, JSON.stringify(data)); }, [data]);

  const all = useMemo(() => Object.entries(data).flatMap(([section, items]) =>
    items.map(item => ({ ...item, section: section as Exclude<Section, 'overview'> }))
  ), [data]);
  const incomeTotal = data.income.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const expenseTotal = data.expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const pendingOrders = data.orders.filter(item => !['Completed', 'Paid', 'Cancelled'].includes(item.status)).length;
  const filtered = active === 'overview' ? [] : data[active].filter(item =>
    [item.name, item.notes, item.phone, item.category, item.status].some(value => (value || '').toLowerCase().includes(query.toLowerCase()))
  );

  const openNew = () => {
    if (active === 'overview') setActive('tasks');
    setEditing(null);
    setForm({ name: '', date: today(), amount: '', status: 'Pending', phone: '', category: '', dueDate: '', notes: '' });
    setModal(true);
    setNotice('');
  };
  const openEdit = (item: RecordItem) => {
    setEditing(item);
    setForm({ name: item.name, date: item.date || today(), amount: String(item.amount || ''), status: item.status, phone: item.phone || '', category: item.category || '', dueDate: item.dueDate || '', notes: item.notes || '' });
    setModal(true);
    setNotice('');
  };
  const save = (event: React.FormEvent) => {
    event.preventDefault();
    if (active === 'overview' || !form.name.trim()) return;
    const financial = active === 'income' || active === 'expenses' || active === 'orders';
    const item: RecordItem = {
      id: editing?.id || crypto.randomUUID(), name: form.name.trim(), date: form.date || today(),
      amount: financial ? Math.max(0, Number(form.amount || 0)) : 0, status: form.status,
      phone: form.phone.trim(), category: form.category.trim(), dueDate: form.dueDate,
      notes: form.notes.trim()
    };
    setData(prev => ({
      ...prev,
      [active]: editing ? prev[active].map(row => row.id === editing.id ? item : row) : [item, ...prev[active]]
    }));
    setModal(false);
    setNotice(editing ? 'Record updated.' : 'Record added successfully.');
  };
  const remove = (section: Exclude<Section, 'overview'>, id: string) => {
    if (!window.confirm('Delete this record? This cannot be undone.')) return;
    setData(prev => ({ ...prev, [section]: prev[section].filter(item => item.id !== id) }));
  };
  const exportData = () => {
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), ...data }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'mrk-digital-backup.json'; a.click();
    URL.revokeObjectURL(url);
  };
  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(String(reader.result));
        const next = Object.fromEntries(Object.keys(emptyStore).map(key => [key, Array.isArray(imported[key]) ? imported[key] : []])) as Store;
        if (!window.confirm('Replace the current dashboard data with this backup?')) return;
        setData(next); setNotice('Backup imported.');
      } catch { setNotice('Could not read this backup file.'); }
    };
    reader.readAsText(file); event.target.value = '';
  };

  const sectionTitle = active === 'overview' ? 'Business overview' : titles[active];
  const sectionHint = active === 'overview'
    ? 'Track your daily operations in one place.'
    : 'Add, search, edit and manage your records.';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col bg-slate-950 px-4 py-6 text-white md:flex">
          <a href="/" className="mb-8 flex items-center gap-3 px-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-teal-400 text-lg font-black">MRK</span>
            <span><strong className="block text-lg">MRK Digital</strong><small className="text-slate-400">Business workspace</small></span>
          </a>
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[.18em] text-slate-500">Workspace</p>
          <nav className="space-y-1">
            {nav.map(item => {
              const Icon = item.icon;
              return <button key={item.id} onClick={() => { setActive(item.id); setQuery(''); setNotice(''); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${active === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/30' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
                <Icon size={18}/>{item.label}
                {item.id === 'orders' && pendingOrders > 0 && <span className="ml-auto rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-slate-950">{pendingOrders}</span>}
              </button>;
            })}
          </nav>
          <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold"><Database size={16} className="text-teal-300"/> Private browser storage</div>
            <p className="text-xs leading-5 text-slate-400">Records are stored in this browser only. Export backups regularly.</p>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur md:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <a href="/" className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-xs font-black text-white md:hidden">MRK</a>
                <div><p className="text-xs font-semibold text-slate-500">MRK DIGITAL & ONLINE SERVICES</p><h1 className="text-lg font-extrabold md:text-xl">{sectionTitle}</h1></div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={exportData} className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold hover:bg-slate-50 sm:flex"><Download size={16}/> Backup</button>
                <button onClick={openNew} className="flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"><Plus size={17}/> Add record</button>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-4 py-6 pb-28 md:px-8 md:py-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div><p className="text-sm text-slate-500">{sectionHint}</p><p className="mt-1 text-xs text-slate-400">{new Date().toLocaleDateString('en-PK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p></div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold hover:bg-slate-50"><RefreshCw size={15}/> Import backup<input type="file" accept="application/json,.json" className="hidden" onChange={importData}/></label>
            </div>
            {notice && <div role="status" className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{notice}</div>}

            {active === 'overview' ? <>
              <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Metric title="Total income" value={money(incomeTotal)} subtitle={`${data.income.length} entries recorded`} icon={ArrowUpRight} tone="emerald"/>
                <Metric title="Total expenses" value={money(expenseTotal)} subtitle={`${data.expenses.length} entries recorded`} icon={ArrowDownRight} tone="rose"/>
                <Metric title="Net balance" value={money(incomeTotal - expenseTotal)} subtitle="Income minus expenses" icon={Wallet} tone="blue"/>
                <Metric title="Open orders" value={String(pendingOrders)} subtitle={`${data.orders.length} total orders`} icon={BriefcaseBusiness} tone="amber"/>
              </div>
              <div className="grid gap-5 xl:grid-cols-[1.35fr_.85fr]">
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                  <div className="mb-5 flex items-center justify-between"><div><h2 className="font-extrabold">Workspace shortcuts</h2><p className="mt-1 text-sm text-slate-500">Quick access to your business records</p></div><Activity className="text-blue-600"/></div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {nav.filter(item => item.id !== 'overview').map(item => { const Icon = item.icon; const count = data[item.id].length; return <button key={item.id} onClick={() => { setActive(item.id); setQuery(''); }} className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50/50"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700"><Icon size={19}/></span><span className="min-w-0 flex-1"><strong className="block text-sm">{item.label}</strong><small className="text-slate-500">{count} records</small></span><span className="text-slate-400">→</span></button>; })}
                  </div>
                </section>
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                  <div className="mb-5 flex items-center justify-between"><div><h2 className="font-extrabold">Recent activity</h2><p className="mt-1 text-sm text-slate-500">Latest saved records</p></div><FileText className="text-teal-600"/></div>
                  {all.length ? <div className="space-y-4">{[...all].sort((a,b) => b.date.localeCompare(a.date)).slice(0,6).map(item => <div key={item.id} className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500"/><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{item.name}</p><p className="mt-0.5 text-xs capitalize text-slate-500">{item.section} · {item.date}</p></div>{item.amount > 0 && <span className="text-xs font-bold">{money(item.amount)}</span>}</div>)}</div> : <EmptyState title="Your workspace is ready" message="Add your first task, client, order or financial record to get started."/>}
                </section>
              </div>
              <section className="mt-5 rounded-2xl border border-blue-100 bg-gradient-to-r from-slate-950 to-blue-950 p-5 text-white md:p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-teal-300">MRK Digital</p><h2 className="mt-2 text-xl font-extrabold">Keep your business organized.</h2><p className="mt-1 max-w-xl text-sm text-slate-300">Record clients, track work, monitor orders and review your income against expenses.</p></div><button onClick={exportData} className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-slate-900 hover:bg-blue-50"><Download size={16}/> Export backup</button></div>
              </section>
            </> : <>
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
                  <div><h2 className="font-extrabold">{titles[active]}</h2><p className="mt-1 text-sm text-slate-500">{filtered.length} record{filtered.length === 1 ? '' : 's'}</p></div>
                  <div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search records..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"/></div>
                </div>
                {filtered.length ? <div className="divide-y divide-slate-100">
                  {filtered.map(item => <article key={item.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between md:px-5">
                    <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{item.name}</h3><StatusPill status={item.status}/></div><p className="mt-1 text-sm text-slate-500">{item.date}{item.dueDate ? ` · Due ${item.dueDate}` : ''}{item.phone ? ` · ${item.phone}` : ''}{item.category ? ` · ${item.category}` : ''}</p>{item.notes && <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">{item.notes}</p>}</div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end">{['income','expenses','orders'].includes(active) && <strong className="whitespace-nowrap">{money(item.amount)}</strong>}<div className="flex gap-2"><button onClick={() => openEdit(item)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold hover:bg-slate-50">Edit</button><button onClick={() => remove(active, item.id)} aria-label="Delete record" className="rounded-lg border border-rose-100 p-2 text-rose-600 hover:bg-rose-50"><Trash2 size={16}/></button></div></div>
                  </article>)}
                </div> : <EmptyState title="No records found" message={query ? 'Try a different search term.' : 'Add your first record using the button at the top.'}/>}
              </section>
              {['income','expenses'].includes(active) && <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">Recorded {active === 'income' ? 'income' : 'expenses'} total: <strong className="text-slate-900">{money(active === 'income' ? incomeTotal : expenseTotal)}</strong></div>}
            </>}
          </div>

          <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-7 border-t border-slate-200 bg-white/95 px-1 py-2 backdrop-blur md:hidden">
            {nav.map(item => { const Icon = item.icon; return <button key={item.id} onClick={() => { setActive(item.id); setQuery(''); }} className={`flex min-w-0 flex-col items-center gap-1 rounded-lg py-1 text-[9px] font-bold ${active === item.id ? 'text-blue-700' : 'text-slate-500'}`}><Icon size={18}/><span className="max-w-full truncate">{item.id === 'overview' ? 'Home' : item.label.split(' ')[0]}</span></button>; })}
          </nav>
        </main>
      </div>

      {modal && active !== 'overview' && <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={e => { if (e.target === e.currentTarget) setModal(false); }}>
        <form onSubmit={save} className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7">
          <div className="mb-5 flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-blue-600">MRK Digital</p><h2 className="mt-1 text-xl font-extrabold">{editing ? 'Edit record' : 'Add new record'}</h2><p className="mt-1 text-sm text-slate-500">{titles[active]}</p></div><button type="button" onClick={() => setModal(false)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"><X size={20}/></button></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={active === 'clients' ? 'Client name *' : active === 'tasks' ? 'Task title *' : active === 'orders' ? 'Order title *' : active === 'projects' ? 'Project name *' : active === 'income' ? 'Income source *' : 'Expense description *'}><input required autoFocus value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Enter name or title"/></Field>
            <Field label="Date"><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputClass}/></Field>
            {['income','expenses','orders'].includes(active) && <Field label={active === 'orders' ? 'Order value (PKR)' : 'Amount (PKR)'}><input type="number" min="0" step="1" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} className={inputClass} placeholder="0"/></Field>}
            {['orders','tasks','projects'].includes(active) && <Field label="Status"><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Status })} className={inputClass}>{(active === 'orders' ? ['Pending','In Progress','Completed','Paid','Cancelled'] : ['Pending','In Progress','Completed','Cancelled']).map(status => <option key={status}>{status}</option>)}</select></Field>}
            {active === 'clients' && <Field label="Phone / WhatsApp"><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="03xx xxxxxxx"/></Field>}
            {['clients','orders','projects','income','expenses'].includes(active) && <Field label="Category / service"><input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputClass} placeholder="e.g. Website, FBR, Design"/></Field>}
            {['orders','projects','tasks'].includes(active) && <Field label="Due date"><input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} className={inputClass}/></Field>}
            <div className="sm:col-span-2"><Field label="Notes"><textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} className={inputClass} placeholder="Details, follow-up, payment notes..."/></Field></div>
          </div>
          <div className="mt-6 flex gap-3"><button type="button" onClick={() => setModal(false)} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-bold hover:bg-slate-50">Cancel</button><button type="submit" className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700">{editing ? 'Save changes' : 'Add record'}</button></div>
        </form>
      </div>}
    </div>
  );
}

const inputClass = 'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100';
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-sm font-bold text-slate-700">{label}{children}</label>; }
function Metric({ title, value, subtitle, icon: Icon, tone }: { title: string; value: string; subtitle: string; icon: React.ElementType; tone: 'emerald'|'rose'|'blue'|'amber' }) {
  const tones = { emerald: 'bg-emerald-50 text-emerald-700', rose: 'bg-rose-50 text-rose-700', blue: 'bg-blue-50 text-blue-700', amber: 'bg-amber-50 text-amber-700' };
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-500">{title}</span><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}><Icon size={19}/></span></div><p className="mt-4 break-words text-2xl font-extrabold tracking-tight">{value}</p><p className="mt-1 text-xs text-slate-500">{subtitle}</p></div>;
}
function StatusPill({ status }: { status: Status }) {
  const styles: Record<Status, string> = { Pending: 'bg-amber-50 text-amber-700', 'In Progress': 'bg-blue-50 text-blue-700', Completed: 'bg-emerald-50 text-emerald-700', Paid: 'bg-emerald-50 text-emerald-700', Cancelled: 'bg-rose-50 text-rose-700' };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${styles[status]}`}>{status}</span>;
}
function EmptyState({ title, message }: { title: string; message: string }) { return <div className="px-5 py-12 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500"><CircleDollarSign size={22}/></span><h3 className="mt-3 font-bold">{title}</h3><p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">{message}</p></div>; }
