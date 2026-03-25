import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';
import { 
  Camera, Calendar, MapPin, ClipboardList, Send, 
  CheckCircle2, Users, HardHat, Package, AlertTriangle,
  Trash2, Sparkles, Clock, XCircle, FileText, Download,
  Share2, ArrowLeft, Eye, MessageSquare, Star, UserCheck,
  Loader2, ThumbsUp, LayoutDashboard, History, ShieldCheck
} from 'lucide-react';

// --- CONFIGURAÇÃO FIREBASE ---
const firebaseConfig = typeof __firebase_config !== 'undefined' 
  ? JSON.parse(__firebase_config) 
  : {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'vistoria-ubs-final';

// --- COMPONENTE DE PERGUNTA ---
const QuestionBlock = ({ label, id, icon: Icon, desc, responses, updateResponse, handlePhoto }) => {
  const item = responses[id];
  const isTriggered = item.status === item.trigger;

  return (
    <div className={`mb-6 p-5 rounded-2xl border transition-all ${isTriggered ? 'bg-red-50 border-red-200 shadow-sm' : 'bg-white border-slate-100 shadow-sm'}`}>
      <div className="flex items-start mb-3">
        {Icon && <Icon size={20} className={`mr-3 mt-1 ${isTriggered ? 'text-red-600' : 'text-teal-600'}`} />}
        <div>
          <label className="text-sm font-bold text-slate-800 leading-tight block">{label}</label>
          {desc && <p className="text-[11px] text-slate-400 mt-1 italic">{desc}</p>}
        </div>
      </div>
      
      <div className="flex gap-2 mb-4">
        {['Sim', 'Não', 'N/A'].map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => updateResponse(id, 'status', opt)}
            className={`flex-1 py-2.5 rounded-xl border text-sm font-black transition-all ${
              item.status === opt 
                ? (opt === item.trigger ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-teal-600 text-white border-teal-600 shadow-md')
                : 'bg-white text-slate-400 border-slate-200'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {isTriggered && (
        <div className="space-y-4 pt-4 border-t border-red-100 animate-in fade-in slide-in-from-top-1">
          <div>
             <label className="text-[10px] font-black uppercase text-red-600 flex items-center mb-1 tracking-tighter">
               <MessageSquare size={12} className="mr-1" /> Justificativa / Motivo:
             </label>
             <textarea 
                className="w-full bg-white border border-red-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-400 outline-none"
                placeholder="Explique o problema encontrado..."
                value={item.reason}
                onChange={(e) => updateResponse(id, 'reason', e.target.value)}
              />
          </div>
          <label className="relative flex items-center justify-center w-full h-32 border-2 border-dashed border-red-200 rounded-xl bg-white cursor-pointer overflow-hidden">
            {item.photo ? (
              <img src={item.photo} className="w-full h-full object-cover" alt="Evidência" />
            ) : (
              <div className="text-center text-red-400">
                <Camera size={24} className="mx-auto mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Bater Foto</span>
              </div>
            )}
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handlePhoto(id, e)} />
          </label>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('form'); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [historico, setHistorico] = useState([]);
  
  const [meta, setMeta] = useState({
    ubs: '',
    encarregada: '',
    responsavelPrefeitura: '',
    dataVistoria: new Date().toISOString().split('T')[0],
    horaInicio: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    horaFim: '',
    dataRetorno: '',
    consideracoesGerais: '',
    notaVistoria: 10
  });

  const [responses, setResponses] = useState({
    uniformeEquipe: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Equipe Uniformizada' },
    usoEpi: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Uso de EPIs' },
    ambienteGeral: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Ambiente Geral Limpo' },
    sujeiraDerramamento: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Sujeira/Derramamento Tratado' },
    altoToque: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Superfícies de Alto Toque' },
    padraoLimpeza: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Padrão de Limpeza Correto' },
    cronogramaLimpeza: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Cronograma de Limpeza' },
    materiaOrganica: { status: '', reason: '', photo: null, trigger: 'Sim', label: 'Presença de Matéria Orgânica' },
    residuosSegregados: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Segregação de Resíduos' },
    lixeirasTampadas: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Lixeiras com Tampa/Fechadas' },
    areaResiduos: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Área de Resíduos Organizada' },
    equipamentosMateriais: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Materiais em Bom Estado' },
    produtosIdentificados: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Produtos Identificados' },
    responsavelTurno: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Responsável Turno Definido' },
    problemasTratados: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Orientação/Feedback Imediato' }
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (e) {
        console.error("Erro na autenticação", e);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (view === 'dashboard' && user) {
      const fetchDocs = async () => {
        try {
          const q = query(collection(db, 'artifacts', appId, 'public', 'data', 'vistorias'), orderBy('createdAt', 'desc'));
          const snap = await getDocs(q);
          setHistorico(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (err) { console.error("Erro ao carregar dados", err); }
      };
      fetchDocs();
    }
  }, [view, user]);

  const updateMeta = (field, value) => setMeta(prev => ({ ...prev, [field]: value }));
  const updateResponse = (id, key, value) => setResponses(prev => ({ ...prev, [id]: { ...prev[id], [key]: value } }));

  const handlePhoto = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateResponse(id, 'photo', reader.result);
      reader.readAsDataURL(file);
    }
  };

  const salvarVistoria = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const horaFim = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dadosFinais = { ...meta, horaFim };
    
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'vistorias'), {
        ...dadosFinais,
        responses,
        uid: user.uid,
        createdAt: serverTimestamp()
      });
      setMeta(dadosFinais);
      setView('report');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const compartilharWhatsApp = () => {
    const falhas = Object.entries(responses)
      .filter(([_, data]) => data.status === data.trigger)
      .map(([_, data]) => `• ${data.label}: ${data.reason}`)
      .join('\n');

    const texto = `🚨 *RELATÓRIO DE VISTORIA: ${meta.ubs.toUpperCase()}*\n` +
      `👤 Encarregada: ${meta.encarregada}\n` +
      `⭐ Nota: *${meta.notaVistoria}/10*\n` +
      `📅 Retorno: ${meta.dataRetorno ? new Date(meta.dataRetorno + 'T12:00:00').toLocaleDateString('pt-BR') : 'A definir'}\n\n` +
      `⚠️ *PRINCIPAIS FALHAS:*\n${falhas || 'Nenhuma falha crítica registrada.'}\n\n` +
      `📝 *OBS:* ${meta.consideracoesGerais || 'Consultar relatório detalhado.'}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank');
  };

  if (view === 'form') {
    return (
      <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-900">
        <header className="bg-teal-700 text-white p-5 rounded-b-[2.5rem] shadow-xl sticky top-0 z-50 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-black uppercase tracking-tight leading-none">Vistoria Campo</h1>
            <p className="text-[10px] font-bold opacity-80 mt-1 flex items-center">
              <Clock size={12} className="mr-1" /> Início: {meta.horaInicio}
            </p>
          </div>
          <button onClick={() => setView('dashboard')} className="bg-teal-800 p-2 rounded-full shadow-inner">
            <LayoutDashboard size={20} />
          </button>
        </header>

        <main className="max-w-md mx-auto px-4 mt-6">
          <form onSubmit={salvarVistoria} className="space-y-6">
            <section className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 space-y-4">
              <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b pb-2">Identificação</h3>
              <input type="text" placeholder="Unidade UBS" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold" value={meta.ubs} onChange={(e) => updateMeta('ubs', e.target.value)} required />
              <input type="text" placeholder="Nome da Encarregada" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3" value={meta.encarregada} onChange={(e) => updateMeta('encarregada', e.target.value)} required />
            </section>

            {Object.entries(responses).map(([id, data]) => (
              <QuestionBlock 
                key={id} 
                id={id} 
                label={data.label} 
                responses={responses} 
                updateResponse={updateResponse} 
                handlePhoto={handlePhoto} 
              />
            ))}

            <section className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl space-y-6 mb-10 border-t-4 border-teal-500 text-white">
              <h2 className="text-teal-400 font-black text-xs uppercase flex items-center"><Star size={16} className="mr-2" /> Avaliação Final</h2>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-3">Nota da Unidade (0 a 10)</label>
                <div className="flex justify-between gap-1 overflow-x-auto pb-2 no-scrollbar">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <button key={n} type="button" onClick={() => updateMeta('notaVistoria', n)} className={`min-w-[36px] h-10 rounded-lg font-black text-xs transition-all ${meta.notaVistoria === n ? 'bg-teal-500 text-slate-900 scale-110 shadow-lg shadow-teal-500/50' : 'bg-slate-800 text-slate-500'}`}>{n}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Previsão de Retorno</label>
                <input type="date" className="w-full bg-slate-800 border-none rounded-xl p-3 text-white text-xs outline-none focus:ring-1 focus:ring-teal-500" value={meta.dataRetorno} onChange={(e) => updateMeta('dataRetorno', e.target.value)} />
              </div>

              <textarea rows="4" className="w-full bg-slate-800 rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-teal-500" placeholder="Considerações gerais..." value={meta.consideracoesGerais} onChange={(e) => updateMeta('consideracoesGerais', e.target.value)} />

              <button type="submit" disabled={loading} className="w-full bg-teal-500 text-slate-900 font-black py-5 rounded-2xl shadow-xl active:scale-95 disabled:opacity-50 flex justify-center items-center transition-all">
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Send size={20} className="mr-2" />}
                FINALIZAR E SALVAR
              </button>
            </section>
          </form>
        </main>
      </div>
    );
  }

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-900">
        <header className="bg-slate-900 text-white p-6 sticky top-0 z-50 flex items-center justify-between">
          <button onClick={() => setView('form')} className="text-teal-400 flex items-center text-xs font-bold uppercase tracking-widest"><ArrowLeft size={16} className="mr-1" /> Voltar</button>
          <h1 className="text-xs font-black uppercase">Histórico</h1>
          <div className="w-10"></div>
        </header>
        <main className="max-w-2xl mx-auto p-4 space-y-4">
          {historico.map(vis => (
            <div key={vis.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center group active:scale-95 transition-all">
              <div>
                <h3 className="font-black text-slate-800 uppercase text-sm">{vis.ubs}</h3>
                <p className="text-[10px] text-slate-400 font-bold">{new Date(vis.dataVistoria).toLocaleDateString()} • {vis.encarregada}</p>
              </div>
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-lg ${vis.notaVistoria < 6 ? 'bg-red-100 text-red-600' : 'bg-teal-100 text-teal-600'}`}>
                {vis.notaVistoria}
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }

  const irregularidades = Object.entries(responses).filter(([_, data]) => data.status === data.trigger);

  return (
    <div className="min-h-screen bg-white pb-40 font-sans text-slate-900">
      <header className="bg-slate-900 text-white p-6 sticky top-0 z-50 flex items-center justify-between shadow-xl">
        <button onClick={() => setView('form')} className="text-xs font-bold text-teal-400 flex items-center uppercase tracking-widest leading-none">
          <ArrowLeft size={16} className="mr-1" /> Voltar
        </button>
        <h1 className="text-xs font-black uppercase tracking-widest text-center flex-1">Relatório Técnico</h1>
        <div className="flex gap-4">
          <Share2 size={18} className="text-teal-400" onClick={compartilharWhatsApp} />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b-4 border-slate-100 pb-8 mb-10">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 leading-none">{meta.ubs || 'Unidade'}</h2>
            <div className="mt-4 space-y-1 uppercase tracking-tight">
              <p className="text-slate-500 font-bold text-sm flex items-center"><Users size={14} className="mr-2" /> Encarregada: {meta.encarregada}</p>
            </div>
          </div>
          <div className="bg-slate-900 text-white p-6 rounded-[2.5rem] text-center min-w-[120px] shadow-2xl">
            <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1">Nota Final</p>
            <span className="text-5xl font-black">{meta.notaVistoria}</span>
          </div>
        </div>

        <section className="mb-12">
          <h3 className="font-black text-xl border-l-8 border-red-500 pl-4 uppercase tracking-tighter text-red-700 mb-6">Falhas Registradas</h3>
          {irregularidades.length === 0 ? (
             <div className="p-10 bg-slate-50 rounded-3xl text-center text-slate-400 font-bold uppercase text-xs">Unidade Conforme</div>
          ) : (
            <div className="space-y-8">
              {irregularidades.map(([key, data]) => (
                <div key={key} className="p-6 rounded-[2rem] border-2 border-red-50 bg-red-50/20 shadow-sm">
                  <span className="font-black text-slate-700 text-xs uppercase block mb-3">{data.label}</span>
                  <div className="bg-white p-4 rounded-2xl border border-red-100 mb-4 text-sm text-slate-600 font-medium italic">"{data.reason || 'Sem justificativa.'}"</div>
                  {data.photo && <img src={data.photo} className="rounded-3xl w-full h-64 object-cover shadow-xl" />}
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-20 border-t-2 border-slate-100 pt-10 flex flex-col items-center">
           <div className="inline-block bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl w-full max-w-md">
              <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em] text-center mb-4">Compromisso de Retorno</p>
              <p className="text-3xl font-black text-center uppercase">
                {meta.dataRetorno ? new Date(meta.dataRetorno + 'T12:00:00').toLocaleDateString('pt-BR') : 'A DEFINIR'}
              </p>
           </div>
        </div>
      </main>

      <div className="fixed bottom-8 left-8 right-8 z-50 flex justify-center">
        <button 
          onClick={compartilharWhatsApp}
          className="bg-green-600 text-white font-black py-5 px-10 rounded-[2rem] flex items-center shadow-2xl hover:bg-green-700 active:scale-95 transition-all shadow-green-200"
        >
          <MessageSquare size={20} className="mr-3" /> ENVIAR AO SUPERVISOR
        </button>
      </div>
    </div>
  );
}
