import React, { useState } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Camera, Send, Clock, Star, ArrowLeft, MessageSquare, Loader2, Users, Download, FileText
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// CONFIG
const GOOGLE_SHEETS_URL = "COLE_SUA_URL_AQUI";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO",
  projectId: "SEU_PROJECT_ID",
};

let app, auth, db;

const isFirebaseReady = firebaseConfig.apiKey;

if (isFirebaseReady) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  signInAnonymously(auth).catch(console.error);
}

// COMPONENTE QUESTÃO
const QuestionBlock = ({ label, id, responses, updateResponse, handlePhoto }) => {
  const item = responses[id] || {};
  const isTriggered = item.status === item.trigger;

  return (
    <div className={`mb-6 p-4 rounded-xl ${isTriggered ? 'bg-red-50' : 'bg-white'}`}>
      <p className="font-bold text-sm mb-2">{label}</p>

      <div className="flex gap-2 mb-3">
        {['Sim', 'Não', 'N/A'].map(opt => (
          <button key={opt}
            onClick={() => updateResponse(id, 'status', opt)}
            className={`flex-1 p-2 rounded ${item.status === opt ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>
            {opt}
          </button>
        ))}
      </div>

      {isTriggered && (
        <>
          <textarea
            placeholder="Justificativa"
            className="w-full p-2 border mb-2"
            value={item.reason}
            onChange={(e) => updateResponse(id, 'reason', e.target.value)}
          />

          <input type="file" accept="image/*"
            onChange={(e) => handlePhoto(id, e)} />
        </>
      )}
    </div>
  );
};

export default function App() {

  const [view, setView] = useState('form');
  const [loading, setLoading] = useState(false);
  const [gerandoPdf, setGerandoPdf] = useState(false);

  const [meta, setMeta] = useState({
    ubs: '',
    encarregada: '',
    notaVistoria: 10,
    dataRetorno: '',
    consideracoesGerais: ''
  });

  const [responses, setResponses] = useState({
    uniforme: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Equipe Uniformizada' },
    epi: { status: '', reason: '', photo: null, trigger: 'Não', label: 'Uso de EPIs' }
  });

  const updateMeta = (f, v) => setMeta(p => ({ ...p, [f]: v }));

  const updateResponse = (id, k, v) =>
    setResponses(p => ({ ...p, [id]: { ...p[id], [k]: v } }));

  const handlePhoto = (id, e) => {
    const f = e.target.files[0];
    if (!f) return;

    const r = new FileReader();
    r.onloadend = () => updateResponse(id, 'photo', r.result);
    r.readAsDataURL(f);
  };

  const finalizar = async (e) => {
    e.preventDefault();

    if (!meta.ubs || !meta.encarregada) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    setLoading(true);

    const falhas = Object.values(responses)
      .filter(r => r.status === r.trigger)
      .map(r => `${r.label}: ${r.reason || 'Sem justificativa'}`)
      .join(' | ');

    const dados = {
      ...meta,
      falhas,
      data: new Date().toLocaleString()
    };

    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(dados)
      });
    } catch (e) {
      console.error(e);
    }

    if (db) {
      try {
        await addDoc(collection(db, 'vistorias'), {
          ...dados,
          createdAt: serverTimestamp()
        });
      } catch (e) {
        console.error(e);
      }
    }

    setLoading(false);
    setView('report');
  };

  const baixarPDF = async () => {
    setGerandoPdf(true);

    const el = document.getElementById('pdf');

    const canvas = await html2canvas(el, { scale: 2 });
    const img = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    let remaining = height;
    let position = 0;

    pdf.addImage(img, 'PNG', 0, position, width, height);
    remaining -= pdf.internal.pageSize.getHeight();

    while (remaining > 0) {
      position = remaining - height;
      pdf.addPage();
      pdf.addImage(img, 'PNG', 0, position, width, height);
      remaining -= pdf.internal.pageSize.getHeight();
    }

    pdf.save('vistoria.pdf');

    setGerandoPdf(false);
  };

  if (view === 'form') {
    return (
      <form onSubmit={finalizar} className="p-4 space-y-4">

        <input placeholder="UBS"
          value={meta.ubs}
          onChange={e => updateMeta('ubs', e.target.value)}
          className="w-full border p-2" />

        <input placeholder="Encarregada"
          value={meta.encarregada}
          onChange={e => updateMeta('encarregada', e.target.value)}
          className="w-full border p-2" />

        {Object.entries(responses).map(([id, d]) => (
          <QuestionBlock key={id}
            id={id}
            label={d.label}
            responses={responses}
            updateResponse={updateResponse}
            handlePhoto={handlePhoto}
          />
        ))}

        <button disabled={loading} className="bg-green-600 text-white p-3 w-full">
          {loading ? "Salvando..." : "Finalizar"}
        </button>

      </form>
    );
  }

  return (
    <div className="p-4">

      <div id="pdf">
        <h1 className="text-xl font-bold">{meta.ubs}</h1>
        <p>Encarregada: {meta.encarregada}</p>
        <p>Nota: {meta.notaVistoria}</p>

        {Object.values(responses)
          .filter(r => r.status === r.trigger)
          .map((r, i) => (
            <div key={i}>
              <p>{r.label}</p>
              <p>{r.reason}</p>
              {r.photo && <img src={r.photo} width="200" />}
            </div>
          ))}
      </div>

      <button onClick={baixarPDF} className="bg-black text-white p-3 mt-4">
        {gerandoPdf ? "Gerando..." : "Baixar PDF"}
      </button>

      <button onClick={() => window.location.reload()}
        className="bg-gray-300 p-3 mt-2 w-full">
        Nova vistoria
      </button>

    </div>
  );
}
