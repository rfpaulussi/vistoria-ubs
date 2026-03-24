

Iniciar teste gratuito

Compartilhar
Analisando o conteúdo enviado, percebo que trata de uma interface de vistoria com componentes de seleção, input, upload de fotos e relatórios. Vou criar os arquivos essenciais para o app React, usando Tailwind, Firebase e Vercel.

Vistoria UBS - App de Campo
Projeto inicializado
Visualizar
Lite
Perfeito! Analisei o código do seu aplicativo de Vistoria de UBS. Agora vou criar os 4 arquivos essenciais para o projeto hospedado no GitHub com Firebase e Vercel.
O aplicativo é um sistema completo de inspeção de unidades de saúde (UBS) com:
Formulário de vistoria com checklist de conformidade
Captura de fotos para evidências de problemas
Geração de relatórios técnicos com compartilhamento via WhatsApp
Dashboard com histórico de vistorias
Integração com Firebase para autenticação e armazenamento de dados
Vou criar os arquivos agora com as dependências corretas e configuração otimizada para Vercel.
Criei o package.json com dependências essenciais para o app, garantindo integração com Firebase, Tailwind e Vercel. Próximo passo: montar os arquivos HTML, main.jsx e App.jsx.

Criei os arquivos essenciais: index.html com configuração Firebase, main.jsx como ponto de entrada React, e App.jsx com a lógica da aplicação. Próximo passo: revisar e ajustar detalhes finais.

Consegui criar os arquivos essenciais, como App.jsx, index.css, vite.config.js e tailwind.config.js. Próximo passo é revisar e ajustar os detalhes finais antes da entrega.

Já criei arquivos adicionais como README, .gitignore e o template para configuração do Firebase. O próximo passo é revisar os detalhes finais antes da entrega.

Revisei o conteúdo do arquivo de ignore para evitar sobrescrição. Agora, criei arquivos de configuração para o Prettier e Vercel, essenciais para formatação e implantação. Próximo passo: criar os arquivos principais do app.

Após revisar o projeto, criei arquivos de configuração do Vercel e Prettier. Próximo passo: desenvolver os arquivos principais do app, como package.json, index.html, main.jsx e App.jsx.

Lite
✅ Sucesso! Todos os arquivos foram criados com sucesso.
Criei um aplicativo completo de Vistoria de UBS pronto para ser hospedado no GitHub e publicado no Vercel. Aqui está o resumo dos arquivos criados:
📦 Arquivos Principais Criados
1. package.json
Dependências otimizadas: React 19, Vite, Tailwind CSS 4, Firebase, Lucide React
Scripts prontos: dev, build, preview
Configurado para pnpm
2. client/index.html
Template HTML5 com meta tags otimizadas para mobile
Integração com Google Fonts (Inter)
Favicon customizado
Viewport fit para notch devices
3. client/src/main.jsx
Entry point React com StrictMode
Renderização no elemento root
4. client/src/App.jsx
Aplicação completa com 3 views:
Formulário: 15 critérios de conformidade com captura de fotos
Relatório Técnico: Visualização de falhas com fotos e justificativas
Dashboard: Histórico de todas as vistorias
Funcionalidades:
Autenticação Firebase (anônima)
Armazenamento em Firestore
Captura de fotos via câmera
Compartilhamento via WhatsApp
Nota de 0-10 para cada unidade
Data de retorno para correções
5. client/src/index.css
Tailwind CSS 4 com animações customizadas
Estilos globais e responsivos
Tema otimizado para mobile
🛠️ Arquivos de Configuração Adicionais
vite.config.js - Configuração Vite com React e Tailwind
tailwind.config.js - Paleta de cores (teal, slate, red, green)
.prettierrc.json - Formatação de código
vercel.json - Configuração para deploy no Vercel
README.md - Documentação completa com instruções de setup
🚀 Próximos Passos para Usar
1. Clonar e Instalar
Bash
git clone seu-repositorio
cd vistoria-ubs-app
pnpm install
2. Configurar Firebase
Crie um arquivo .env.local com suas credenciais:
env
VITE_FIREBASE_API_KEY=sua_chave
VITE_FIREBASE_AUTH_DOMAIN=seu_dominio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto_id
VITE_FIREBASE_STORAGE_BUCKET=seu_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_id
VITE_FIREBASE_APP_ID=seu_app_id
3. Executar Localmente
Bash
pnpm dev
Acesse http://localhost:3000
4. Deploy no Vercel
Faça push para GitHub
Conecte o repositório ao Vercel
Adicione as variáveis de ambiente Firebase
Deploy automático!
📱 Funcionalidades da App
✅ Formulário com 15 critérios de conformidade

