import React, { useEffect, useMemo, useState } from 'react';
import { supabase, supabaseConfigured } from './lib/supabase';
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
const userStoreKey = (userId: string) => `${STORE_KEY}:${userId}`;
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
const readStore = (userId: string): Store => {
  try {
    const raw = localStorage.getItem(userStoreKey(userId));
    if (!raw) return emptyStore;
    const parsed = JSON.parse(raw);
    return { ...emptyStore, ...parsed };
  } catch { return emptyStore; }
};

function DashboardWorkspace({ onSignOut, userId }: { onSignOut: () => void; userId: string }) {
  const [data, setData] = useState<Store>(() => readStore(userId));
  const [dataLoaded, setDataLoaded] = useState(false);
  const [active, setActive] = useState<Section>('overview');
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<RecordItem | null>(null);
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({ name: '', date: today(), amount: '', status: 'Pending' as Status, phone: '', category: '', dueDate: '', notes: '' });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!supabase) { setDataLoaded(true); return; }
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) return;
      const { data: row, error } = await supabase.from('mrk_workspaces').select('workspace_data').eq('user_id', authData.user.id).maybeSingle();
      if (cancelled) return;
      if (error) { setNotice('Could not load cloud records. Check the Supabase table setup.'); setDataLoaded(true); return; }
      if (row?.workspace_data) setData({ ...emptyStore, ...row.workspace_data });
      setDataLoaded(true);
    };
    load();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!dataLoaded) return;
    try {
      localStorage.setItem(userStoreKey(userId), JSON.stringify(data));
    } catch {
      setNotice('Browser storage is full or unavailable. Export a backup and clear some space.');
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      if (!supabase) return;
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (cancelled) return;
        if (authError || !authData.user || authData.user.id !== userId) {
          setNotice('Cloud save paused because the signed-in account could not be verified.');
          return;
        }
        const { error } = await supabase.from('mrk_workspaces').upsert({
          user_id: userId, workspace_data: data, updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
        if (!cancelled && error) setNotice('Cloud save failed. Your browser copy remains available; check the database connection.');
      } catch {
        if (!cancelled) setNotice('Cloud save failed. Your browser copy remains available; check your connection.');
      }
    }, 600);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [data, dataLoaded, userId]);

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
    const input = event.target;
    const file = input.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setNotice('Backup is too large. Choose a JSON file smaller than 5 MB.');
      input.value = '';
      return;
    }
    if (!file.name.toLowerCase().endsWith('.json')) {
      setNotice('Choose a valid .json backup file.');
      input.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported: unknown = JSON.parse(String(reader.result));
        if (!imported || typeof imported !== 'object' || Array.isArray(imported)) {
          throw new Error('Invalid backup format');
        }
        const source = imported as Record<string, unknown>;
        const next = Object.fromEntries(Object.keys(emptyStore).map(key => {
          const rows = Array.isArray(source[key]) ? source[key] : [];
          const safeRows = rows.filter((row): row is Record<string, unknown> =>
            Boolean(row) && typeof row === 'object' && !Array.isArray(row) &&
            typeof (row as Record<string, unknown>).name === 'string'
          ).map(row => ({
            id: typeof row.id === 'string' && row.id ? row.id : crypto.randomUUID(),
            name: String(row.name).slice(0, 300),
            date: typeof row.date === 'string' ? row.date.slice(0, 30) : today(),
            notes: typeof row.notes === 'string' ? row.notes.slice(0, 5000) : '',
            amount: Number.isFinite(Number(row.amount)) ? Math.max(0, Number(row.amount)) : 0,
            status: (['Pending', 'In Progress', 'Completed', 'Paid', 'Cancelled'].includes(String(row.status))
              ? row.status : 'Pending') as Status,
            phone: typeof row.phone === 'string' ? row.phone.slice(0, 100) : '',
            category: typeof row.category === 'string' ? row.category.slice(0, 200) : '',
            dueDate: typeof row.dueDate === 'string' ? row.dueDate.slice(0, 30) : ''
          }));
          return [key, safeRows];
        })) as Store;
        if (!window.confirm('Replace the current dashboard data with this backup? Invalid records will be skipped.')) return;
        setData(next);
        setNotice('Backup imported and checked.');
      } catch {
        setNotice('Could not read this backup. Check that it is a valid MRK JSON export.');
      }
    };
    reader.onerror = () => setNotice('Could not read this file. Try another backup.');
    reader.readAsText(file);
    input.value = '';
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
          <button onClick={onSignOut} className="mb-4 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-300 hover:bg-white/10"><X size={18}/> Sign out</button><div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold"><Database size={16} className="text-teal-300"/> Private browser storage</div>
            <p className="text-xs leading-5 text-slate-400">Records sync to your private cloud workspace. Export backups regularly.</p>
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


