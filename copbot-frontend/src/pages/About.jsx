import { ShieldAlert, Database, Brain, Cpu, Shield, Code, Server, MessageSquare, Terminal } from 'lucide-react';

export default function About() {

    const workflow = [
        { title: "User Input (Voice/Text)", desc: "Citizens input queries via natural language or multi-lingual voice commands seamlessly.", icon: MessageSquare },
        { title: "RAG AI Processing", desc: "Queries hit our FAISS vector store, retrieving context-aware data verified against IPC protocols.", icon: Brain },
        { title: "Actionable Guidance", desc: "Mistral/LLaMA generates legally accurate, procedural outputs bypassing complex bureaucratic jargon.", icon: ShieldAlert }
    ];

    const stack = [
        { name: "React + Vite", type: "Frontend", icon: Code },
        { name: "Tailwind CSS", type: "Styling", icon: Code },
        { name: "Flask (Python)", type: "Backend", icon: Terminal },
        { name: "Mistral 7B", type: "LLM Core", icon: Cpu },
        { name: "FAISS Vector DB", type: "Memory", icon: Database },
        { name: "SQLite/Postgres", type: "Storage", icon: Server }
    ];

    return (
        <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col gap-8 pb-10">

            {/* Header Card */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-10 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiLz48L3N2Zz4=')] opacity-50" />

                <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 mx-auto mb-6 shadow-xl">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">About CopBot</h1>
                    <p className="text-teal-50 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                        An elite AI-powered civic assistance platform designed to permanently bridge the communication gap between citizens and law enforcement.
                    </p>
                </div>
            </div>

            {/* How It Works Grid */}
            <div className="mt-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-teal-600" /> System Architecture Flow
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {workflow.map((item, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative group hover:border-teal-300 transition-colors">
                            <div className="absolute top-8 right-8 text-8xl font-black text-slate-50 group-hover:text-teal-50/50 transition-colors z-0 select-none">
                                {idx + 1}
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-100 mb-6">
                                    <item.icon className="w-6 h-6 text-teal-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                                <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tech Stack Banner */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Code className="w-6 h-6 text-teal-600" /> Technology Stack
                </h2>
                <div className="flex flex-wrap gap-4">
                    {stack.map((tech, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-4 min-w-[200px] flex-1 sm:flex-none">
                            <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                                <tech.icon className="w-5 h-5 text-slate-700" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">{tech.name}</p>
                                <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider">{tech.type}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Disclaimer Banner */}
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4">
                <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-lg font-bold text-amber-900 mb-1">Critical Disclaimer</h4>
                    <p className="text-amber-800 font-medium">
                        CopBot is an AI assistant developed for informational and procedural guidance regarding law enforcement and FIR protocols. It is <strong>NOT</strong> a replacement for calling 100 or dispatching immediate help in life-threatening emergencies.
                    </p>
                </div>
            </div>

        </div>
    );
}