✅ Captura de fotos para evidências

✅ Justificativas para não-conformidades

✅ Nota final de 0-10

✅ Data de retorno para correções

✅ Relatório técnico visual

✅ Compartilhamento via WhatsApp

✅ Dashboard com histórico

✅ Integração completa com Firebase

✅ Design responsivo e mobile-first
Todos os arquivos estão prontos para serem commitados no GitHub e deployados no Vercel! 🎉
package.json
Código · 999 B
index.html
Código · 1.13 KB
main.jsx
Código · 236 B
App.jsx
Código · 18.67 KB
index.css
Código · 1.64 KB
vite.config.js
Código · 417 B
tailwind.config.js
Código · 2.50 KB
Vistoria UBS - App de Campo
Markdown · 6.47 KB
vercel.json
Código · 546 B
Ver todos os arquivos nesta tarefa
Como foi este resultado?
Preciso do passo a passo desde o item 1 até o final.

Nao posso instalar nada na maquina, tem que ser tudo na internet
Lite
Entendi! Você quer um guia completo passo a passo para criar o projeto 100% na internet, sem instalar nada na sua máquina local.
Vou criar um tutorial detalhado que cobre:
✅ Criar repositório no GitHub
✅ Adicionar os arquivos do projeto
✅ Configurar Firebase
✅ Conectar ao Vercel
✅ Fazer deploy
✅ Configurar variáveis de ambiente
Pergunta importante antes de começar:
Você já tem contas criadas em:
GitHub (para hospedar o código)
Firebase (para banco de dados)
Vercel (para publicar a app)
Ou preciso incluir no guia como criar essas contas também?
Sim
Lite
Perfeito! Vou criar um guia completo e detalhado, passo a passo, para você configurar tudo 100% na internet. Vou incluir como criar as contas e fazer o deploy completo.
Depois de criar os arquivos do projeto, o próximo passo é configurar o Firebase, obter as credenciais e preparar o ambiente para o deploy na internet.

Para configurar o Firebase e obter as credenciais, revisarei o guia criado, focando nas etapas de configuração da conta Firebase, criação do projeto e geração das chaves de acesso para integração com o app.

Lite
🎉 GUIA COMPLETO CRIADO COM SUCESSO!
Criei um guia passo a passo completo que cobre TUDO que você precisa fazer para colocar o app no ar, 100% pela internet, sem instalar nada na sua máquina.
📋 O que está incluído no guia:
✅ Seção 1: Como criar contas no GitHub, Firebase e Vercel

✅ Seção 2: Como criar o repositório no GitHub

✅ Seção 3: Como adicionar TODOS os arquivos do projeto (passo a passo)

✅ Seção 4: Como configurar Firebase e obter as credenciais

✅ Seção 5: Como conectar ao Vercel e fazer o deploy

✅ Seção 6: Como testar a aplicação

✅ Seção 7: Como fazer customizações futuras

✅ Seção 8: Troubleshooting (solução de problemas)

✅ Checklist final para você acompanhar o progresso
🎯 Resumo do Fluxo:
Criar 3 contas online (GitHub, Firebase, Vercel)
Criar repositório no GitHub
Adicionar 10 arquivos do projeto (tudo pela interface web do GitHub)
Configurar Firebase (Firestore + Authentication)
Obter credenciais do Firebase
Conectar ao Vercel e fazer deploy automático
Adicionar variáveis de ambiente no Vercel
Testar a aplicação no navegador
📱 Depois que terminar:
Sua app estará disponível em um link como:

