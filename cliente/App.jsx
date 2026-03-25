import React, { useState, useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Camera, Send, Clock, Star, LayoutDashboard, ArrowLeft, MessageSquare, Loader2, Share2, Users
} from 'lucide-react';

// --- CONFIGURAÇÕES ---
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbxDLjQ75Ice_nl7M0y6GuCJCv-_4FEk4Bw392mq3T74Kw5JKIi1zZAMOiZmhFT8JMMoLA/exec"; 

const firebaseConfig = {
  apiKey: "AIzaSyDnFrxu0a6WMj5z9PpWxGJjNV-i5hiHV2g", 
  authDomain: "vistoria-ubs-app.firebaseapp.com",
  projectId: "vistoria-ubs-app", 
  storageBucket: "vistoria-ubs-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Inicialização segura
let app, auth, db;
const isFirebaseReady = firebaseConfig.apiKey && firebaseConfig.apiKey !== "COLE_SUA_API_KEY_AQUI";
if (isFirebaseReady) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (e) { console.error("Erro Firebase Init:", e); }
}

// --- COMPONENTE DE PERGUNTA ---
const QuestionBlock = ({ label, id, responses, updateResponse, handlePhoto }) => {
  const item = responses[id];
  const isTriggered = item.status === item.trigger;
  return (
    <div className={`mb-6 p-5 rounded-2xl border transition-all ${isTriggered ? 'bg-red-50 border-red-200 shadow-sm' : 'bg-white border-slate-100 shadow-sm'}`}>
      <div className="flex items-start mb-3">
        <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${isTriggered ? 'bg-red-500' : 'bg-teal-500'}`} />
        <label className="text-sm font-bold text-slate-800 leading-tight">{label}</label>
      </div>
      <div className="flex gap-2 mb-4">
        {['Sim', 'Não', 'N/A'].map(opt => (
          <button key={opt} type="button" onClick={() => updateResponse(id, 'status', opt)}
            className={`flex-1 py-2.5 rounded-xl border text-sm font-black transition-all ${item.status === opt ? (opt === item.trigger ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-teal-600 text-white border-teal-600 shadow-md') : 'bg-white text-slate-400 border-slate-200'}`}>
            {opt}
          </button>
        ))}
      </div>
      {isTriggered && (
        <div className="space-y-4 pt-4 border-t border-red-100 animate-in fade-in">
          <textarea className="w-full bg-white border border-red-200 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-red-400" placeholder="Justificativa / Motivo..." value={item.reason} onChange={(e) => updateResponse(id, 'reason', e.target.value)} />
          <label className="relative flex items-center justify-center w-full h-32 border-2 border-dashed border-red-200 rounded-xl bg-white cursor-pointer overflow-hidden">
            {item.photo ? <img src={item.photo} className="w-full h-full object-cover" /> : <div className="text-center text-red-400"><Camera size={24} className="mx-auto" /><span className="text-[10px] font-bold uppercase">FOTO</span></div>}
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handlePhoto(id, e)} />
          </label>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('form');
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({ ubs: '', encarregada: '', dataVistoria: new Date().toISOString().split('T')[0], horaInicio: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), notaVistoria: 10, consideracoesGerais: '', dataRetorno: '' });
  
  const [responses, setResponses] = useState({
    uniforme: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Equipe Uniformizada' },
    epi: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Uso de EPIs' },
    ambiente: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Ambiente Geral Limpo' },
    sujeira: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Sujeira/Derramamento Tratado' },
    toque: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Superfícies de Alto Toque' },
    padrao: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Padrão de Limpeza Correto' },
    cronograma: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Cronograma de Limpeza' },
    organica: { status: '', reason: '', photo: null, trigger: 'Sim', label: 'Presença de Matéria Orgânica' },
    residuos: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Segregação de Resíduos' },
    lixeiras: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Lixeiras com Tampa/Fechadas' },
    areaResiduos: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Área de Resíduos Organizada' },
    equipamentos: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Materiais em Bom Estado' },
    produtos: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Produtos Identificados' },
    turno: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Responsável Turno Definido' },
    feedback: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Orientação/Feedback Imediato' }
  });

  const updateMeta = (f, v) => setMeta(p => ({ ...p, [f]: v }));
  const updateResponse = (id, k, v) => setResponses(p => ({ ...p, [id]: { ...p[id], [k]: v } }));
  const handlePhoto = (id, e) => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onloadend = () => updateResponse(id, 'photo', r.result); r.readAsDataURL(f); } };

  const finalizar = async (e) => {
    e.preventDefault();
    setLoading(true);
    const falhas = Object.values(responses).filter(r => r.status === r.trigger).map(r => `${r.label}: ${r.reason}`).join(' | ');
    const dadosParaSalvar = { ...meta, dataFinalizacao: new Date().toLocaleString('pt-BR'), falhas };

    // 1. Google Sheets
    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosParaSalvar)
      });
    } catch (err) { console.error("Sheets Error:", err); }

    // 2. Firebase
    if (isFirebaseReady) {
      try { await addDoc(collection(db, 'vistorias'), { ...dadosParaSalvar, createdAt: serverTimestamp() }); }
      catch (err) { console.error("Firebase Error:", err); }
    }

    setLoading(false);
    setView('report');
  };

  const compartilharWhatsApp = () => {
    const falhasTxt = Object.values(responses).filter(r => r.status === r.trigger).map(r => `• ${r.label}: ${r.reason}`).join('\n');
    const texto = `🚨 *VISTORIA: ${meta.ubs.toUpperCase()}*\n👤 Encarregada: ${meta.encarregada}\n⭐ Nota: *${meta.notaVistoria}/10*\n\n⚠️ *FALHAS:*\n${falhasTxt || 'Nenhuma falha registrada.'}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank');
  };

  if (view === 'form') {
    return (
      <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-900">
        <header className="bg-teal-700 text-white p-5 rounded-b-[2rem] shadow-lg sticky top-0 z-50 flex justify-between items-center">
          <div><h1 className="text-lg font-black uppercase leading-none">Vistoria UBS</h1><p className="text-[10px] font-bold opacity-80 mt-1 flex items-center"><Clock size={12} className="mr-1" /> {meta.horaInicio}</p></div>
        </header>

        <main className="max-w-md mx-auto px-4 mt-6">
          <form onSubmit={finalizar} className="space-y-6">
            <section className="bg-white p-5 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
              <input type="text" placeholder="Unidade UBS" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold" value={meta.ubs} onChange={(e) => updateMeta('ubs', e.target.value)} required />
              <input type="text" placeholder="Encarregada" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3" value={meta.encarregada} onChange={(e) => updateMeta('encarregada', e.target.value)} required />
            </section>

            {Object.entries(responses).map(([id, d]) => (
              <QuestionBlock key={id} id={id} label={d.label} responses={responses} updateResponse={updateResponse} handlePhoto={handlePhoto} />
            ))}

            <div className="bg-slate-900 p-8 rounded-[3rem] text-white space-y-6 shadow-2xl mb-10 border-t-4 border-teal-500">
              <h2 className="text-teal-400 font-black text-xs uppercase flex items-center"><Star size={16} className="mr-2" /> Avaliação Final</h2>
              <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar flex-nowrap touch-pan-x">
                {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
                  <button key={n} type="button" onClick={() => updateMeta('notaVistoria', n)} 
                    className={`flex-shrink-0 w-11 h-11 rounded-xl font-black text-sm transition-all ${meta.notaVistoria === n ? 'bg-teal-500 text-slate-900 scale-110 shadow-lg' : 'bg-slate-800 text-slate-500'}`}>
                    {n}
                  </button>
                ))}
              </div>
              <textarea rows="4" className="w-full bg-slate-800 rounded-2xl p-4 text-sm outline-none" placeholder="Considerações gerais..." value={meta.consideracoesGerais} onChange={(e) => updateMeta('consideracoesGerais', e.target.value)} />
              <button type="submit" disabled={loading} className="w-full bg-teal-500 text-slate-900 font-black py-5 rounded-2xl active:scale-95 disabled:opacity-50 flex justify-center items-center transition-all">
                {loading ? <Loader2 className="animate-spin" /> : <Send size={20} className="mr-2" />} FINALIZAR E SALVAR
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
       <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6 shadow-lg"><Send size={40} /></div>
       <h1 className="text-2xl font-black text-slate-900 uppercase">Relatório Enviado!</h1>
       <p className="text-slate-500 mt-2 mb-8">Dados registrados no banco e na sua planilha.</p>
       <div className="flex flex-col gap-3 w-full max-w-xs">
          <button onClick={compartilharWhatsApp} className="bg-green-600 text-white py-4 rounded-2xl font-bold uppercase text-xs flex items-center justify-center gap-2 shadow-xl active:scale-95"><MessageSquare size={18} /> WhatsApp</button>
          <button onClick={() => window.location.reload()} className="bg-slate-900 text-white py-4 rounded-2xl font-bold uppercase text-xs shadow-xl active:scale-95">Nova Vistoria</button>
       </div>
    </div>
  );
}