export default function Dashboard() {
  const [session, setSession] = useState<any>(null);
  const [checking, setChecking] = useState(true);
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!supabase) { setChecking(false); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setChecking(false); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (!supabase) return;
    setBusy(true); setMessage('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/dashboard' }
      });
      if (error) throw error;
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Google sign-in could not start. Check the Google provider setup.');
      setBusy(false);
    }
  };

  const submitAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage('');
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email: email.trim(), password });
        if (error) throw error;
        setMessage('Account request submitted. Check your email to confirm registration, then sign in.');
        setMode('signin');
      } else if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: window.location.origin + '/dashboard' });
        if (error) throw error;
        setMessage('If this email is registered, a password reset link has been sent.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        setSession(data.session);
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally { setBusy(false); }
  };

  if (checking) return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white"><div className="text-center"><div className="mx-auto mb-3 h-9 w-9 animate-spin rounded-full border-4 border-blue-300 border-t-transparent"/><p>Loading secure workspace…</p></div></div>;

  if (!supabaseConfigured || !supabase) return <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-900"><div className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-2xl sm:p-10"><div className="mb-6 flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 font-black text-white">MRK</span><div><p className="text-xs font-bold uppercase tracking-widest text-blue-600">Setup required</p><h1 className="text-2xl font-black">Secure cloud workspace</h1></div></div><p className="text-sm leading-6 text-slate-600">The professional dashboard code is ready, but cloud login requires a Supabase project and two Vercel environment variables. No database credentials are embedded in the website.</p><ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6"><li>Create a free project at <a className="font-bold text-blue-700 underline" href="https://supabase.com/dashboard" target="_blank" rel="noreferrer">Supabase Dashboard</a>.</li><li>In Supabase → SQL Editor, run the <code className="rounded bg-slate-100 px-1">supabase/schema.sql</code> file from the GitHub repository.</li><li>In Supabase → Project Settings → API, copy the Project URL and anon/public key.</li><li>In Vercel → MRK Digital → Settings → Environment Variables, add <code className="rounded bg-slate-100 px-1">VITE_SUPABASE_URL</code> and <code className="rounded bg-slate-100 px-1">VITE_SUPABASE_ANON_KEY</code>, then redeploy.</li></ol><a className="mt-6 inline-flex rounded-xl bg-blue-600 px-4 py-3 font-bold text-white" href="https://vercel.com/meelad5815s-projects/mrk-digital/settings/environment-variables" target="_blank" rel="noreferrer">Open Vercel Environment Settings ↗</a><p className="mt-4 text-xs leading-5 text-slate-500">Keep the Supabase service-role key private. Only the anon/public key belongs in the VITE environment variable. Row-level security is included in the SQL schema.</p></div></div>;

  if (!session) return <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-950 to-slate-950 px-4 py-10"><div className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-7 shadow-2xl sm:p-9"><div className="mb-8 flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 font-black text-white">MRK</span><div><p className="text-xs font-bold uppercase tracking-widest text-blue-600">MRK Digital</p><h1 className="text-2xl font-black text-slate-900">Business workspace</h1></div></div><h2 className="text-xl font-extrabold text-slate-900">{mode === 'signup' ? 'Create your account' : mode === 'reset' ? 'Reset password' : 'Welcome back'}</h2><p className="mt-2 text-sm text-slate-500">Secure access to clients, orders, projects and finances.</p>{mode !== 'reset' && <><button type="button" disabled={busy} onClick={signInWithGoogle} className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-extrabold text-slate-800 transition hover:bg-slate-50 disabled:opacity-60"><span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-sm font-black text-blue-600">G</span>Continue with Google</button><div className="my-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400"><span className="h-px flex-1 bg-slate-200"/><span>or use email</span><span className="h-px flex-1 bg-slate-200"/></div></>}<form className="mt-4 space-y-4" onSubmit={submitAuth}><label className="block text-sm font-bold text-slate-700">Email address<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className={inputClass} placeholder="you@example.com"/></label>{mode !== 'reset' && <label className="block text-sm font-bold text-slate-700">Password<input required minLength={8} type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={e=>setPassword(e.target.value)} className={inputClass} placeholder="At least 8 characters"/></label>}<button disabled={busy} className="w-full rounded-xl bg-blue-600 px-4 py-3 font-extrabold text-white hover:bg-blue-700 disabled:opacity-60">{busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : mode === 'reset' ? 'Send reset link' : 'Sign in'}</button></form>{message && <p role="status" className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-800">{message}</p>}<div className="mt-5 flex flex-wrap justify-between gap-3 text-sm"><button onClick={()=>{setMode(mode==='signup'?'signin':'signup');setMessage('');}} className="font-bold text-blue-700">{mode==='signup'?'Already have an account? Sign in':'Create account'}</button><button onClick={()=>{setMode(mode==='reset'?'signin':'reset');setMessage('');}} className="text-slate-500 underline">{mode==='reset'?'Back to sign in':'Forgot password?'}</button></div><p className="mt-7 text-xs leading-5 text-slate-400">Your workspace is private to your account. Never share your password or recovery link.</p></div></div>;

  return <DashboardWorkspace userId={session.user.id} onSignOut={async () => { await supabase?.auth.signOut(); setSession(null); }}/>;
}