https://vistoria-ubs-app.vercel.app
E você poderá:
✅ Acessar de qualquer lugar (computador, celular, tablet )
✅ Fazer vistorias com captura de fotos
✅ Gerar relatórios automáticos
✅ Compartilhar via WhatsApp
✅ Ver histórico de todas as vistorias
💡 Dicas Importantes:
Não precisa instalar nada na sua máquina - tudo é feito pela internet
Não precisa de terminal - tudo pela interface web
Não precisa de conhecimento técnico - o guia é bem detalhado
Leva menos de 1 hora para completar tudo
Comece agora acessando o guia! Se tiver dúvidas em algum passo, me avise! 🚀
📱 GUIA COMPLETO: Vistoria UBS App - Do Zero ao Deploy
Índice
Criar Contas Online
Criar Repositório no GitHub
Adicionar Arquivos do Projeto
Configurar Firebase
Conectar ao Vercel
Deploy e Testes
1. CRIAR CONTAS ONLINE
1.1 Criar Conta GitHub
Passo 1: Acesse https://github.com/signup
Passo 2: Preencha os dados:
Email: Digite seu email
Password: Crie uma senha forte
Username: Escolha um nome de usuário (ex: seu-nome-vistoria )
Passo 3: Clique em "Create account"
Passo 4: Confirme seu email (verifique sua caixa de entrada)
Passo 5: Complete o perfil (opcional, pode pular)
✅ Conta GitHub criada!
1.2 Criar Conta Firebase
Passo 1: Acesse https://console.firebase.google.com
Passo 2: Clique em "Ir para console" ou "Get started"
Passo 3: Faça login com sua conta Google (ou crie uma se não tiver )
Passo 4: Clique em "Criar projeto"
Passo 5: Preencha os dados:
Nome do projeto: vistoria-ubs-app
Aceitar termos: Marque a caixa
Clique em "Continuar"
Passo 6: Configurar Google Analytics (opcional):
Você pode desativar por enquanto
Clique em "Criar projeto"
Passo 7: Aguarde a criação (leva alguns segundos)
✅ Projeto Firebase criado!
1.3 Criar Conta Vercel
Passo 1: Acesse https://vercel.com/signup
Passo 2: Clique em "Continue with GitHub"
Passo 3: Autorize o Vercel a acessar sua conta GitHub
Passo 4: Complete o registro
✅ Conta Vercel criada!
2. CRIAR REPOSITÓRIO NO GITHUB
2.1 Criar Novo Repositório
Passo 1: Acesse https://github.com/new (ou clique no "+" no canto superior direito )
Passo 2: Preencha os dados:
Repository name: vistoria-ubs-app
Description: Aplicativo móvel para vistoria de UBS com Firebase
Visibility: Selecione "Public" (para Vercel conseguir acessar)
Initialize with: Deixe desmarcado por enquanto
Passo 3: Clique em "Create repository"
✅ Repositório criado!
2.2 Copiar o Link do Repositório
Passo 1: Na página do repositório, clique no botão verde "Code"
Passo 2: Copie o link HTTPS (ex: https://github.com/seu-usuario/vistoria-ubs-app.git )
Guarde este link! Você vai precisar dele.
3. ADICIONAR ARQUIVOS DO PROJETO
Você tem 2 opções:
Opção A: Usar a Interface Web do GitHub (Mais Fácil)
Passo 1: Acesse seu repositório no GitHub
Passo 2: Clique em "Add file" → "Create new file"
Passo 3: Para cada arquivo abaixo, crie um novo arquivo:
3.3.1 Criar package.json
Nome do arquivo: package.json
Conteúdo:
JSON
{
  "name": "vistoria-ubs-app",
  "version": "1.0.0",
  "type": "module",
  "description": "Aplicativo móvel para vistoria de UBS com Firebase e relatório técnico",
 
Tarefa concluída
Como foi este resultado?
Sugestões de acompanhamento




App.jsx
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
// As variáveis __firebase_config e __app_id são fornecidas pelo ambiente do Canvas.
const firebaseConfig = typeof __firebase_config !== 'undefined' 
  ? JSON.parse(__firebase_config) 
  : {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
      appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'vistoria-ubs-final';

// --- COMPONENTE DE PERGUNTA (ISOLADO PARA EVITAR PERDA DE FOCO) ---
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
  const [view, setView] = useState('form'); // form, report, dashboard
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

  // Autenticação Inicial
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

  // Busca histórico para o Dashboard
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

  // --- VIEW: FORMULÁRIO ---
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
              <h2 className="text-teal-400 text-[10px] font-black uppercase tracking-[0.3em]">Finalização</h2>
              
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
          <Share2 size={18} className="text-teal-400 cursor-pointer" onClick={compartilharWhatsApp} />
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
